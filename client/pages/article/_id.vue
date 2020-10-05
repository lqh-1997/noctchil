<template>
    <div class="article-layout">
        <div class="article-main">
            <article>
                <h1>{{ article.title }}</h1>
                <my-viewer :initialValue="viewer" class="viewer"></my-viewer>
            </article>
            <comment @commentSuccess="updateComment" v-if="isLogin"></comment>
            <div class="article-reply">
                <reply v-for="item of comment" :key="item.id" :reply="item"></reply>
            </div>
        </div>
        <side-flow class="article-side-flow"></side-flow>
    </div>
</template>

<script>
import MyViewer from '../../components/MyViewer';
import Comment from '../../components/Comment';
import Reply from '../../components/Reply';
import SideFlow from '../../components/SideFlow/index';
import { getArticleById } from '../../api/article';
import { getCommentsByArticleId } from '../../api/comment';
import { mapGetters } from 'vuex';
export default {
    layout: 'home',
    components: {
        MyViewer,
        SideFlow,
        Comment,
        Reply
    },
    data() {
        return {
            isLogin: false
        };
    },
    methods: {
        async updateComment() {
            const commentRes = await getCommentsByArticleId(this, this.$route.params.id);
            this.comment = commentRes.data.data;
        }
    },
    computed: {
        ...mapGetters(['getUserId'])
    },
    watch: {
        getUserId(data) {
            console.log(data);
            this.isLogin = !!data;
        }
    },
    mounted() {
        this.isLogin = !!this.$store.state.userId;
    },
    async asyncData(Context) {
        const id = Context.params.id;
        try {
            const articleRes = await getArticleById(Context, id);
            const article = articleRes.data.data;
            const viewer = article.content;
            const commentRes = await getCommentsByArticleId(Context, id);
            const comment = commentRes.data.data;
            return {
                id,
                article,
                viewer,
                comment
            };
        } catch (error) {
            Context.error(error);
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/global.scss';
.article-layout {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-top: $articleGap;
    .article-main {
        flex-basis: 700px;
        flex-grow: 1;
        article {
            background-color: white;
            border: #ddd 1px solid;
            padding: 20px;
            border-radius: 4px;
            h1 {
                text-align: center;
                font-size: 46px;
                font-weight: bold;
            }
            .viewer {
                min-height: 300px;
            }
        }
        .article-reply {
            margin-top: 20px;
            border-radius: 8px;
            background-color: white;
        }
    }
}
@media screen and (max-width: $defaultMiddleWidth) {
    .article-layout {
        .article-main {
            width: 100%;
            article {
                border: none;
            }
        }
    }
}
</style>
