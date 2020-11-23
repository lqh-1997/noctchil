import type { DefaultState, Context } from 'koa';

import * as Router from 'koa-router';

import User from '../models/user';
import isLogin from '../middlewares/isLogin';
import notLogin from '../middlewares/notLogin';
import { encryptPwd } from '../util/encryptPwd';
import { errorCapture } from '../util/error';
import { SuccessModule, ErrorModule } from '../util/resModel';

const router = new Router<DefaultState, Context>();

router.prefix('/api');

function getRandomSalt() {
    return Math.random().toString().slice(2, 5);
}

/**
 * @api {post} /signUp 注册
 * @apiName signUp
 * @apiGroup User
 * @apiParam {Object} user 通过body传递过来文章对象
 * @apiParam {String} username 用户名
 * @apiParam {String} password 密码
 * @apiParam {String} [email] 邮箱地址
 * @apiParam {String} [url] 首页地址
 */
router.post('/signUp', notLogin, async (ctx) => {
    // 查看用户名是否重复
    let [err, user] = await errorCapture(User, User.findOne, {
        username: ctx.request.body.username
    });
    if (err) {
        ctx.body = new ErrorModule(err);
        return;
    }
    if (user) {
        ctx.body = new ErrorModule('用户名已存在');
        return;
    }
    const salt = getRandomSalt();
    const password = encryptPwd(ctx.request.body.password, salt);
    user = new User({
        username: ctx.request.body.username,
        password,
        salt,
        nicename: ctx.request.body.username,
        email: ctx.request.body.email,
        url: ctx.request.body.url
    });
    const [saveErr, result] = await errorCapture(user, user.save);
    if (saveErr) {
        ctx.body = new ErrorModule(saveErr);
        return;
    }
    // 注册完不登陆，跳转回登录页面
    ctx.body = new SuccessModule('注册成功, 请重新登录');
});

/**
 * @api {post} /login 登录
 * @apiName login
 * @apiGroup User
 * @apiParam {Object} user 通过body传递过来文章对象
 * @apiParam {String} username 用户名
 * @apiParam {String} password 密码
 */
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
    // 寻找匹配的用户名密码 密码经过加密处理 查找成功后更新登录时间和登陆状态
    try {
        // 寻找是否存在该用户 并获取其密码以及盐
        const user = await User.findOne({ username }, 'salt password _id isAdmin').exec();
        if (!user) {
            ctx.body = new ErrorModule('该用户名暂未注册');
            return;
        }
        // 将用户输入的数据进行加密
        const pwd = encryptPwd(ctx.request.body.password, user.salt);
        // 比对数据库和用户加密后的
        if (user.password !== pwd) {
            ctx.body = new ErrorModule('用户名或密码错误');
            return;
        }
        // 更新登录时间和登录状态
        await User.findByIdAndUpdate(user._id, {
            last_login_time: new Date(),
            status: true
        });
        // 在session中存储用户的基础信息
        if (ctx.session) {
            ctx.session.userId = user._id;
            ctx.session.isAdmin = user.isAdmin;
        }
        ctx.body = new SuccessModule('登陆成功', user._id);
    } catch (e) {
        ctx.body = new ErrorModule(e);
    }
});

/**
 * @api {post} /logout 登出
 * @apiName logout
 * @apiGroup User
 */
router.post('/logout', isLogin, async (ctx: Context) => {
    const id = ctx.session && ctx.session.userId;
    // 修改登录时间和登录状态
    const [err] = await errorCapture(User, User.findByIdAndUpdate, id, {
        last_login_time: new Date(),
        status: false
    });
    if (err) {
        ctx.body = new ErrorModule(err);
        return;
    }
    // 直接将session的userId置0表示未登录
    ctx.session && (ctx.session.userId = 0);
    ctx.body = new SuccessModule('登出成功');
});

/**
 * @api {get} /user 获取用户信息
 * @apiName getUserInfoByAdmin
 * @apiGroup User
 * @apiDescription 服务端使用 服务端使用的会带上isAdmin字段
 */
router.get('/user', async (ctx: Context) => {
    const id = ctx.session && ctx.session.userId;
    let user = null;
    if (id !== 0) {
        try {
            user = await User.findById(id);
        } catch (err) {
            ctx.body = new ErrorModule(err);
        }
    } else {
        user = {
            username: '未登录',
            nicename: '未登录',
            _id: 0
        };
    }
    // FIXME 删不掉? user.hasOwnProperty('isAdmin')为false??
    // 1. 这不应该是实例上的属性吗 2. 我该怎么在这里访问到这个实例原型__proto__?
    if (user?.isAdmin === false) {
        delete user.isAdmin;
        // console.log(user.hasOwnProperty('isAdmin'));
    }
    ctx.body = new SuccessModule('获取成功', user);
});

/**
 * @api {get} /user/client 获取用户信息
 * @apiName getUserInfoByClient
 * @apiGroup User
 * @apiDescription 客户端使用
 */
router.get('/user/client', async (ctx: Context) => {
    const id = ctx.session && ctx.session.userId;
    let user = null;
    if (id !== 0) {
        try {
            user = await User.findById(id).select('-isAdmin');
        } catch (err) {
            ctx.body = new ErrorModule(err);
        }
    } else {
        user = {
            username: '未登录',
            nicename: '未登录',
            _id: 0
        };
    }
    ctx.body = new SuccessModule('获取成功', user);
});

// 测试
router.get('/', async (ctx) => {
    ctx.response.status = 404;
    ctx.body = new SuccessModule('普通测试');
});

// 测试登录状态
router.get('/loginGet', isLogin, async (ctx) => {
    ctx.body = new SuccessModule('嗯嗯, 确实登录了呢');
});

export default router;
