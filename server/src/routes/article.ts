import type { DefaultState, Context } from 'koa';

import * as Router from 'koa-router';
import * as mongoose from 'mongoose';

import Article from '../models/article';
import isAdmin from '../middlewares/isAdmin';
import { SuccessModule, ErrorModule } from '../util/resModel';
import { getPagination } from 'src/util/dbHelper';
import { isString } from 'src/util/utils';

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
 * @apiParam {Array} article[tags] 文章标签
 * @apiParam {Boolean} article[invisible] 文章是否不允许查看
 */
router.post('/article', isAdmin, async (ctx) => {
    let title = ctx.request.body.title;
    const { desc, content, type, state, tags, invisible } = ctx.request.body;
    try {
        // 没有标题且是吐槽类型(自动生成一个不重复的文章类型，有可能重复，可以用个哈希表存，不过我懒就当他不可能重复了)
        if (type === 'message') {
            title = '吐槽' + String(Math.random()).slice(4, 9) + Date.now();
        }

        // 没有标题且(没传类型或者是文章类型)
        if (!title && (!type || type === 'article')) {
            ctx.body = new ErrorModule('文章标题不得为空');
            return;
        }

        let article = await Article.findOne({ title });
        if (article) {
            ctx.body = new ErrorModule('文章名已存在');
            return;
        }
        article = new Article({
            title,
            desc,
            content,
            type,
            state,
            tags,
            invisible,
            creator: ctx.session && ctx.session.userId
        });
        await article.save();
        ctx.body = new SuccessModule('文章创建成功');
    } catch (err) {
        ctx.body = new ErrorModule(err);
    }
});

/**
 * @api {put} /article 更新文章
 * @apiName UpdateArticle
 * @apiGroup Article
 * @apiDescription 和创建文章差不多、不改的东西可以不传 区别是一定要带上id
 * @apiParam {String} article[id] 文章id
 */
router.put('/article', isAdmin, async (ctx) => {
    // 防止id输入错误
    try {
        const { id, title, desc, content, type, state, tags, invisible } = ctx.request.body;
        // 这里返回的是旧的数据用来和新的tags做比较
        const res = await Article.findOneAndUpdate(
            { _id: id },
            {
                title,
                desc,
                content,
                type,
                state,
                tags,
                invisible,
                updateTime: new Date()
            },
            {
                omitUndefined: true,
                runValidators: true
            }
        );
        if (!res) {
            ctx.body = new ErrorModule('修改失败');
            return;
        }
        ctx.body = new SuccessModule('修改成功');
    } catch (err) {
        ctx.body = new ErrorModule(err);
    }
});

/**
 * @api {get} /article/client 获取单个文章
 * @apiName GetArticleByClient
 * @apiGroup Article
 *
 * @apiParam {String} id 文章id 通过query?key=value
 * @apiDescription 决定由前端来控制获取到的文章类型。获取单个文章，同时使文章查看数目+1
 */
router.get('/article/client', async (ctx) => {
    const { id } = ctx.request.query;
    const option: any = {
        state: 'publish',
        invisible: false
    };
    if (!id || Array.isArray(id) || !ObjectId.isValid(id)) {
        ctx.body = new ErrorModule('请输入合法id');
        return;
    }
    try {
        const res = await Article.findById(id).populate({ path: 'tags', select: '-article' });
        if (res) {
            // 不能查找草稿以及隐藏类型的
            if (res.state !== option.state || res.invisible !== option.invisible) {
                ctx.body = new ErrorModule('文章不存在');
                return;
            }
            const { meta } = res;
            meta.views++;
            await Article.findByIdAndUpdate(id, {
                meta: meta
            });
            ctx.body = new SuccessModule('查询成功', res);
        } else {
            ctx.body = new ErrorModule('文章不存在');
        }
    } catch (err) {
        ctx.body = new ErrorModule(err);
    }
});

/**
 * @api {get} /article/admin 获取单个文章
 * @apiName GetArticleByAdmin
 * @apiGroup Article
 *
 * @apiParam {String} id 文章id 通过query?key=value
 * @apiDescription 管理员查看文章，不会使文章查看数目+1
 */
