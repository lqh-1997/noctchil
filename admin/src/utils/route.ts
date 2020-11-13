import { roleIsAdmin } from './authorize';
import { deepClone } from './helper';
import { RouteRecordRaw } from 'vue-router';
import router, { asyncRouter } from '../router';
import store from '../store';

// 然后获取非admin权限的路由(isAdmin为true就删掉)
export function getCommonRouter(routerList: RouteRecordRaw[]) {
    routerList.forEach((router, index) => {
        if (router.meta && router.meta.isAdmin) {
            routerList.splice(index, 1);
            return;
        }
        if (router.children && router.children.length !== 0) {
            getCommonRouter(router.children);
        }
    });
    return routerList;
}

// 重置 也就是将异步的route从路由表中移除
export function resetRouter() {
    asyncRouter.forEach((route) => {
        if (!route.name) {
            return;
        }
        router.hasRoute(route.name) && router.removeRoute(route.name);
    });
}

// 添加路由
export function addRouter(routeList: RouteRecordRaw[]) {
    routeList.forEach((route) => {
        router.addRoute(route);
    });
}

// 结合上面两个方法 先删除掉之前的路由再添加后面的路由 更改store里面的路由
export function changeRouter() {
    let newRouter: RouteRecordRaw[];
    // 根据权限情况获得异步路由
    if (roleIsAdmin()) {
        newRouter = asyncRouter;
    } else {
        // 将深拷贝的路由传递过去
        newRouter = getCommonRouter(deepClone(asyncRouter));
    }
    store.commit('setRoutes', newRouter);
    resetRouter();
    addRouter(newRouter);
}
