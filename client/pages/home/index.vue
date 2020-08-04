<template>
    <section>
        <ul class="list">
            <li class="article" v-if="!articleList || articleList.length === 0">
                <div class="article-container">
                    <h1>
                        <nuxt-link to="#">暂无文章</nuxt-link>
                    </h1>
                    <article>
                        没有啊 给爷爬
                    </article>
                </div>
                <ul class="info">
                    <li>2020 8 2</li>
                    <li>0条评论</li>
                    <li>0次阅读</li>
                    <li>2人点赞</li>
                    <li>fantasy</li>
                    <li>阅读全文</li>
                </ul>
            </li>
            <li class="message">
                <div class="user">
                    <div class="avatar"></div>
                    <div class="user-info">
                        <div class="username">fantasy</div>
                        <div class="date">2020年5月22日 08:56</div>
                    </div>
                </div>
                <div class="message-content">
                    你好啊你好啊你好啊你好啊你好啊你
                </div>
                <ul class="info">
                    <li>点赞</li>
                    <li>阅读</li>
                </ul>
            </li>
            <template v-for="item of articleList">
                <li class="message" :key="item._id" v-if="item.type === 'message'">
                    <div class="user">
                        <div class="avatar"></div>
                        <div class="user-info">
                            <div class="username">{{ item.username }}</div>
                            <div class="date">{{ item.createTime }}</div>
                        </div>
                    </div>
                    <div class="message-content">{{ item.content }}</div>
                    <ul class="info">
                        <li>点赞</li>
                        <li>阅读</li>
                    </ul>
                </li>
                <li class="article" :key="item._id" v-else-if="item.type === 'article'">
                    <div class="article-container">
                        <h1>
                            <nuxt-link :to="'/article/' + item._id">{{ item.title }}</nuxt-link>
                        </h1>
                        <article>
                            {{ item.content }}
                        </article>
                    </div>
                    <ul class="info">
                        <li>2020 8 2</li>
                        <li>0条评论</li>
                        <li>0次阅读</li>
                        <li>2人点赞</li>
                        <li>fantasy</li>
                        <li>阅读全文</li>
                    </ul>
                </li>
            </template>
        </ul>
        <side-flow></side-flow>
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
    mounted() {},
    async asyncData(Context) {
        const pageNumber = 1;
        const pageSize = 10;
        const res = await getAllArticle(Context, pageNumber, pageSize);
        const articleList = res.data.data.data;
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
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-top: $articleGap;
}
.list {
    flex-basis: 700px;
    flex-grow: 1;
    .message,
    .article {
        &:not(:first-child) {
            margin-top: $articleGap;
        }
        min-height: 100px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
    }
    .message {
        .user {
            margin: 20px 20px 15px 20px;
            height: 40px;
            display: flex;
            align-items: center;
            .avatar {
                width: 50px;
                height: 50px;
                margin-right: 20px;
                border-radius: 50% 50%;
                background-color: wheat;
            }
            .user-info {
                line-height: 18px;
                .username {
                    font-weight: bold;
                }
                .date {
                    color: #666;
                    font-size: 12px;
                }
            }
        }
        .message-content {
            margin-left: 40px;
            margin-right: 20px;
        }
        .info {
            list-style: none;
            margin-top: 20px;
            height: 40px;
            line-height: 40px;
            border-top: 1px solid #ddd;
            li {
                width: 50%;
                float: left;
                text-align: center;
                box-sizing: border-box;
                color: #7a7a7a;
                &:first-of-type {
                    border-right: 1px solid #ddd;
                }
            }
        }
    }
    .article {
        min-height: 200px;
        justify-content: space-between;
        .article-container {
            text-align: center;
            &:hover {
                background-color: rgba($color: #000000, $alpha: 0.2);
                article {
                    opacity: 1;
                    transform: translateY(-10px);
                }
                h1 {
                    transform: translateY(-15px);
                }
            }
            h1 {
                margin: 100px 50px 20px 50px;
                flex-grow: 1;
                font-size: 36px;
                font-weight: bold;
                @include text-overflow(1);
                transition: all 0.3s ease;
                a {
                    color: black;
                }
            }
            article {
                transition: all 0.3s ease;
                height: 44px;
                margin: 0 20px 30px 20px;
                @include text-overflow(2);
                line-height: 22px;
                opacity: 0;
            }
        }
        ul {
            border-radius: 0 0 8px 8px;
            flex-basis: 36px;
            border-top: #ddd 1px solid;
            height: 36px;
            line-height: 36px;
            width: 100%;
            list-style: none;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            font-size: 12px;
        }
    }
}

@media screen and (max-width: $defaultMiddleWidth) {
    .list {
        width: 100%;
        .message,
        .article {
            margin-right: 20px;
            margin-left: 20px;
        }
    }
}
</style>
