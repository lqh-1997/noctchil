<template>
    <header>
        <ul class="header-menu">
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

        <!-- 小于960显示这个 -->
        <Dropdown class="header-drop" name="主页" :headList="headList"></Dropdown>

        <div class="header-button">
            <div @click="handleLogout" v-if="isLogin">注销</div>
            <div v-if="!isLogin">
                <nuxt-link to="/login">登录</nuxt-link>
            </div>
            <div v-if="!isLogin">
                <nuxt-link to="/signup">注册</nuxt-link>
            </div>
        </div>
    </header>
</template>

<script>
import { logout } from '@/api/user';
import { removeCookie } from '@/util/cookie';
import { mapGetters, mapMutations } from 'vuex';
import { getHeaderMenu } from '@/api/platform';
import Dropdown from '@/components/Dropdown';
export default {
    components: {
        Dropdown
    },
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
    display: flex;
    z-index: 1999;
    .header-menu {
        flex: 1;
        display: flex;
        justify-content: center;
        li {
            width: 100px;
            text-align: center;
            list-style: none;
            span {
                display: block;
                transition: background-color 0.3s ease;
                color: $headerFontColor;
                &:hover {
                    background-color: rgba($color: #ffffff, $alpha: 0.2);
                    cursor: pointer;
                }
            }
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
            &:hover {
                & dl {
                    opacity: 1;
                    display: block;
                }
            }
        }
    }
    .header-drop {
        flex: 1;
        margin-left: 20px;
        display: none;
        span {
            font-family: 'jdzhonyuanjian241c9062f22293f';
            &:focus {
                outline: none;
            }
        }
    }
    .header-button {
        flex-basis: 120px;
        flex-shrink: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        div {
            a:hover {
                color: white;
            }
        }
    }
}
@media screen and(max-width: $defaultMiddleWidth) {
    header {
        .header-menu {
            display: none;
        }
    }
    header .header-drop {
        display: flex;
        justify-content: left;
    }
}
</style>
