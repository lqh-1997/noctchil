import * as Router from 'koa-router';
import Comment from '../models/comment';
import isLogin from '../middlewares/isLogin';
import { DefaultState, Context } from 'koa';
import { SuccessModule, ErrorModule } from '../util/resModel';
import { CommentDocument } from '../models/comment';
import * as mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;
const router = new Router<DefaultState, Context>();

router.prefix('/api');

router.post('/comment', isLogin, async (ctx) => {
    const { content } = ctx.request.body;
    const comment = new Comment({
        creator: ctx.session && ctx.session.userId,
        content
    });
    await comment.save();
    ctx.body = new SuccessModule('评论成功');
});

export = router;
