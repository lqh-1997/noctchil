<template>
    <header>
        <ul>
            <li v-for="item of headList" :key="item.name">
                <span>{{ item.name }}</span>
                <dl>
                    <dd v-for="(subItem, subIndex) of item.children" :key="subIndex">
                        {{ subItem.name }}
                    </dd>
                </dl>
            </li>
        </ul>
        <div style="float: right; margin-right: 20px;" @click="handleLogout">注销</div>
        <div style="float: right; margin-right: 20px;" @click="handleLogout">登录</div>
    </header>
</template>

<script>
import { logout } from '../api/user';
export default {
    data() {
        return {
            headList: [
                {
                    name: '首页',
                    children: [
                        {
                            name: '首页1'
                        },
                        {
                            name: '首页2'
                        },
                        {
                            name: '首页3'
                        }
                    ]
                },
                {
                    name: '不是首页1',
                    children: [
                        {
                            name: 'a'
                        }
                    ]
                },
                {
                    name: '不是首页2',
                    children: [
                        {
                            name: 'b'
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        handleLogout() {
            logout(this).then((res) => {
                this.$message({
                    message: res.data.message,
                    type: 'success'
                });
            });
        }
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
}
header ul {
    width: $defaultLayoutWidth;
    margin: 0 auto;
}
header ul li {
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
header ul li {
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
@media screen and (max-width: $defaultLayoutWidth) {
    header ul {
        width: 100%;
    }
}
@media screen and(max-width: $defaultMiddleWidth) {
    header {
        display: none;
    }
}
</style>
