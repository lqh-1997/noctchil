<template>
    <a-layout>
        <LeftSide></LeftSide>
        <a-layout>
            <TopSide></TopSide>
            <main style="overflow-y: auto; height: 100%; position: relative">
                <!-- <BetterScroll tag="main" style="overflow: hidden; height: 100%" ref="test"> -->
                <router-view v-slot="{ Component }">
                    <transition name="fade-transform" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
                <!-- </BetterScroll> -->
            </main>
        </a-layout>
    </a-layout>
</template>

<script lang="ts">
// FIXME betterScroll 会导致鼠标的默认行为被prevent 导致比如说不能拖动选择文字等 所以暂时将其注释
import { defineComponent } from 'vue';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
// import BetterScroll from '/@/components/Better-Scroll/index.vue';
import { Layout } from 'ant-design-vue';
import LeftSide from './LeftSide/index.vue';
import TopSide from './TopSide/index.vue';
export default defineComponent({
    components: {
        TopSide,
        LeftSide,
        // BetterScroll,
        MenuUnfoldOutlined,
        MenuFoldOutlined,
        ALayout: Layout
    },
    setup() {}
});
</script>

<style lang="scss" scope>
.ant-layout {
    height: 100%;
    overflow: hidden;
}
.trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
        color: #1890ff;
    }
}

// 透明淡入淡出
.component-fade-enter-active,
.component-fade-leave-active {
    transition: opacity 0.3s ease;
}
.component-fade-enter-from,
.component-fade-leave-to {
    opacity: 0;
}

// 向右淡入淡出
.fade-transform-leave-active,
.fade-transform-enter-active {
    transition: all 0.3s;
}
.fade-transform-enter-from {
    opacity: 0;
    transform: translateX(-30px);
}
.fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
