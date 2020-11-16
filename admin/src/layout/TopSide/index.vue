<template>
    <a-layout-header>
        <div class="left">
            <menu-unfold-outlined v-if="collapsed" class="trigger" @click="toggleCollapse" />
            <menu-fold-outlined v-else class="trigger" @click="toggleCollapse" />
            <span>{{ myRoute }}</span>
        </div>
        <div class="right">
            <a-dropdown>
                <a class="avatar-link" @click="(e) => e.preventDefault()">
                    <a-avatar
                        class="avatar"
                        src="https://mirror-gold-cdn.xitu.io/17273f8a79d2684278a?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1"
                    />
                    <span class="avatar-username">{{ username }}</span>
                </a>
                <!-- FIXME 使用menu的时候权限较少的人移上去会报错 -->
                <template v-slot:overlay>
                    <!-- <a-menu @click="clickHead">
                        <a-menu-item @click="signOut">注销</a-menu-item>
                        <a-menu-item> 2nd menu item </a-menu-item>
                        <a-menu-item> 3rd menu item </a-menu-item>
                    </a-menu> -->
                    <ul class="menu-overlay">
                        <li>个人中心</li>
                        <li @click="signOut">注销</li>
                    </ul>
                </template>
            </a-dropdown>
        </div>
    </a-layout-header>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import { Layout, Dropdown, Avatar, Menu } from 'ant-design-vue';
import { removeAuthorize } from '/@/utils/authorize';
import type { PropType } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
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
        const router = useRouter();
        const store = useStore();
        const currentRoute: any = router.currentRoute;
        const myRoute = computed(() => {
            return (
                (currentRoute.value.meta && currentRoute.value.meta.title) ||
                currentRoute.value.name
            );
        });

        const username = computed(() => store.state.user.nicename);

        const toggleCollapse = function () {
            emit('collapseHandler');
        };

        const clickHead = function (e: any) {
            console.log(e);
        };

        const signOut = async function () {
            await removeAuthorize();
            router.push('/login');
        };

        return { toggleCollapse, clickHead, myRoute, signOut, username };
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
    .left {
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
    }
    .right {
        display: flex;
        margin-right: 24px;
        height: 64px;
        .avatar-username {
            margin-left: 8px;
            color: #333;
        }
        .ant-avatar {
            flex-basis: 40px;
            &:hover {
                cursor: pointer;
            }
        }
    }
}
.menu-overlay {
    width: 96px;
    background-color: white;
    list-style: none;
    li {
        width: 100%;
        height: 32px;
        line-height: 32px;
        border-bottom: 1px solid rgb(247, 247, 247);
        padding-left: 10px;
        &:hover {
            background-color: #eee;
            cursor: pointer;
        }
    }
}
</style>
