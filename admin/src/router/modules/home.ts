import type { RouteRecordRaw } from 'vue-router';
import { HomeOutlined } from '@ant-design/icons-vue';

export const homeRouter: RouteRecordRaw = {
    path: 'home',
    name: 'home',
    // TODO 这个能不能删掉啊
    component: () => import('/@/views/blank.vue'),
    meta: {
        title: '主页',
        icon: HomeOutlined
    },
    children: [
        {
            path: 'workbench',
            name: ' workbench',
            component: () => import('/@/views/Home/workbench.vue'),
            meta: {
                title: '工作台'
            }
        }
    ]
};
