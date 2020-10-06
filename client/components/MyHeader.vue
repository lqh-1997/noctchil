<template>
    <header>
        <ul>
            <li v-for="item of headList" :key="item.name">
                <nuxt-link :to="item.to">
                    <span>
                        {{ item.name }}
                    </span>
                </nuxt-link>
                <dl>
                    <dd v-for="(subItem, subIndex) of item.children" :key="subIndex">
                        {{ subItem.name }}
                    </dd>
                </dl>
            </li>
        </ul>

        <el-dropdown>
            <span class="el-dropdown-link">
                首页<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item of headList" :key="item.name">
                    {{ item.name }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <div
            style="float: right; margin-right: 20px;"
            @click="handleLogout"
            v-if="isLogin"
            class="account-button"
        >
            注销
        </div>
        <div style="float: right; margin-right: 20px;" v-if="!isLogin" class="account-button">
            <nuxt-link to="/login">登录</nuxt-link>
        </div>
        <div style="float: right; margin-right: 20px;" v-if="!isLogin" class="account-button">
            <nuxt-link to="/signup">注册</nuxt-link>
        </div>
    </header>
</template>

<script>
import { logout } from '../api/user';
import { removeCookie } from '../util/cookie';
import { mapGetters, mapMutations } from 'vuex';
export default {
    data() {
        return {
            isLogin: false,
            headList: [
                {
                    name: '首页',
                    to: '/home'
                }
            ]
        };
    },
    methods: {
        ...mapMutations(['setUserId']),
        // 请求失败就直接将cookie重置
        handleLogout() {
            this.setUserId(0);
            logout(this)
                .then((res) => {
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    });
                })
                .catch((err) => {
                    removeCookie('noctchil_s.sig');
                    removeCookie('noctchil_s');
                    throw err;
                });
        }
    },
    computed: {
        ...mapGetters(['getUserId'])
    },
    watch: {
        getUserId(data) {
            this.isLogin = !!data;
        }
    },
    mounted() {
        this.isLogin = !!this.$store.state.userId;
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/global.scss';
header {
    height: 46px;
    background-color: rgba($color: #4e4e4e, $alpha: 0.8);
    line-height: 46px;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1999;
    .account-button {
        color: #eee;
        cursor: pointer;
        &:hover {
            color: $defaultColor;
        }
    }
    .account-button a {
        color: #eee;
        &:hover {
            color: $defaultColor;
        }
    }
}
header > ul {
    width: $defaultLayoutWidth;
    margin: 0 auto;
}
header > ul li {
    list-style: none;
    float: left;
    min-width: 100px;
    height: 100%;
    text-align: center;
    span {
        display: block;
        width: 100%;
        margin: 0;
        transition: background-color 0.3s ease;
        color: #eee;
        &:hover {
            background-color: rgba($color: #ffffff, $alpha: 0.2);
            cursor: pointer;
            & + dl {
                opacity: 1;
                visibility: visible;
            }
        }
    }
}
header > ul li {
    dl {
        transition: opacity 0.3s ease;
        opacity: 0;
        visibility: hidden;
        background-color: rgba($color: #4e4e4e, $alpha: 0.8);
        &:hover {
            opacity: 1;
            visibility: visible;
        }
    }
    dd {
        transition: background-color 0.3s ease;
        &:hover {
            background-color: rgba($color: #fff, $alpha: 0.2);
            cursor: pointer;
        }
    }
}
header .el-dropdown {
    display: none;
    width: 100px;
    text-align: center;
    font-size: 18px;
    color: $defaultColor;
    font-weight: bold;
    font-family: '微软雅黑';
}
body /deep/ .el-dropdown-menu {
    .popper__arrow {
        display: none;
    }
}
@media screen and (max-width: $defaultLayoutWidth) {
    header ul {
        width: 100%;
    }
}
@media screen and(max-width: $defaultMiddleWidth) {
    header > ul {
        display: none;
    }
    header .el-dropdown {
        display: inline-block;
    }
}
</style>
