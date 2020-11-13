<template>
    <a-menu
        theme="dark"
        mode="inline"
        v-model:selectedKeys="selectKeys"
        :forceSubMenuRender="true"
        @click="redirect"
    >
        <template v-for="item of menuList" :key="item.path">
            <a-sub-menu v-if="item.children" :key="item.path">
                <template v-slot:title>
                    <component :is="item.meta && item.meta.icon"></component>
                    <span>{{ (item.meta && item.meta.title) || item.path }}</span>
                </template>
                <template v-if="item.children">
                    <a-menu-item v-for="subItem of item.children" :key="subItem.path">{{
                        subItem.meta.title
                    }}</a-menu-item>
                </template>
            </a-sub-menu>
            <a-menu-item v-else :key="item.path">
                <component :is="item.meta && item.meta.icon"></component>
                <span>{{ (item.meta && item.meta.title) || item.path }}</span>
            </a-menu-item>
        </template>
    </a-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { HomeOutlined, EditOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { Menu } from 'ant-design-vue';
import { menuPrefix } from '/@/router/index';
export default defineComponent({
    name: 'SideBar',
    props: {},
    components: {
        HomeOutlined,
        EditOutlined,
        AMenu: Menu,
        ASubMenu: Menu.SubMenu,
        AMenuItem: Menu.Item
    },
    setup() {
        const router = useRouter();
        const selectKeys = ref(['1']);

        // 获取dashboard的children 用来动态生成菜单结构
        // (这个动态菜单并不能通过在内部修改权限来改变结构，如果要这样做的话要将routes放到store里面作为响应式对象)
        // TODO 监听store中routes的变化
        const routerList = router.getRoutes();
        const dashboard = routerList.filter((item) => {
            return item.path === `/${menuPrefix}`;
        });
        const menuList = dashboard[0].children;

        // 重定向
        const redirect = function (menu: any) {
            let path = `/${menuPrefix}/` + menu.keyPath.reverse().join('/');
            router.push({ path });
        };

        return {
            selectKeys,
            redirect,
            menuList
        };
    }
});
</script>

<style lang="scss" scoped></style>
