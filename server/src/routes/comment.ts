import * as Router from 'koa-router';
import Article from '../models/article';
import Comment from '../models/comment';
import isLogin from '../middlewares/isLogin';
import { DefaultState, Context } from 'koa';
import { errorCapture } from '../util/error';
import { SuccessModule, ErrorModule } from '../util/resModel';
import * as mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;
const router = new Router<DefaultState, Context>();

router.prefix('/api');

// 新建评论
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

// 查找某篇文章的所有评论
router.get('/comments/:articleId', async (ctx) => {
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

// 给评论点赞/取消点赞
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

export = router;
