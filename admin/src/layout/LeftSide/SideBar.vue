<template>
    <!-- 此菜单仅支持一级子菜单 若要支持多级 递归调用sub-menu -->
    <a-menu
        mode="inline"
        v-model:openKeys="openKey"
        v-model:selectedKeys="selectKey"
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
import { computed, defineComponent, PropType, ref, watch } from 'vue';
import { HomeOutlined, EditOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Menu } from 'ant-design-vue';
import { menuPrefix } from '/@/router/index';
import { key } from '/@/store';
export default defineComponent({
    name: 'SideBar',
    props: {
        openKeys: {
            type: Array as PropType<string[]>
        },
        selectKeys: {
            type: Array as PropType<string[]>
        }
    },
    components: {
        HomeOutlined,
        EditOutlined,
        AMenu: Menu,
        ASubMenu: Menu.SubMenu,
        AMenuItem: Menu.Item
    },
    setup(props, { emit }) {
        const router = useRouter();
        const store = useStore(key);

        const storeComputed = computed(() => store.state.apply.routes);

        // 获取子组件传来的菜单列表
        const openKey = ref(props.openKeys);
        const selectKey = ref(props.selectKeys);

        // 为了实现双向绑定 父组件改变的时候传递给子组件
        // props是read only的 不知道有没有更好的监听的实现方式 我觉得现在这样写很傻逼
        watch(
            () => props.openKeys,
            (value) => {
                openKey.value = value;
            }
        );
        watch(
            () => props.selectKeys,
            (value) => {
                selectKey.value = value;
            }
        );
        // 为了实现双向绑定 子组件改变的时候emit给父组件
        watch(openKey, (value) => {
            emit('update:openKeys', value);
            emit('resetMenuWidth');
        });

        watch(selectKey, (value) => {
            emit('update:selectKeys', value);
            emit('resetMenuWidth');
        });

        // 重定向
        const redirect = function (menu: any) {
            let path = `/${menuPrefix}/` + menu.keyPath.reverse().join('/');
            router.push({ path });
        };

        return {
            redirect,
            storeComputed,
            openKey,
            selectKey
        };
    }
});
</script>

<style lang="scss" scoped>
.ant-menu-inline,
.ant-menu-vertical,
.ant-menu-vertical-left {
    border: none;
}
</style>
