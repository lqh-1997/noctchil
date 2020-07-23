<template>
    <section>
        <ul>
            <template v-for="item of article">
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
    </section>
</template>

<script>
export default {
    layout: 'home',
    data() {
        return {
            article: [
                {
                    id: 1,
                    title: '你好啊',
                    content: '再见啦',
                    type: 'message'
                },
                {
                    id: 2,
                    title: '吃了吗',
                    content: '吃个鬼吃个鬼吃个鬼吃个鬼吃个鬼吃个鬼吃个鬼吃个鬼吃个鬼吃个鬼',
                    type: 'article'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';
@import '@/assets/scss/global.scss';
.message,
.article {
    width: 70%;
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
@media screen and (max-width: $defaultLayoutWidth) {
    .message,
    .article {
        width: 100%;
        padding: 0;
    }
}
</style>