router.get('/article/admin', isAdmin, async (ctx) => {
    const { id } = ctx.request.query;
    if (!id || Array.isArray(id) || !ObjectId.isValid(id)) {
        ctx.body = new ErrorModule('请输入合法id');
        return;
    }
    try {
        const res = await Article.findById(id).populate({ path: 'tags', select: '-article' });
        if (res) {
            ctx.body = new SuccessModule('查询成功', res);
        } else {
            ctx.body = new ErrorModule('文章不存在');
        }
    } catch (err) {
        ctx.body = new ErrorModule(err);
    }
});

/**
 * @api {get} /articles/client 分页查找所有文章信息
 * @apiName GetArticlePaginationByClient
 * @apiGroup Article
 * @apiParam {Number} pageSize 一页大小
 * @apiParam {Number} pageNumber 页数
 * @apiParam {String} [type] 文章类型'message | article'
 * @apiParam {String} [tags] 标签id
 * @apiDescription 前台使用 不能查找草稿类型的以及隐藏类型的
 */
router.get('/articles/client', async (ctx) => {
    // 先将筛选条件设置为发布类和非隐藏类
    const option: any = {
        state: 'publish',
        invisible: false
    };
    try {
        // 用户传入pageSize pageNumber type 和 tag
        let pageSize: any = ctx.request.query.pageSize;
        let pageNumber: any = ctx.request.query.pageNumber;

        if (!isString(pageSize) || !isString(pageNumber)) {
            ctx.body = new ErrorModule('参数类型错误');
            return;
        }

        pageSize = parseInt(pageSize);
        pageNumber = parseInt(pageNumber);
        const { type, tags } = ctx.request.query;
        type && (option.type = type);
        tags && (option.tags = { $elemMatch: { $eq: tags } });

        const res = await getPagination(Article, pageSize, pageNumber, option, {
            path: 'tags'
        });
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
 * @apiParam {String} [tags] 标签id
 * @apiDescription 后台使用 不输入的类型将会全部查找
 */
router.get('/articles/admin', isAdmin, async (ctx) => {
    const option: any = {};
    try {
        let pageSize: any = ctx.request.query.pageSize;
        let pageNumber: any = ctx.request.query.pageNumber;

        if (!isString(pageSize) || !isString(pageNumber)) {
            ctx.body = new ErrorModule('参数类型错误');
            return;
        }

        pageSize = parseInt(pageSize);
        pageNumber = parseInt(pageNumber);

        const { type, state, invisible, tags } = ctx.request.query;
        type && (option.type = type);
        state && (option.state = state);
        invisible && (option.invisible = invisible);
        tags && (option.tags = { $elemMatch: { $eq: tags } });

        const res = await getPagination(Article, pageSize, pageNumber, option, {
            path: 'tags'
        });
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
    const { id } = ctx.request.query;
    let { doLike = 'true' } = ctx.request.query;

    if (doLike !== 'true' && doLike !== 'false') {
        ctx.body = new ErrorModule('参数类型错误');
        return;
    }

    doLike = JSON.parse(doLike);
    try {
        const res = await Article.findById(id);
        if (res) {
            const { meta } = res;
            doLike ? meta.likes++ : meta.likes--;
            await Article.findByIdAndUpdate(id, {
                meta: meta
            });
            ctx.body = doLike ? new SuccessModule('点赞成功') : new SuccessModule('取消成功');
        } else {
            ctx.body = new ErrorModule('文章不存在');
        }
    } catch (err) {
        ctx.body = new ErrorModule(err);
    }
});

/**
 * @api {delete} /articles 批量删除文章
 * @apiName DeleteArticles
 * @apiGroup Article
 * @apiParam {Array} idList 文章的id列表
 */
router.delete('/articles', isAdmin, async (ctx) => {
    try {
        const { idList } = ctx.request.body;
        const deleteState = await Article.deleteMany({ _id: { $in: idList } });
        if (deleteState.ok !== 1) {
            throw '未知错误';
        }
        ctx.body = new SuccessModule('删除成功', deleteState.deletedCount);
    } catch (err) {
        ctx.body = new ErrorModule(err);
    }
});

export default router;
