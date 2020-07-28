import * as Router from 'koa-router';
import Article from '../models/article';
import isAdmin from '../middlewares/isAdmin';
import { DefaultState, Context } from 'koa';
import { SuccessModule, ErrorModule } from '../util/resModel';
import { ArticleDocument } from '../models/article';

const router = new Router<DefaultState, Context>();

interface ArticlePage {
    total: number | 0;
    data: Array<ArticleDocument | null>;
}

router.prefix('/api');

// 创建文章
router.post('/article', isAdmin, async (ctx) => {
    const { title } = ctx.request.body;
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
        createTime: new Date(),
        content: ctx.request.body.content,
        type: ctx.request.body.type,
        tag: ctx.request.body.tag,
        private: ctx.request.body.private,
        creator: ctx.session && ctx.session.userId
    });
    await article.save();
    ctx.body = new SuccessModule('文章创建成功');
});

// 修改文章
router.put('/article', isAdmin, async (ctx) => {
    const { id, title } = ctx.request.body;
    if (!title) {
        ctx.body = new ErrorModule('文章标题不得为空');
        return;
    }
    let res: null | ArticleDocument = null;
    // 防止id输入错误
    try {
        res = await Article.findByIdAndUpdate(id, {
            // fixme 这里会导致置空
            title,
            content: ctx.request.body.content,
            type: ctx.request.body.type,
            tag: ctx.request.body.tag,
            private: ctx.request.body.private
        });
    } catch {
        ctx.body = new ErrorModule('修改失败');
    }
    // 判定是否修改
    res ? (ctx.body = new SuccessModule('修改成功')) : (ctx.body = new ErrorModule('修改失败'));
});

// 获取单个文章
router.get('/article', async (ctx) => {
    const { id } = ctx.request.query;
    const res = await Article.findById(id);
    if (res) {
        ctx.body = new SuccessModule('查询成功', res);
    } else {
        ctx.body = new ErrorModule('查询失败');
    }
});

// 分页查找所有文章信息
router.get('/articles', async (ctx) => {
    const { pageSize, pageNumber } = ctx.request.query;
    let result: ArticlePage = {
        total: 0,
        data: []
    };
    await Article.find({}, (err, res) => {
        if (err) {
            ctx.body = new ErrorModule('获取失败');
            return;
        }
        result.total = res.length;
        Article.find({})
            .skip((pageNumber - 1) * parseInt(pageSize))
            .limit(parseInt(pageSize))
            .exec((err, res) => {
                if (err) {
                    ctx.body = new ErrorModule('获取失败');
                    return;
                }
                result.data = res;
            });
    });
    ctx.body = new SuccessModule('获取成功', result);
});

export = router;
