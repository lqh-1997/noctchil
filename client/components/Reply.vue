<template>
    <div class="reply" :id="reply._id">
        <div class="reply-avatar"></div>
        <div class="reply-main">
            <div class="reply-username">{{ reply.creator.nicename }}</div>
            <div class="reply-time">{{ reply.createTime | timeFormat }}</div>
            <viewer :initialValue="reply.content"></viewer>
        </div>
    </div>
</template>

<script>
import { timeFromDbToTime } from '../util/timeFormat';
export default {
    props: {
        reply: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    filters: {
        timeFormat: timeFromDbToTime
    }
};
</script>

<style lang="scss" scoped>
.reply {
    min-height: 140px;
    display: flex;
    border-bottom: #eee 1px solid;
    .reply-avatar {
        flex-basis: 50px;
        border-radius: 50% 50%;
        background-color: burlywood;
        width: 50px;
        height: 50px;
        margin-top: 30px;
        margin-left: 20px;
    }
    .reply-main {
        flex: 1;
        margin-left: 10px;
        margin-right: 20px;
        margin-bottom: 20px;
        .reply-username {
            margin-top: 35px;
            line-height: 25px;
        }
        .reply-time {
            font-size: 12px;
            color: #666;
            margin-bottom: 15px;
        }
    }
}
</style>
