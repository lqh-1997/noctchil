import type { RouteRecordRaw } from 'vue-router';
import { HomeOutlined } from '@ant-design/icons-vue';

export const homeRouter: RouteRecordRaw = {
    path: 'home',
    name: 'home',
    component: () => import('/@/views/Blank.vue'),
    meta: {
        title: '主页',
        icon: HomeOutlined
    },
    children: [
        {
            path: 'workbench',
            name: ' workbench',
            component: () => import('/@/views/Home/Workbench.vue'),
            meta: {
                title: '工作台'
            }
        }
    ]
};
