<template>
    <!-- 此菜单仅支持一级子菜单 若要支持多级 递归调用sub-menu -->
    <a-menu
        theme="dark"
        mode="inline"
        v-model:selectedKeys="selectKeys"
        :forceSubMenuRender="true"
        @click="redirect"
    >
        <template v-for="item of storeComputed[0].children" :key="item.path">
            <!-- 子节点存在且长度大于0 + (如果meta出现hidden就隐藏) -->
            <a-sub-menu
                v-if="
                    item.children &&
                    item.children.length > 0 &&
                    (!item.meta || (item.meta && !item.meta.hidden))
                "
                :key="item.path"
            >
                <template v-slot:title>
                    <component :is="item.meta && item.meta.icon"></component>
                    <span>{{ (item.meta && item.meta.title) || item.path }}</span>
                </template>
                <!-- 如果meta出现hidden就隐藏 -->
                <template v-for="subItem of item.children">
                    <a-menu-item
                        v-if="!subItem.meta || (subItem.meta && !subItem.meta.hidden)"
                        :key="subItem.path"
                    >
                        {{ subItem.meta.title }}
                    </a-menu-item>
                </template>
            </a-sub-menu>
            <!-- 子节点不存在 + (如果meta出现hidden就隐藏) -->
            <a-menu-item
                v-if="!item.children && (!item.meta || (item.meta && !item.meta.hidden))"
                :key="item.path"
            >
                <component :is="item.meta && item.meta.icon"></component>
                <span>{{ (item.meta && item.meta.title) || item.path }}</span>
            </a-menu-item>
        </template>
    </a-menu>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { HomeOutlined, EditOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
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
        const store = useStore();
        const selectKeys = ref(['1']);

        const storeComputed = computed(() => {
            return store.state.apply.routes;
        });

        // 重定向
        const redirect = function (menu: any) {
            let path = `/${menuPrefix}/` + menu.keyPath.reverse().join('/');
            router.push({ path });
        };

        return {
            selectKeys,
            redirect,
            storeComputed
        };
    }
});
</script>

<style lang="scss" scoped></style>
