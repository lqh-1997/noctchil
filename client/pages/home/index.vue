<template>
    <my-article
        :articleList="articleList"
        :total="total"
        @handleGetArticleList="getArticleList"
    ></my-article>
</template>

<script>
import MyArticle from '../../components/MyArticle';
import { getAllArticle } from '../../api/article';
export default {
    layout: 'home',
    components: {
        MyArticle
    },
    methods: {
        getArticleList(pageNumber) {
            getAllArticle(this, pageNumber, this.pageSize).then((res) => {
                this.total = res.data.data.total;
                this.articleList = res.data.data.data;
            });
        }
    },
    async asyncData(Context) {
        const pageNumber = 1;
        const pageSize = 10;
        const res = await getAllArticle(Context, pageNumber, pageSize);
        const articleList = res.data.data.data;
        return {
            articleList,
            pageNumber,
            pageSize,
            total: res.data.data.total
        };
    }
};
</script>
