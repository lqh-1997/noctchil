<template>
    <a-layout>
        <LeftSide v-model:collapsed="collapsed"></LeftSide>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <div class="trigger" @click="toggleCollapse" />
            </a-layout-header>
            <a-layout-content
                :style="{
                    margin: '24px 16px',
                    padding: '24px',
                    background: '#fff',
                    minHeight: '280px'
                }"
            >
                <!-- <router-view v-slot="{ Component }">
                    <transition name="fade">
                        <component :is="Component" />
                    </transition>
                </router-view> -->
                <div ref="test" style="overflow: hidden; height: 100%">
                    <div style="height: 2000px">122</div>
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, unref } from 'vue';
import LeftSide from './LeftSide/index.vue';
import BScroll from '@better-scroll/core';
import ScrollBar from '@better-scroll/scroll-bar';
import MouseWheel from '@better-scroll/mouse-wheel';
export default defineComponent({
    components: {
        LeftSide
    },
    setup() {
        const collapsed = ref(false);
        const test = ref<any>(null);

        onMounted(() => {
            BScroll.use(ScrollBar);
            BScroll.use(MouseWheel);
            new BScroll(unref(test), {
                scrollbar: true,
                mouseWheel: {
                    speed: 20,
                    easeTime: 300
                }
            });
        });

        const toggleCollapse = function () {
            collapsed.value = !collapsed.value;
        };
        return {
            collapsed,
            toggleCollapse,
            test
        };
    }
});
</script>

<style lang="scss" scope>
.ant-layout {
    height: 100%;
    overflow: hidden;
}
.trigger {
    height: 30px;
    width: 30px;
    background-color: #333;
}
</style>
