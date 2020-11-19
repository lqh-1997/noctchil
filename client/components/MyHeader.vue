<template>
    <header>
        <ul>
            <!-- 最多仅支持二级菜单 item: [{name, target, _id, url, children}] -->
            <li v-for="item of headList" :key="item._id">
                <a v-if="item.target === '_blank'" :href="item.url" target="_blank">
                    <span>{{ item.name }}</span>
                </a>
                <nuxt-link v-else :to="item.url">
                    <span>{{ item.name }}</span>
                </nuxt-link>
                <dl :ref="item._id">
                    <dd v-for="subItem of item.children" :key="subItem._id">
                        <a v-if="subItem.target === '_blank'" :href="subItem.url" target="_blank">
                            <span>{{ subItem.name }}</span>
                        </a>
                        <nuxt-link v-else :to="subItem.url">
                            <span>{{ subItem.name }}</span>
                        </nuxt-link>
                    </dd>
                </dl>
            </li>
        </ul>

        <!-- 这里还不支持二级菜单 -->
        <el-dropdown>
            <span class="el-dropdown-link">
                <span>主页</span><i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item of headList" :key="item.name">
                    {{ item.name }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <!-- TODO 支持二级菜单 -->
        <!-- <div class="dropdown" @click="showDropdownMenu">
            <span>主页</span>
            <svg-icon :iconClass="'dropdown-nocolor'"></svg-icon>
        </div>

        <dropdown class="dropdown-panel" v-show="dropdownShow"></dropdown> -->

        <div @click="handleLogout" v-if="isLogin" class="account-button">注销</div>
        <div v-if="!isLogin" class="account-button">
            <nuxt-link to="/login">登录</nuxt-link>
        </div>
        <div v-if="!isLogin" class="account-button">
            <nuxt-link to="/signup">注册</nuxt-link>
        </div>
    </header>
</template>

<script>
import { logout } from '../api/user';
import { removeCookie } from '../util/cookie';
import { mapGetters, mapMutations } from 'vuex';
import { getHeaderMenu } from '../api/platform';
// import SvgIcon from './SvgIcon.vue';
// import Dropdown from './Dropdown.vue';
export default {
    // components: { SvgIcon, Dropdown },
    data() {
        return {
            dropdownShow: false,
            isLogin: false,
            headList: [
                {
                    name: '首页',
                    url: '/home'
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
        // showDropdownMenu() {
        //     this.dropdownShow = !this.dropdownShow;
        // }
    },
    computed: {
        ...mapGetters(['getUserId'])
    },
    watch: {
        getUserId(data) {
            this.isLogin = !!data;
        }
    },
    async mounted() {
        this.isLogin = !!this.$store.state.userId;
        const res = await getHeaderMenu(this);
        this.headList = res.data.data;
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/global.scss';
$headerFontColor: #eee;
header {
    height: 46px;
    background-color: rgba($color: #4e4e4e, $alpha: 0.8);
    line-height: 46px;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1999;
    .account-button {
        float: right;
        margin-right: 20px;
        color: $headerFontColor;
        cursor: pointer;
        &:hover {
            color: $defaultColor;
        }
    }
    .account-button a {
        color: $headerFontColor;
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
        color: $headerFontColor;
        &:hover {
            background-color: rgba($color: #ffffff, $alpha: 0.2);
            cursor: pointer;
        }
    }
    &:hover {
        & dl {
            opacity: 1;
            display: block;
        }
    }
}
header > ul li {
    dl {
        transition: opacity 0.3s ease;
        opacity: 0;
        display: none;
        background-color: rgba($color: #4e4e4e, $alpha: 0.8);
    }
    dd {
        transition: background-color 0.3s ease;
        color: $headerFontColor;
        &:hover {
            background-color: rgba($color: #fff, $alpha: 0.2);
            cursor: pointer;
        }
    }
}
// header .dropdown {
//     display: none;
//     width: 100px;
//     text-align: center;
//     font-size: 18px;
//     color: white;
//     font-weight: bold;
//     font-family: 'jdzhonyuanjian241c9062f22293f';
//     cursor: pointer;
//     &:hover {
//         color: $defaultColor;
//     }
// }
// header .dropdown-panel {
//     top: 46px;
//     left: 30px;
//     display: none;
// }
header .el-dropdown {
    display: none;
    width: 100px;
    text-align: center;
    font-size: 18px;
    color: $defaultColor;
    font-weight: bold;
    span {
        font-family: 'jdzhonyuanjian241c9062f22293f';
        &:focus {
            outline: none;
        }
    }
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
    // header .dropdown {
    //     display: inline-block;
    // }
    // header .dropdown-panel {
    //     display: block;
    // }
}
</style>
