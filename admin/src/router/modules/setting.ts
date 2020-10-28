import type { RouteRecordRaw } from 'vue-router';
import { SettingOutlined } from '@ant-design/icons-vue';

export const settingRouter: RouteRecordRaw = {
    path: 'setting',
    name: 'setting',
    // TODO 这个能不能删掉啊
    component: () => import('/@/views/Blank.vue'),
    meta: {
        title: '设置',
        icon: SettingOutlined
    },
    children: [
        {
            path: 'global',
            name: ' global',
            component: () => import('/@/views/Setting/Global.vue'),
            meta: {
                title: '全局设置'
            }
        }
    ]
};
