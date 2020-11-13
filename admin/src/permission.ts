import { getAuthorize, setAuthorize } from './utils/authorize';
import { changeRouter } from './utils/route';
import router, { menuPrefix } from '/@/router/index';

// 未登录(可)访问列表
const unAuthorizeList = ['/login', '/signup'];
// 用来判断是否修改了userId
let lastUserId = '';
// 用来判断是否二次进入beforeEach
let redirect = false;

// 权限改变router
router.beforeEach(async (to, _from, next) => {
    // 刷新或第一次开网页导致 userId为空 就向服务器获取一次 如果未登录服务器返回0 已登录服务器返回相应的userId
    if (getAuthorize() === null) {
        await setAuthorize();
    }

    // 只有当userId改变的时候生成路由
    if (lastUserId !== getAuthorize()) {
        // 将当前userId赋值给lastUserId 所以不用每次页面跳转都生成一次路由
        lastUserId = getAuthorize()!;
        // 改变路由
        changeRouter();
    }

    // 判断登录状态 不等于零代表已登录
    if (String(getAuthorize()) !== '0') {
        // 已经登录还要访问未登录列表的话就强行跳转
        if (unAuthorizeList.indexOf(to.path) !== -1) {
            // router.push(`/${menuPrefix}`);
            next(`/${menuPrefix}`);
        } else {
            // 判断是否是重定向进来的 否就重定向(解决添加路由过后，却依旧无法访问到页面的问题)
            if (!redirect) {
                next({ ...to, replace: true });
                redirect = true;
            } else {
                next();
            }
        }
    } else {
        // 未登录还要访问其他内容 一律推到login界面
        if (unAuthorizeList.indexOf(to.path) === -1) {
            // router.push(`/login`);
            next('/login');
        } else {
            next();
        }
    }
});
