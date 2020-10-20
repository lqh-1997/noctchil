import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/dashboard',
            redirect: '/dashboard/test',
            component: () => import('/@/layout/index.vue'),
            children: [
                {
                    path: 'test',
                    name: 'test',
                    component: () => import('/@/views/Test/index')
                },
                {
                    path: 'a',
                    name: 'a',
                    component: () => import('/@/views/Test/a.vue')
                }
            ]
            // component: () => import('/@/views/index.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('/@/views/Login/index.vue')
        }
    ],
    // https://next.router.vuejs.org/guide/advanced/scroll-behavior.html#scroll-behavior
    scrollBehavior: async (_to, _from, savedPosition) => {
        if (savedPosition) {
            return savedPosition;
        } else {
            return false;
        }
    }
});

// return false 就是取消当前导航
// 重定向就是通过router.push()之类的api
router.beforeEach((_to, _from) => {});

// 这个方法是在路由resolved之后才触发的
// router.beforeResolve()

export default router;