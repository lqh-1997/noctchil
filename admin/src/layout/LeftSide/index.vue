<template>
    <a-layout-sider
        v-model:collapsed="collapse"
        :trigger="null"
        collapsible
        @collapse="collapseCb"
        ref="siderRef"
        @click="showRef"
    >
        <div class="dragBar" v-show="!collapsed"></div>
        <Logo v-model:collapsed="collapsed"></Logo>
        <SideBar></SideBar>
    </a-layout-sider>
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref, unref } from 'vue';
import Logo from './Logo.vue';
import SideBar from './SideBar.vue';

export default defineComponent({
    name: 'leftSide',
    components: {
        Logo,
        SideBar
    },
    props: {
        collapsed: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:collapsed'],
    setup(props, ctx) {
        const dragBarRef = ref<any>(null);
        const siderRef = ref<any>(null);
        let collapse = ref(false);

        watchEffect(() => {
            collapse.value = props.collapsed;
        });

        const collapseCb = function (collapsed: boolean) {
            ctx.emit('update:collapsed', collapsed);
        };

        const showRef = function () {
            console.log(unref(siderRef));
        };

        function handleMouseMove(el, wrap, clientX) {
            document.onmousemove = function () {};
        }

        function removeMouseUp(el) {}

        function changeSiderWidth() {
            const el = unref(dragBarRef) as any;
            const sider = unref(siderRef);

            const wrap = (sider || {}).$el;

            el &&
                (el.onmousedown = (e: any) => {
                    const clientX = e.clientX;
                    el.left = el.offsetLeft;
                    handleMouseMove(el, wrap, clientX);
                    removeMouseUp(el);
                    el.setCapture && el.setCapture();
                    return false;
                });
        }

        return {
            collapse,
            collapseCb,
            showRef,
            siderRef
        };
    }
});
</script>

<style lang="scss" scoped>
$dragWidth: 5px;
.dragBar {
    position: absolute;
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
</style>
