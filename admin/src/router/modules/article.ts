import type { RouteRecordRaw } from 'vue-router';
import { FileOutlined } from '@ant-design/icons-vue';

export const articleRouter: RouteRecordRaw = {
    path: 'article',
    name: 'article',
    // TODO 这个能不能删掉啊
    component: () => import('/@/views/blank.vue'),
    meta: {
        title: '文章',
        icon: FileOutlined
    },
    children: [
        {
            path: 'list',
            name: 'articleList',
            component: () => import('/@/views/Article/list.vue'),
            meta: {
                title: '文章列表'
            }
        },
        {
            path: 'create',
            name: 'articleCreate',
            component: () => import('/@/views/Article/create.vue'),
            meta: {
                title: '创建文章'
            }
        }
    ]
};
