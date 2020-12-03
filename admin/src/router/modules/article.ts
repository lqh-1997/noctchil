import type { RouteRecordRaw } from 'vue-router';
import { FileOutlined } from '@ant-design/icons-vue';

export const articleRouter: RouteRecordRaw = {
    path: 'article',
    name: 'article',
    component: () => import('/@/views/Blank.vue'),
    meta: {
        title: '文章',
        icon: FileOutlined,
        isAdmin: true
    },
    children: [
        {
            path: 'list',
            name: 'articleList',
            component: () => import('/@/views/Article/List.vue'),
            meta: {
                title: '文章列表'
            }
        },
        {
            path: 'create',
            name: 'articleCreate',
            component: () => import('/@/views/Article/Create.vue'),
            meta: {
                title: '创建文章'
            }
        },
        {
            path: 'tag',
            name: 'articleTag',
            component: () => import('/@/views/Article/Tag.vue'),
            meta: {
                title: '标签管理'
            }
        }
    ]
};
