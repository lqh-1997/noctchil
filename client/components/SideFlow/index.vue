<template>
    <div ref="sideFlow" class="side">
        <user-info class="margin-bottom-20"></user-info>
        <new-comment class="margin-bottom-20"></new-comment>
    </div>
</template>

<script>
import UserInfo from './UserInfo';
import NewComment from './NewComment';
export default {
    components: {
        UserInfo,
        NewComment
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
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/global.scss';
.side {
    flex-basis: 300px;
    height: 100px;
    position: sticky;
    margin-left: 20px;
    top: 56px;
    .margin-bottom-20 {
        margin-bottom: 20px;
    }
}
@media screen and (max-width: $defaultMiddleWidth) {
    .side {
        display: none;
    }
}
</style>
