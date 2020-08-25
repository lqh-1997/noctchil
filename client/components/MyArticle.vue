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
                    <li>2020-08-02</li>
                    <li>0条评论</li>
                    <li>0次阅读</li>
                    <li>0人点赞</li>
                    <li>阅读全文</li>
                </ul>
            </li>
            <template v-for="item of articleList">
                <li class="message" :key="item._id" v-if="item.type === 'message'">
                    <div class="user">
                        <div class="avatar"></div>
                        <div class="user-info">
                            <div class="username">xiaoming</div>
                            <div class="date">{{ item.createTime | timeFormat }}</div>
                        </div>
                    </div>
                    <div class="message-content">{{ item.content }}</div>
                    <ul class="info">
                        <li>点赞{{ item.meta.likes }}</li>
                        <li>评论{{ item.meta.comments }}</li>
                    </ul>
                </li>
                <li class="article" :key="item._id" v-else-if="item.type === 'article'">
                    <div class="article-container">
                        <h1>
                            <nuxt-link :to="'/article/' + item._id">{{ item.title }}</nuxt-link>
                        </h1>
                        <article>
                            {{ item.desc }}
                        </article>
                    </div>
                    <ul class="info">
                        <li>{{ item.createTime | timeFormat }}</li>
                        <li>{{ item.meta.comments }}条评论</li>
                        <li>{{ item.meta.views }}次阅读</li>
                        <li>{{ item.meta.likes }}人点赞</li>
                        <li><nuxt-link :to="'/article/' + item._id">阅读全文</nuxt-link></li>
                    </ul>
                </li>
            </template>
            <el-pagination
                :total="total"
                layout="prev, pager, next"
                class="pagination"
                @current-change="handleGetArticleList"
            ></el-pagination>
        </ul>
        <side-flow></side-flow>
    </section>
</template>

<script>
import SideFlow from './SideFlow';
import { timeFromDbToTime } from '../util/timeFormat';
export default {
    layout: 'home',
    components: {
        SideFlow
    },
    props: {
        articleList: {
            type: Array,
            default() {
                return [];
            }
        },
        total: {
            type: Number,
            default: 1
        }
    },
    filters: {
        timeFormat: timeFromDbToTime
    },
    mounted() {},
    methods: {
        handleGetArticleList(val) {
            this.$emit('handleGetArticleList', val);
        }
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
    .pagination {
        float: left;
        margin-top: 20px;
    }
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
                background-color: $defaultColor;
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
            text-align: center;
            li {
                color: #666;
                flex: 1;
                &:not(:last-of-type) {
                    border-right: #ddd 1px solid;
                }
            }
        }
    }
}

@media screen and (max-width: $defaultMiddleWidth) {
    .pagination {
        margin-left: 20px;
    }
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
