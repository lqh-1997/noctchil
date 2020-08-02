<template>
    <section>
        <ul class="list">
            <li class="article" v-if="!articleList || articleList.length === 0">
                <h1>暂无文章</h1>
                <article>
                    没有啊 爬没有啊 爬没有啊 爬没有啊 爬没有啊 爬没有啊 爬没有啊 爬没有啊 爬没有啊
                    爬没有啊 爬没有啊 爬没有啊 爬没有啊 爬没有啊 爬没有啊 爬没有啊 爬没有啊 爬没有啊
                    爬没有啊 爬没有啊 爬没有啊 爬没有啊 爬没有啊 爬没有啊 爬
                </article>
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
                <div class="content">
                    你好啊你好啊你好啊你好啊你好啊你
                </div>
                <ul class="info">
                    <li>点赞</li>
                    <li>阅读</li>
                </ul>
            </li>
            <template v-for="item of articleList">
                <li class="message" :key="item.id" v-if="item.type === 'message'">
                    <div class="user">
                        <div class="avatar"></div>
                        <div class="user-info">
                            <div class="username"></div>
                            <div class="date"></div>
                        </div>
                    </div>
                    <div class="content"></div>
                    <ul class="info">
                        <li>点赞</li>
                        <li>阅读</li>
                    </ul>
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
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
}
.side {
    flex-basis: 200px;
    height: 300px;
    background-color: wheat;
    margin-top: 20px;
    padding: 20px;
    position: sticky;
    margin-left: 20px;
    top: 20px;
}
.list {
    flex-basis: 700px;
    flex-grow: 1;
    .message,
    .article {
        min-height: 100px;
        background: #fff;
        border: 1px solid #444;
        border-radius: 8px;
        margin-top: 20px;
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
        .content {
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
        justify-content: center;
        align-items: center;
        h1 {
            margin-top: 100px;
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 10px;
        }
        article {
            margin: 40px 15px 40px 15px;
            @include text-overflow();
            line-height: 22px;
        }
        ul {
            border-top: black 1px solid;
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
    .side {
        display: none;
    }
}
</style>
