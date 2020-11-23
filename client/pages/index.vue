<template>
    <div class="content">
        <div class="title">Noctchil</div>
        <ul class="icon-list">
            <!-- <svg-icon :icon-class="'pullDown'" /> -->
            <li v-for="item of menuList" :key="item.name" @click="jumpToLink(item.url, item.type)">
                {{ item.name }}
            </li>
        </ul>
        <bubbles
            class="bubble"
            :height="'1000px'"
            :bottom="[0, 40]"
            :bubble-size="[2, 20]"
            :count="100"
            :color="'#ffffff'"
        />
    </div>
</template>

<script>
import Bubbles from '@/components/Bubbles.vue';
// import SvgIcon from '@/components/SvgIcon.vue';
export default {
    components: {
        Bubbles
        // SvgIcon
    },
    data() {
        return {
            menuList: [
                {
                    name: '主页',
                    url: '/home',
                    type: 'self'
                },
                {
                    name: '项目Github',
                    url: '',
                    type: '_blank'
                }
            ]
        };
    },
    methods: {
        jumpToLink(url, type) {
            if (!url) {
                return;
            }
            if (type === '_blank') {
                window.open(url, '_blank');
            } else {
                this.$router.push(url);
            }
        }
    }
};
</script>

<style lang="scss" scope>
@import '@/assets/scss/global.scss';
.content {
    height: 100vh;
    width: 100%;
    background-image: linear-gradient(0deg, #0093dd, #50d0d0);
    background: url('../assets/image/EX4icBFWoAEr5se.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    .title {
        color: white;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translateX(-50%);
        font-size: 72px;
        letter-spacing: 6px;
        font-weight: 200;
    }
    .icon-list {
        position: absolute;
        bottom: 30px;
        left: 30px;
        z-index: 20;
        list-style: none;
        font-size: 20px;
        font-family: 'jdzhonyuanjian241c9062f22293f';
        color: rgb(255, 255, 255);
        & li:hover {
            cursor: pointer;
            color: $hoverColor;
        }
    }
    .bubble {
        position: absolute;
        bottom: 0;
    }
}
</style>
