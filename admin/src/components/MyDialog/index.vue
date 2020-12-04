<template>
    <div v-show="visible" class="my-dialog-modal" @click.self="toggleVisible">
        <div class="my-dialog" :style="`height: ${height};width: ${width}`">
            <i @click="toggleVisible">X</i>
            <header>
                <title>我是标题拉拉拉拉啦啦</title>
            </header>
            <article>456</article>
            <footer>
                <div>123</div>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
    props: {
        width: {
            default: '80%'
        },
        height: {
            default: '80%'
        }
    },
    setup() {
        const visible = ref(false);

        function toggleVisible() {
            visible.value = !visible.value;
        }

        return {
            toggleVisible,
            visible
        };
    }
});
</script>

<style lang="scss" scoped>
.my-dialog-modal {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba($color: #fff, $alpha: 0.6);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
}

.my-dialog {
    background: white;
    z-index: 1001;
    border: 1px solid #eee;
    animation: offset ease 0.2s;
    transition: all ease 0.2s;
    display: flex;
    flex-direction: column;
    box-shadow: rgba($color: #000, $alpha: 0.6) 0px 0px 10px;
    padding: 10px;
    position: relative;
    i {
        font-weight: normal;
        position: absolute;
        right: 10px;
        font-size: 16px;
        line-height: 16px;
        top: 10px;
        &:hover {
            cursor: pointer;
        }
    }
    header {
        display: flex;
        justify-content: space-between;
        height: 30px;
        line-height: 30px;
        font-size: 24px;
        font-weight: bold;
        margin: 10px 10px;
        title {
            display: block;
            overflow: hidden;
        }
    }
    article {
        height: calc(100% - 90px);
        background-color: pink;
    }
    footer {
        height: 40px;
    }
}

@keyframes offset {
    0% {
        transform: translateY(-50px);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
