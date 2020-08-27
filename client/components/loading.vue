<template>
    <div v-show="loading" class="loading-page">
        <span v-for="(item, index) of message" :key="index" :style="getCharaStyle(index)">
            {{ item }}
        </span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            message: 'Loading...'
        };
    },
    methods: {
        getCharaStyle(index) {
            return `animation-delay: ${index * 0.1}s; animation-duration: ${index * 0.1}`;
        },
        start() {
            this.loading = true;
        },
        finish() {
            this.loading = false;
        }
    }
};
</script>

<style scoped lang="scss">
.loading-page {
    position: fixed;
    left: 0;
    bottom: 0;
    font-size: 28px;
    font-family: sans-serif;
    z-index: 9999;
    color: white;
    margin: 20px;
    span {
        padding-right: 2px;
        position: relative;
        display: inline-block;
        @keyframes fadeInDown {
            0% {
                opacity: 0;
                bottom: 30px;
            }

            100% {
                opacity: 1;
                bottom: 0;
            }
        }
        animation-name: fadeInDown;
        animation-timing-function: ease;
        animation-iteration-count: infinite;
    }
}
</style>
