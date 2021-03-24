<template>
    <div>
        <div class="dropdown">
            <div class="dropdown-name">{{ name }}</div>
            <ul>
                <li v-for="item of headList" :key="item._id">
                    <template v-if="item.children && item.children.length !== 0">
                        {{ item.name }}
                        <ul>
                            <li v-for="subItem of item.children" :key="subItem._id">
                                <a
                                    v-if="subItem.target === '_blank'"
                                    :href="subItem.url"
                                    target="_blank"
                                >
                                    <span>{{ subItem.name }}</span>
                                </a>
                                <nuxt-link v-else :to="subItem.url">
                                    <span>{{ subItem.name }}</span>
                                </nuxt-link>
                            </li>
                        </ul>
                    </template>
                    <a v-else-if="item.target === '_blank'" :href="item.url" target="_blank">
                        <span>{{ item.name }}</span>
                    </a>
                    <nuxt-link v-else :to="item.url">
                        <span>{{ item.name }}</span>
                    </nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        name: {
            type: String,
            default: '--'
        },
        headList: {
            type: Array,
            default: () => {
                return [];
            }
        }
    }
};
</script>

<style lang="scss" scope>
@import '@/assets/scss/global.scss';
.dropdown {
    position: relative;
    .dropdown-name {
        width: 80px;
        text-align: center;
        border-radius: 8px;
        height: 46px;
        line-height: 46px;
        position: relative;
        font-size: 20px;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        // hover它 它的兄弟节点为block
        &:hover {
            background-color: rgba(0, 0, 0, 0.15);
            & + ul {
                display: block;
            }
        }
        // hover它的兄弟节点 它的兄弟节点为block
        & + ul:hover {
            display: block;
        }
    }
    // 所有ul一开始都不显示
    ul {
        list-style: none;
        display: none;
        position: absolute;
        background-color: rgba($color: #4e4e4e, $alpha: 0.8);
        left: -2px;
        ul {
            top: 0;
            left: 100%;
        }
        li {
            position: relative;
            width: 100px;
            color: white;
            transition: all 0.3s ease;
            cursor: pointer;
            padding-left: 10px;
            a {
                display: block;
                color: white;
            }
            &:hover {
                background-color: rgba(0, 0, 0, 0.15);
            }
            // hover了对应li 则显示它第一级子节点ul
            &:hover > ul {
                display: block;
            }
        }
    }
}
</style>
