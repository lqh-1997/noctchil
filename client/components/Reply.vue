<template>
    <div class="reply">
        <div class="reply-avatar"></div>
        <div class="reply-main">
            <div class="reply-username">{{ reply.creator.nicename }}</div>
            <div class="reply-time">{{ reply.createTime }}</div>
            <viewer :initialValue="reply.content"></viewer>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        reply: {
            type: Object,
            default() {
                return {};
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.reply {
    margin-top: 20px;
    min-height: 200px;
    background-color: white;
    display: flex;
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
            margin-top: 30px;
            line-height: 25px;
        }
        .reply-time {
            line-height: 25px;
        }
    }
}
</style>
