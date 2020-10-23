<template>
    <a-layout-sider
        v-model:collapsed="collapse"
        :trigger="null"
        collapsible
        ref="siderRef"
        breakpoint="md"
    >
        <BetterScroll :specifiedIndexAsContent="2" class="scroll" ref="scroll">
            <div
                class="dragBar"
                v-show="!collapsed"
                ref="dragBarRef"
                @mousedown="handleMouseDown"
            ></div>
            <Logo :collapsed="collapsed"></Logo>
            <SideBar></SideBar>
        </BetterScroll>
    </a-layout-sider>
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref, unref, nextTick } from 'vue';
import Logo from './Logo.vue';
import SideBar from './SideBar.vue';
import BetterScroll from '/@/components/Better-Scroll/index.vue';

export default defineComponent({
    name: 'leftSide',
    components: {
        Logo,
        SideBar,
        BetterScroll
    },
    props: {
        collapsed: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:collapsed'],
    setup(props) {
        // 拉动条的ref 为div html
        const dragBarRef = ref<HTMLDivElement | null>(null);
        // 左侧菜单的ref 为一个组件
        const siderRef = ref<any>(null);
        // 滚动条
        const scroll = ref<any>(null);

        let collapse = ref(false);

        // 监听父组件传来的collapsed
        watchEffect(() => {
            collapse.value = props.collapsed;
            if (!unref(siderRef)) {
                return;
            }
            const siderEl = unref(siderRef).$el;
            const dragBarEl = unref(dragBarRef);
            if (!dragBarEl || !dragBarEl.style.left || collapse.value) {
                return;
            }
            setMenuWidth(siderEl, dragBarEl);
        });

        // 设置菜单的宽度
        const setMenuWidth = function (siderEl: HTMLDivElement, dragBarEl: HTMLDivElement) {
            const width = parseInt(dragBarEl.style.left) + 'px';
            nextTick(() => {
                siderEl.style.cssText = `min-width: ${width}; min-height: ${width}; width: ${width};flex-basis: ${width};`;
            });
        };

        // 监听鼠标点击拖动栏
        // FIXME 缩小再放大再点击 会重新渲染menu的宽高...
        function handleMouseDown(e: MouseEvent) {
            const siderEl = unref(siderRef).$el;
            const dragBarEl = unref(dragBarRef);
            const startPosition = e.clientX;
            if (!dragBarEl) {
                return;
            }
            const startX = window.getComputedStyle(dragBarEl, null).left;
            // TODO 防抖
            handleMouseMove(dragBarEl, startPosition, startX);
            handleMouseUp(siderEl, dragBarEl);
        }

        // 配合监听拖动栏 监听鼠标移动
        function handleMouseMove(dragBarEl: HTMLDivElement, startPosition: number, startX: string) {
            document.onmousemove = function (e: MouseEvent) {
                let move = parseInt(startX) + (e.clientX - startPosition);
                const maxMove = 600;
                const minMove = 150;
                move > maxMove && (move = maxMove);
                move < minMove && (move = minMove);
                dragBarEl.style.left = move + 'px';
                return false;
            };
        }

        // 配合监听拖动栏 监听鼠标抬起
        function handleMouseUp(siderEl: any, dragBarEl: any) {
            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;
                setMenuWidth(siderEl, dragBarEl);
            };
        }

        return {
            dragBarRef,
            siderRef,
            collapse,
            handleMouseDown,
            scroll
        };
    }
});
</script>

<style lang="scss" scoped>
$dragWidth: 5px;
.dragBar {
    position: absolute;
    z-index: 2000;
    top: 0;
    right: -$dragWidth;
    height: 100%;
    width: $dragWidth;
    background-color: rgba(0, 0, 0, 0);
    &:hover {
        cursor: col-resize;
        background-color: rgba(0, 170, 200, 0.6);
    }
}
.scroll {
    overflow: hidden;
    height: 100%;
}
</style>
