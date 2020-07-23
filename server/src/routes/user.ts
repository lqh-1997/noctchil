import { DefaultState, Context } from 'koa';
import * as Router from 'koa-router';
import User from '../models/user';
import { SuccessModule, ErrorModule } from '../util/resModel';

const router = new Router<DefaultState, Context>();

router.prefix('/user');

router.get('/', async (ctx: Context) => {
    const result = await User.find({
        username: ctx.request.query.username
    });
    if (result && ctx.session) {
        ctx.session.username = ctx.request.query.username;
        console.log(ctx.session.username);
    }
    ctx.body = new SuccessModule('查询成功', result);
});

router.post('/', async (ctx) => {
    const user = new User({
        username: ctx.request.body.username,
        password: ctx.request.body.password,
        nicename: ctx.request.body.username,
        email: ctx.request.body.email
    });
    const result = await user.save();
    ctx.body = new SuccessModule('添加成功', result);
});

router.put('/', async (ctx) => {
    const result = await User.updateOne(
        { username: ctx.request.body.username },
        { password: ctx.request.body.password }
    );
    ctx.body = new SuccessModule('修改成功', result);
});

router.delete('/', async (ctx) => {
    const result = await User.findOneAndRemove({
        username: ctx.request.body.username
    });
    ctx.body = new SuccessModule('删除成功', result);
});

export = router;
