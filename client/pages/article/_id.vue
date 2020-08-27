<template>
    <div class="article-layout">
        <div class="article-main">
            <article>
                <h1>标题</h1>
                <my-viewer :initialValue="viewer" class="viewer"></my-viewer>
            </article>
            <comment></comment>
            <template v-for="item of comment">
                <reply :key="item.id" :reply="item"></reply>
            </template>
        </div>
        <side-flow class="article-side-flow"></side-flow>
    </div>
</template>

<script>
import MyViewer from '../../components/MyViewer';
import Comment from '../../components/Comment';
import Reply from '../../components/Reply';
import SideFlow from '../../components/SideFlow';
import { getArticleById } from '../../api/article';
import { getCommentsByArticleId } from '../../api/comment';
export default {
    layout: 'home',
    components: {
        MyViewer,
        SideFlow,
        Comment,
        Reply
    },
    data() {
        return {};
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
