<template>
    <div class="article-layout">
        <div class="article-main">
            <article>
                <h1>标题</h1>
                <viewer :initialValue="viewer" class="viewer" />
            </article>
            <comment></comment>
            <template v-for="item of commentsList">
                <comments :key="item.id"></comments>
            </template>
        </div>
        <side-flow class="article-side-flow"></side-flow>
    </div>
</template>

<script>
import Comment from '../../components/Comment';
import Comments from '../../components/Comments';
import SideFlow from '../../components/SideFlow';
import { getArticleById } from '../../api/article';
export default {
    layout: 'home',
    components: {
        SideFlow,
        Comment,
        Comments
    },
    data() {
        return {
            commentsList: [
                {
                    id: 1,
                    content: '123',
                    user: 123
                }
            ]
        };
    },
    async asyncData(Context) {
        const id = Context.params.id;
        try {
            const res = await getArticleById(Context, id);
            const article = res.data.data;
            const viewer = article.content;
            return {
                id,
                article,
                viewer
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
