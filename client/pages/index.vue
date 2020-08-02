<template>
    <div class="content">
        <div class="title">欢迎</div>
        <div class="icon">
            <nuxt-link to="/home">
                <svg-icon :icon-class="'xiala'" />
            </nuxt-link>
        </div>
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
import SvgIcon from '@/components/SvgIcon.vue';
export default {
    components: {
        Bubbles,
        SvgIcon
    }
};
</script>

<style lang="scss">
.content {
    height: 100vh;
    width: 100%;
    background-image: linear-gradient(0deg, #0093dd, #50d0d0);
    // background: url('../assets/image/EX4icBFWoAEr5se.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
}
.title {
    color: white;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 50px;
    font-weight: 300;
}
.icon {
    width: 20px !important;
    height: 20px !important;
    color: white;
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 20;
    &:hover {
        transition: shake 3s ease infinite;
        color: rgba($color: #3ea2ff, $alpha: 1);
    }
    @keyframes shake {
        0% {
            color: '#123456';
        }
        25% {
            color: '#654321';
        }
        50% {
            color: '#123456';
        }
        75% {
            color: '#654321';
        }
        100% {
            color: '#123456';
        }
    }
}
.bubble {
    position: absolute;
    bottom: 0;
}
</style>
