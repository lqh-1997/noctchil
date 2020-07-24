import * as Router from 'koa-router';
import Article from '../models/article';
import isAdmin from '../middlewares/isAdmin';
import isLogin from '../middlewares/isLogin';
import notLogin from '../middlewares/notLogin';
import { DefaultState, Context } from 'koa';
import { SuccessModule, ErrorModule } from '../util/resModel';
import { ArticleDocument } from '../models/article';

const router = new Router<DefaultState, Context>();

router.prefix('/api');

router.get('/articles', async (ctx) => {});

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

export = router;
