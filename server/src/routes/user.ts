import * as Router from 'koa-router';
import User from '../models/user';
import isLogin from '../middlewares/isLogin';
import notLogin from '../middlewares/notLogin';
import { DefaultState, Context } from 'koa';
import { SuccessModule, ErrorModule } from '../util/resModel';

const router = new Router<DefaultState, Context>();

router.prefix('/api');

// 注册
router.post('/signUp', notLogin, async (ctx) => {
    // 查看用户名是否重复
    let user = await User.findOne({ username: ctx.request.body.username });
    if (user) {
        ctx.body = new ErrorModule('用户名已存在');
        return;
    }
    user = new User({
        username: ctx.request.body.username,
        password: ctx.request.body.password,
        nicename: ctx.request.body.username,
        email: ctx.request.body.email,
        url: ctx.request.body.url
    });
    const result = await user.save();
    // 注册完即直接登录
    ctx.session && (ctx.session.userId = result._id);
    ctx.body = new SuccessModule('注册成功');
});

// 登录
router.post('/login', notLogin, async (ctx: Context) => {
    const { username, password } = ctx.request.body;
    if (!username) {
        ctx.body = new ErrorModule('用户名不得为空');
        return;
    }
    if (!password) {
        ctx.body = new ErrorModule('密码不得为空');
        return;
    }
    // todo 寻找匹配的用户名密码 密码之后会修改成加盐加密
    const user = await User.findOne({
        username: username,
        password: password
    });
    if (user) {
        // 用户名存在更新登录时间和登录状态
        await User.findByIdAndUpdate(user._id, {
            last_login_time: Date.now(),
            status: true
        });
        ctx.session && (ctx.session.userId = user._id);
        ctx.body = new SuccessModule('登陆成功');
    } else {
        ctx.body = new ErrorModule('用户名或密码错误');
    }
});

// 登出
router.post('/logout', isLogin, async (ctx: Context) => {
    const id = ctx.session && ctx.session.userId;
    // 修改登录时间和登录状态
    await User.findByIdAndUpdate(id, {
        last_login_time: Date.now(),
        status: false
    });
    // 直接将session的userId置0表示未登录
    ctx.session && (ctx.session.userId = 0);
    ctx.body = new SuccessModule('登出成功');
});

// 获取当前用户的信息
router.get('/user', isLogin, async (ctx: Context) => {
    const id = ctx.session && ctx.session.userId;
    const user = await User.findById(id);
    ctx.body = new SuccessModule('获取成功', user);
});

// 测试
router.get('/', async (ctx) => {
    ctx.body = new SuccessModule('普通测试');
});

// 测试登录状态
router.get('/loginGet', isLogin, async (ctx) => {
    ctx.body = new SuccessModule('嗯嗯, 确实登录了呢');
});

export = router;
