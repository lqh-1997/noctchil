import * as Router from 'koa-router';
import Article from '../models/article';
import isAdmin from '../middlewares/isAdmin';
import { DefaultState, Context } from 'koa';
import { SuccessModule, ErrorModule } from '../util/resModel';
import { ArticleDocument } from '../models/article';
import * as mongoose from 'mongoose';
import { errorCapture } from '../util/error';

const { ObjectId } = mongoose.Types;
const router = new Router<DefaultState, Context>();

interface ArticlePage {
    total: number | 0;
    data: Array<ArticleDocument | null>;
}

router.prefix('/api');

// 创建文章
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

// 修改文章
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

// 获取单个文章，同时使文章查看数目+1
router.get('/article', async (ctx) => {
    const { id } = ctx.request.query;
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
        let { meta } = res;
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

// 分页查找所有文章信息
router.get('/articles', async (ctx) => {
    const { pageSize, pageNumber } = ctx.request.query;
    let result: ArticlePage = {
        total: 0,
        data: []
    };
    let [err, res] = await errorCapture(Article, Article.find, {});
    if (err) {
        ctx.body = new ErrorModule(err);
        return;
    }
    result.total = res.length;
    try {
        // 原理 跳过pageNumber -1 * pageSize条 然后取pageSize条数据 数据量大应该会有性能瓶颈
        const listRes = await Article.find({})
            .skip((pageNumber - 1) * parseInt(pageSize))
            .limit(parseInt(pageSize));
        result.data = listRes;
        ctx.body = new SuccessModule('获取成功', result);
    } catch (err) {
        ctx.body = new ErrorModule(err);
    }
});

// 给文章点赞/取消点赞 由doLike决定
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
        let { meta } = res;
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
