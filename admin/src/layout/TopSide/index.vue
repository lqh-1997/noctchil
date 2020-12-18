<template>
    <a-layout-header>
        <div class="left">
            <menu-unfold-outlined v-if="collapse" class="trigger" @click="toggleCollapse" />
            <menu-fold-outlined v-else class="trigger" @click="toggleCollapse" />
            <span>{{ myRoute }}</span>
        </div>
        <div class="right">
            <a-dropdown>
                <!-- 两层div解决dropdown导致css无法正常生效的bug -->
                <div>
                    <div class="right-info">
                        <img
                            class="avatar"
                            src="https://mirror-gold-cdn.xitu.io/17273f8a79d2684278a?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1"
                        />
                        <span class="avatar-username">{{ username }}</span>
                    </div>
                </div>
                <template v-slot:overlay>
                    <a-menu @click="clickHead">
                        <a-menu-item @click="signOut">注销</a-menu-item>
                        <a-menu-item> 2nd menu item </a-menu-item>
                        <a-menu-item> 3rd menu item </a-menu-item>
                    </a-menu>
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
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { key } from '/@/store/index';
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
    setup(_) {
        const router = useRouter();
        const store = useStore(key);
        const currentRoute: any = router.currentRoute;
        const myRoute = computed(() => {
            return (
                (currentRoute.value.meta && currentRoute.value.meta.title) ||
                currentRoute.value.name
            );
        });

        const username = computed(() => store.state.user.nicename);
        const collapse = computed(() => store.state.apply.collapse);

        const toggleCollapse = function () {
            store.commit('toggleCollapse');
        };

        const clickHead = function (e: any) {
            console.log(e);
        };

        const signOut = async function () {
            await removeAuthorize();
            router.push('/login');
        };

        return { toggleCollapse, clickHead, myRoute, signOut, username, collapse };
    }
});
</script>

<style lang="scss" scoped>
@import '../../assets/scss/global.scss';
.ant-layout-header {
    display: flex;
    background-color: #fff;
    padding: 0;
    flex-wrap: nowrap;
    justify-content: space-between;
    box-shadow: rgba(48, 48, 48, 0.24) 0 0 2px 2px;
    .left {
        .trigger {
            font-size: 20px;
            line-height: 64px;
            padding: 0 24px;
            cursor: pointer;
            transition: all 0.3s ease;
            &:hover {
                color: $defaultColor;
            }
        }
    }
    .right {
        display: flex;
        margin-right: 24px;
        height: 64px;
        align-items: center;
        .right-info {
            height: 48px;
            display: flex;
            align-items: center;
            padding: 0 10px;
            &:hover {
                background-color: rgba(0, 0, 0, 0.1);
                border-radius: 12px;
            }
            .avatar {
                height: 34px;
                width: 34px;
                border-radius: 50%;
                display: block;
                flex: 1;
            }
            .avatar-username {
                margin-left: 8px;
                color: #333;
                display: block;
                height: 34px;
                line-height: 34px;
            }
        }
    }
}
</style>
