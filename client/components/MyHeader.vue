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
        <div></div>
    </header>
</template>

<script>
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
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/global.scss';
header {
    height: 46px;
    background-color: rgba($color: #4e4e4e, $alpha: 0.8);
    line-height: 46px;
}
header ul {
    width: $defaultLayoutWidth;
    margin: 0 auto;
}
header ul li {
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
            & + dl dd {
                display: block;
            }
        }
    }
}
header ul li dl dd {
    background-color: rgba($color: #fff, $alpha: 1);
    height: 0px;
}
@media screen and (max-width: $defaultLayoutWidth) {
    header ul {
        width: 100%;
    }
}
</style>
