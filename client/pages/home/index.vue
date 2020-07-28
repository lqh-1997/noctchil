<template>
    <section>
        <ul class="list">
            <template v-for="item of articleList">
                <li class="message" :key="item.id" v-if="item.type === 'message'">
                    <h1>{{ item.title }}</h1>
                    <article>{{ item.content }}</article>
                </li>
                <li class="article" :key="item.id" v-else-if="item.type === 'article'">
                    <h1>{{ item.title }}</h1>
                    <article>{{ item.content }}</article>
                </li>
            </template>
        </ul>
        <side-flow class="side" ref="side"></side-flow>
    </section>
</template>

<script>
import SideFlow from '../../components/SideFlow';
import { getAllArticle } from '../../api/article';
export default {
    layout: 'home',
    components: {
        SideFlow
    },
    methods: {
        /**
         * 1、在window resize的时候 不会自动修改以下数据 会导致bug 所以该方法deprecated
         * 2、比较懒 所以现在采用的为position:sticky的方式 缺点是不兼容ie
         */
        /* sideSticky() {
            const side = this.$refs.side.$refs.sideFlow;
            const sideTop = side.offsetTop;
            const sideLeft = side.offsetLeft;
            const sideWidth = side.clientWidth;
            document.onscroll = () => {
                const docTop = document.body.scrollTop || document.documentElement.scrollTop;
                side.setAttribute(
                    'style',
                    docTop > sideTop
                        ? `position: fixed;top: 0px;left: ${sideLeft}px; width: ${sideWidth - 40}px`
                        : ''
                );
            };
        } */
    },
    mounted() {},
    async asyncData(Context) {
        let articleList;
        const pageNumber = 1;
        const pageSize = 10;
        await getAllArticle(Context, pageNumber, pageSize).then((res) => {
            articleList = res.data.data.data;
        });
        return {
            articleList,
            pageNumber,
            pageSize
        };
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';
@import '@/assets/scss/global.scss';
section {
    height: 100%;
    display: inline-block;
}
.side {
    float: right;
    width: 25%;
    height: 300px;
    background-color: wheat;
    margin-top: 20px;
    padding: 20px;
    position: sticky;
    top: 20px;
}
.list {
    float: left;
    width: 70%;
    .message,
    .article {
        min-height: 160px;
        background: #fff;
        border: 1px solid #444;
        border-radius: 8px;
        margin-top: 20px;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        padding: 20px;
        text-align: center;
        h1 {
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 10px;
        }
        article {
            @include text-overflow();
            line-height: 22px;
        }
    }
}

@media screen and (max-width: $defaultLayoutWidth) {
    .list {
        width: 100%;
        .message,
        .article {
            margin-right: 20px;
            margin-left: 20px;
        }
    }
    .side {
        display: none;
    }
}
</style>
