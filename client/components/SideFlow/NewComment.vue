<template>
    <div class="latest-comment">
        <div class="title">最新评论</div>
        <ul>
            <li v-for="item of commentList" :key="item._id">
                <title>
                    <nuxt-link :to="'/article/' + item.from._id">
                    {{ item.from.title }}
                    </nuxt-link>
                </title>
                <article>{{ item.content }}</article>
                <footer>
                    <span>{{ item.createTime | timeFormat }}</span>
                    <span style="float: right">{{ item.creator.nicename }}</span>
                </footer>
            </li>
        </ul>
    </div>
</template>

<script>
import { timeFromDbToTime } from '@/util/timeFormat';
import { getLatestComment } from '@/api/comment';
export default {
    data() {
        return {
            commentList: []
        };
    },
    filters: {
        timeFormat: timeFromDbToTime
    },
    methods: {
        getComments() {
            getLatestComment(this, 5).then((res) => {
                this.commentList = res.data.data;
                console.log(this.commentList);
            });
        }
    },
    mounted() {
        this.getComments();
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/global.scss';
.latest-comment {
    min-height: 200px;
    background-color: white;
    padding: 20px;
    border-radius: 4px;
    .title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    ul {
        list-style: none;
        li {
            padding-bottom: 10px;
            title {
                font-size: 18px;
                font-weight: bold;
                display: block;
                line-height: 20px;
                a {
                    color: black;
                    &:hover {
                        color: $hoverColor;
                    }
                }
            }
            article {
                font-size: 15px;
                margin-bottom: 5px;
            }
            footer {
                font-size: 12px;
                color: #999;
                padding-right: 5px;
                padding-left: 5px;
            }
        }
    }
}
</style>
