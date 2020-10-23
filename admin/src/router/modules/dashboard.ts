import type { RouteRecordRaw } from 'vue-router';
import { AlignCenterOutlined } from '@ant-design/icons-vue';

export const dashboardRouter: RouteRecordRaw = {
    path: 'home',
    name: 'home',
    // TODO 这个能不能删掉啊
    component: () => import('/@/views/blank.vue'),
    meta: {
        title: '主页',
        icon: AlignCenterOutlined
    },
    children: [
        {
            path: 'detail',
            name: ' detail',
            component: () => import('/@/views/Home/detail.vue'),
            meta: {
                title: '详情'
            }
        },
        {
            path: 'home2',
            name: 'home2',
            component: () => import('/@/views/Home/home2.vue'),
            meta: {
                title: '第二个主页, 啊哈~'
            }
        }
    ]
};
