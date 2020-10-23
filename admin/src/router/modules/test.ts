import type { RouteRecordRaw } from 'vue-router';
import { AlignCenterOutlined } from '@ant-design/icons-vue';

export const testRouter: RouteRecordRaw = {
    path: 'test',
    name: 'test',
    // TODO 这个能不能删掉啊
    component: () => import('/@/views/blank.vue'),
    meta: {
        title: '测试',
        icon: AlignCenterOutlined
    },
    children: [
        {
            path: 'test1',
            name: ' test1',
            component: () => import('/@/views/Test/test1.vue'),
            meta: {
                title: '测试1'
            }
        },
        {
            path: 'test2',
            name: 'test2',
            component: () => import('/@/views/Test/test2'),
            meta: {
                title: '第二个测试页, 啊哈~'
            }
        }
    ]
};
