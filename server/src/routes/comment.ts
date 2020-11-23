import type { DefaultState, Context } from 'koa';

import * as Router from 'koa-router';
import * as mongoose from 'mongoose';

import Article from '../models/article';
import Comment from '../models/comment';
import isLogin from '../middlewares/isLogin';
import { errorCapture } from '../util/error';
import { SuccessModule, ErrorModule } from '../util/resModel';
import { htmlToBriefContent } from 'src/util/dbHelper';

const { ObjectId } = mongoose.Types;
const router = new Router<DefaultState, Context>();

router.prefix('/api');

/**
 * @api {post} /comment 新建评论
 * @apiName createComments
 * @apiGroup Comment
 * @apiParam {Object} comment 通过body传递过来评论对象
 * @apiParam {String} comment[content] 评论内容
 * @apiParam {String} comment[from] 评论所属文章id
 */
router.post('/comment', isLogin, async (ctx) => {
    const { content, from } = ctx.request.body;
    if (!ObjectId.isValid(from)) {
        ctx.body = new ErrorModule('请输入合法id');
        return;
    }
    const comment = new Comment({
        creator: ctx.session && ctx.session.userId,
        content,
        from
    });
    const [err] = await errorCapture(comment, comment.save);
    if (err) {
        ctx.body = new ErrorModule(err);
        return;
    }

    // 文章评论meta comments+1
    try {
        const res = await Article.findById(from);
        if (res === null) {
            throw new Error('文章不存在');
        }
        const meta = res.meta;
        meta.comments++;
        await Article.findByIdAndUpdate(from, {
            meta
        });
    } catch (err) {
        ctx.body = new ErrorModule(err);
        return;
    }

    ctx.body = new SuccessModule('评论成功');
});

/**
 * @api {get} /comments/article/:articleId 查找某篇文章的所有评论
 * @apiName GetArticleComments
 * @apiGroup Comment
 * @apiParam {String} articleId 文章的id
 */
router.get('/comments/article/:articleId', async (ctx) => {
    const articleId = ctx.params.articleId;
    await Comment.find({ from: articleId })
        .populate({ path: 'creator', select: 'nicename' })
        .exec()
        .then((res) => {
            ctx.body = new SuccessModule('获取评论信息成功', res);
        })
        .catch((err) => {
            ctx.body = new ErrorModule(err);
        });
});

/**
 * @api {put} /comment/like 给评论点赞/取消点赞
 * @apiName LikeComments
 * @apiGroup Comment
 * @apiParam {String} id 评论的id
 * @apiParam {Boolean} doLike 喜欢还是不喜欢 true当然是喜欢
 */
router.put('/comment/like', async (ctx) => {
    let { id, doLike = true } = ctx.request.query;
    doLike = JSON.parse(doLike);
    let res = null;
    try {
        res = await Comment.findById(id);
    } catch (err) {
        ctx.body = new ErrorModule(err);
        return;
    }
    if (res) {
        let { likes } = res;
        doLike ? likes++ : likes--;
        try {
            await Comment.findByIdAndUpdate(id, {
                likes
            });
        } catch (err) {
            ctx.body = new ErrorModule(err);
            return;
        }
        ctx.body = doLike ? new SuccessModule('点赞成功') : new SuccessModule('取消成功');
    } else {
        ctx.body = new ErrorModule('评论不存在');
    }
});

/**
 * @api {get} /comments/latest 查找最新的评论
 * @apiName GetLatestComments
 * @apiGroup Comment
 * @apiParam {Number} [number=10] 最多查找的评论条数
 * @apiParam {Number} [contentLength=28] 若文章长度超过或等于多少, 则将后面部分改为省略号
 * @apiParam {Number} [titleLength=10] 若标题长度超过或等于多少, 则将后面部分改为省略号
 */
router.get('/comments/latest', async (ctx) => {
    const num = isNaN(parseInt(ctx.request.query.number)) ? 10 : parseInt(ctx.request.query.number);
    const contentLength = isNaN(parseInt(ctx.request.query.contentLength))
        ? 28
        : parseInt(ctx.request.query.contentLength);
    const titleLength = isNaN(parseInt(ctx.request.query.titleLength))
        ? 10
        : parseInt(ctx.request.query.titleLength);

    try {
        let res = await Comment.find({}, {})
            .sort({ createTime: 'desc' })
            .limit(num)
            .populate('creator', '_id nicename')
            .populate('from', '_id title meta');
        res.forEach((res) => {
            res.content = htmlToBriefContent(res.content, contentLength);
            res.from.title = htmlToBriefContent(res.from.title, titleLength);
        });
        ctx.body = new SuccessModule('获取成功', res);
    } catch (err) {
        ctx.body = new ErrorModule(err);
    }
});

export default router;
