import Layout from '/@/layout/index.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { homeRouter } from './modules/home';
import { settingRouter } from './modules/setting';
import { articleRouter } from './modules/article';
import { testRouter } from './modules/test';
import { AlignCenterOutlined } from '@ant-design/icons-vue';

// 会遍历这个前缀下的所有children来生成侧边栏菜单
// 所以要生成菜单的写在path: `/${menuPrefix}`下即可
export const menuPrefix = 'menu';

// 未登录也能访问
export const commonRouter: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('/@/views/Login/index.vue')
    }
];

// 登录之后生成 要遍历的对象 一定要有name属性(removeRoute要用到)
export const asyncRouter: RouteRecordRaw[] = [
    {
        path: `/${menuPrefix}`,
        name: `${menuPrefix}`,
        redirect: `/${menuPrefix}/home/workbench`,
        component: Layout,
        children: [
            homeRouter,
            settingRouter,
            articleRouter,
            testRouter,
            {
                path: 'singlePage',
                name: 'singlePage',
                component: () => import('/@/views/SinglePage.vue'),
                meta: {
                    title: '单身页面',
                    icon: AlignCenterOutlined
                }
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: commonRouter,
    // https://next.router.vuejs.org/guide/advanced/scroll-behavior.html#scroll-behavior
    scrollBehavior: async (_to, _from, savedPosition) => {
        if (savedPosition) {
            return savedPosition;
        } else {
            return false;
        }
    }
});

// 这个方法是在路由resolved之后才触发的
// router.beforeResolve()

export default router;
