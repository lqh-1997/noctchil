<template>
    <a-layout-header>
        <div class="left">
            <menu-unfold-outlined v-if="collapsed" class="trigger" @click="toggleCollapse" />
            <menu-fold-outlined v-else class="trigger" @click="toggleCollapse" />
            <span>4564897987</span>
        </div>
        <div class="right">
            <a-dropdown>
                <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                    <a-avatar
                        class="avatar"
                        src="https://mirror-gold-cdn.xitu.io/17273f8a79d2684278a?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1"
                    />
                </a>
                <template v-slot:overlay>
                    <a-menu @click="clickHead">
                        <a-menu-item key="1"> 1st menu item </a-menu-item>
                        <a-menu-item key="2"> 2nd menu item </a-menu-item>
                        <a-menu-item key="3"> 3rd menu item </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
    </a-layout-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import { Layout, Dropdown, Avatar, Menu } from 'ant-design-vue';
import type { PropType } from 'vue';
export default defineComponent({
    name: 'topSide',
    components: {
        MenuUnfoldOutlined,
        MenuFoldOutlined,
        AMenu: Menu,
        AMenuItem: Menu.Item,
        ALayoutHeader: Layout.Header,
        ADropdown: Dropdown,
        AAvatar: Avatar
    },
    props: {
        collapsed: {
            type: Boolean as PropType<boolean>
        }
    },
    setup(_, { emit }) {
        const toggleCollapse = function () {
            emit('collapseHandler');
        };

        const clickHead = function (e: any) {
            console.log(e);
        };

        return { toggleCollapse, clickHead };
    }
});
</script>

<style lang="scss" scoped>
.ant-layout-header {
    display: flex;
    background-color: #fff;
    padding: 0;
    flex-wrap: nowrap;
    justify-content: space-between;
    .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
        &:hover {
            color: #1890ff;
        }
    }
    .ant-avatar {
        margin-right: 24px;
        width: 40px;
        height: 40px;
        &:hover {
            cursor: pointer;
        }
    }
}
</style>
