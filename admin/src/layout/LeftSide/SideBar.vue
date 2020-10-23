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
                    <span>{{ (item.meta && item.meta.title) || item.path }}</span>
                </template>
                <template v-if="item.children">
                    <a-menu-item v-for="subItem of item.children" :key="subItem.path">{{
                        subItem.meta.title
                    }}</a-menu-item>
                </template>
            </a-sub-menu>
            <a-menu-item v-else :key="item.path">
                {{ (item.meta && item.meta.title) || item.path }}
            </a-menu-item>
        </template>
    </a-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { HomeOutlined, EditOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
export default defineComponent({
    name: 'SideBar',
    props: {},
    components: {
        HomeOutlined,
        EditOutlined
    },
    setup() {
        const router = useRouter();
        const selectKeys = ref(['1']);

        // 获取dashboard的children 用来动态生成菜单结构
        const routerList = router.getRoutes();
        const dashboard = routerList.filter((item) => {
            return item.path === '/dashboard';
        });
        const menuList = dashboard[0].children;

        // 重定向
        const redirect = function (menu: any) {
            let path = '/dashboard/' + menu.keyPath.reverse().join('/');
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
