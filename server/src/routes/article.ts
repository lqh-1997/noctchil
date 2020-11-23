import type { DefaultState, Context } from 'koa';
import type { ArticleDocument } from '../models/article';

import * as Router from 'koa-router';
import * as mongoose from 'mongoose';

import Article from '../models/article';
import isAdmin from '../middlewares/isAdmin';
import { SuccessModule, ErrorModule } from '../util/resModel';
import { getPagination } from 'src/util/dbHelper';

const { ObjectId } = mongoose.Types;
const router = new Router<DefaultState, Context>();

router.prefix('/api');

/**
 * @api {post} /article 新建文章
 * @apiName CreateArticle
 * @apiGroup Article
 * @apiParam {Object} article 通过body传递过来文章对象
 * @apiParam {String} article[title] 文章标题
 * @apiParam {String} article[desc] 文章简介
 * @apiParam {String} article[content] 文章内容
 * @apiParam {String} article[type] 文章类型'message | article'
 * @apiParam {String} article[state] 文章状态'draft | publish'
 * @apiParam {Array} article[tag] 文章标签
 * @apiParam {Boolean} article[visible] 文章是否
 */
router.post('/article', isAdmin, async (ctx) => {
    const { title, desc, content, type, state, tag, invisible } = ctx.request.body;
    try {
        let article = await Article.findOne({ title });
        if (article) {
            ctx.body = new ErrorModule('文章名已存在');
            return;
        }
        if (!title) {
            ctx.body = new ErrorModule('文章标题不得为空');
            return;
        }
        article = new Article({
            title,
            desc,
            content,
            type,
            state,
            tag,
            invisible,
            creator: ctx.session && ctx.session.userId
        });
        await article.save();
    } catch (err) {
        ctx.body = new ErrorModule(err);
        return;
    }
    ctx.body = new SuccessModule('文章创建成功');
});

/**
 * @api {put} /article 更新文章
 * @apiName UpdateArticle
 * @apiGroup Article
 * @apiDescription 和创建文章差不多、但是只改一项的话要记得将其他项也完好无损的传过来哦
 */
router.put('/article', isAdmin, async (ctx) => {
    const { id, title, desc, content, type, state, tag, invisible } = ctx.request.body;
    if (!title) {
        ctx.body = new ErrorModule('文章标题不得为空');
        return;
    }
    let res: null | ArticleDocument = null;
    // 防止id输入错误
    try {
        res = await Article.findByIdAndUpdate(id, {
            title,
            desc,
            content,
            type,
            state,
            tag,
            invisible,
            updateTime: new Date()
        });
    } catch (err) {
        ctx.body = new ErrorModule(err);
    }
    // 判定是否修改
    res ? (ctx.body = new SuccessModule('修改成功')) : (ctx.body = new ErrorModule('修改失败'));
});

/**
 * @api {get} /article/client 获取单个文章
 * @apiName GetArticleByClient
 * @apiGroup Article
 * @apiDescription 决定由前端来控制获取到的文章类型。获取单个文章，同时使文章查看数目+1
 */
router.get('/article/client', async (ctx) => {
    const { id } = ctx.request.query;
    const option: any = {
        state: 'publish',
        invisible: false
    };
    if (!ObjectId.isValid(id)) {
        ctx.body = new ErrorModule('请输入合法id');
        return;
    }
    let res = null;
    try {
        res = await Article.findById(id);
    } catch (err) {
        ctx.body = new ErrorModule(err);
        return;
    }
    if (res) {
        // 不能查找草稿以及隐藏类型的
        if (res.state !== option.state || res.invisible !== option.invisible) {
            ctx.body = new ErrorModule('文章不存在');
            return;
        }
        const { meta } = res;
        meta.views++;
        try {
            await Article.findByIdAndUpdate(id, {
                meta: meta
            });
        } catch {}
        ctx.body = new SuccessModule('查询成功', res);
    } else {
        ctx.body = new ErrorModule('文章不存在');
    }
});

/**
 * @api {get} /article/admin 获取单个文章
 * @apiName GetArticleByAdmin
 * @apiGroup Article
 * @apiDescription 管理员查看文章，不会使文章查看数目+1
 */
router.get('/article/admin', isAdmin, async (ctx) => {});

/**
 * @api {get} /articles/client 分页查找所有文章信息
 * @apiName GetArticlePaginationByClient
 * @apiGroup Article
 * @apiDescription 前台使用 不能查找草稿类型的以及隐藏类型的
 */
router.get('/articles/client', async (ctx) => {
    // 先将筛选条件设置为发布类和非隐藏类
    const option: any = {
        state: 'publish',
        invisible: false
    };
    try {
        // 用户传入pageSize pageNumber 和type
        const pageSize = parseInt(ctx.request.query.pageSize);
        const pageNumber = parseInt(ctx.request.query.pageNumber);
        const { type } = ctx.request.query;
        type && (option.type = type);

        const res = await getPagination(Article, pageSize, pageNumber, option);
        ctx.body = new SuccessModule('查询成功', res);
    } catch (err) {
        ctx.body = new ErrorModule(err);
    }
});

/**
 * @api {get} /articles/admin 分页查找所有文章信息
 * @apiName GetArticlePaginationByAdmin
 * @apiGroup Article
 * @apiParam {Number} pageSize 一页大小
 * @apiParam {Number} pageNumber 页数
 * @apiParam {String} [type] 文章类型'message | article'
 * @apiParam {String} [state] 文章状态'draft | publish'
 * @apiParam {Boolean} [invisible] 文章是否可见
 * @apiDescription 后台使用 不输入的类型将会全部查找
 */
router.get('/articles/admin', isAdmin, async (ctx) => {
    const option: any = {};
    try {
        const pageSize = parseInt(ctx.request.query.pageSize);
        const pageNumber = parseInt(ctx.request.query.pageNumber);
        const { type, state, invisible } = ctx.request.query;
        type && (option.type = type);
        state && (option.state = state);
        invisible && (option.invisible = invisible);

        const res = await getPagination(Article, pageSize, pageNumber, option);
        ctx.body = new SuccessModule('查询成功', res);
    } catch (err) {
        ctx.body = new ErrorModule(err);
    }
});

/**
 * @api {put} /article/like 给文章点赞/取消点赞
 * @apiName LikeArticle
 * @apiGroup Article
 * @apiParam {String} id 文章的id
 * @apiParam {Boolean} doLike 喜欢还是不喜欢 true当然是喜欢
 */
router.put('/article/like', async (ctx) => {
    let { id, doLike = true } = ctx.request.query;
    doLike = JSON.parse(doLike);
    let res = null;
    try {
        res = await Article.findById(id);
    } catch (err) {
        ctx.body = new ErrorModule(err);
        return;
    }
    if (res) {
        const { meta } = res;
        doLike ? meta.likes++ : meta.likes--;
        try {
            await Article.findByIdAndUpdate(id, {
                meta: meta
            });
        } catch (err) {
            ctx.body = new ErrorModule(err);
            return;
        }
        ctx.body = doLike ? new SuccessModule('点赞成功') : new SuccessModule('取消成功');
    } else {
        ctx.body = new ErrorModule('文章不存在');
    }
});

export default router;
