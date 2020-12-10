<template>
    <a-layout-sider
        v-model:collapsed="collapse"
        :trigger="null"
        collapsible
        ref="siderRef"
        breakpoint="md"
        theme="light"
        width="258"
    >
        <BetterScroll :specifiedIndexAsContent="2" class="scroll" ref="scroll">
            <!-- FIXME 改变侧边栏的大小 更改下一个组件的selectKeys会触发bug 应该可以通过子组件emit来解决 解除注释同时要将上方的specifiedIndexAsContent改为2 -->
            <div
                class="drag-bar"
                v-show="!collapse"
                ref="dragBarRef"
                @mousedown="handleMouseDown"
            ></div>
            <Logo></Logo>
            <SideBar
                v-model:selectKeys="selectKeys"
                v-model:openKeys="openKeys"
                @resetMenuWidth="setMenuWidth"
            ></SideBar>
        </BetterScroll>
    </a-layout-sider>
</template>

<script lang="ts">
import { defineComponent, ref, unref, nextTick, watch, computed } from 'vue';
import { Layout } from 'ant-design-vue';
import Logo from './Logo.vue';
import SideBar from './SideBar.vue';
import BetterScroll from '/@/components/Better-Scroll/index.vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { key } from '/@/store/index';

export default defineComponent({
    name: 'leftSide',
    components: {
        Logo,
        SideBar,
        BetterScroll,
        ALayoutSider: Layout.Sider
    },
    setup() {
        // 拉动条的ref 为div html
        const dragBarRef = ref<HTMLDivElement | null>(null);
        // 左侧菜单的ref 为一个组件
        const siderRef = ref<any>(null);
        // 滚动条
        const scroll = ref<any>(null);

        const store = useStore(key);
        const route = useRoute();
        const routes = route.path.split('/');
        const selectKeys = ref(['']);
        const openKeys = ref(['']);
        const preOpenKeys = ref(['']);
        // 初始化菜单栏 因为固定为二级菜单所以如果长度为3代表为无下拉菜单的模式
        if (routes.length === 3) {
            openKeys.value = [];
            preOpenKeys.value = [];
            selectKeys.value = [routes[2]];
        } else {
            preOpenKeys.value = [routes[2]];
            openKeys.value = [routes[2]];
            selectKeys.value = [routes[3]];
        }

        const collapse = computed(() => store.state.apply.collapse);

        // preOpenKey用来在collapse为true的时候
        watch(openKeys, (_, oldValue) => {
            preOpenKeys.value = oldValue;
        });
        watch(
            () => store.state.apply.collapse,
            () => {
                openKeys.value = store.state.apply.collapse ? [] : preOpenKeys.value;
                setMenuWidth();
            }
        );

        // 设置菜单的宽度
        function setMenuWidth() {
            const siderEl = unref(siderRef).$el;
            const dragBarEl = unref(dragBarRef);
            if (!dragBarEl || !dragBarEl.style.left || store.state.apply.collapse) {
                return;
            }
            const width = parseInt(dragBarEl.style.left) + 'px';
            nextTick(() => {
                siderEl.style.cssText = `min-width: ${width}; min-height: ${width}; width: ${width};flex-basis: ${width};`;
            });
        }

        // 监听鼠标点击拖动栏
        // 缩小再放大再点击 会重新渲染menu的宽高...
        function handleMouseDown(e: MouseEvent) {
            const dragBarEl = unref(dragBarRef);
            const startPosition = e.clientX;
            if (!dragBarEl) {
                return;
            }
            const startX = window.getComputedStyle(dragBarEl, null).left;
            // TODO 防抖
            handleMouseMove(dragBarEl, startPosition, startX);
            handleMouseUp();
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
        function handleMouseUp() {
            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;
                setMenuWidth();
            };
        }

        return {
            dragBarRef,
            siderRef,
            handleMouseDown,
            scroll,
            setMenuWidth,
            openKeys,
            selectKeys,
            collapse
        };
    }
});
</script>

<style lang="scss" scoped>
$dragWidth: 5px;
.drag-bar {
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
