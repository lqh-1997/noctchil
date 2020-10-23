<template>
    <component :is="tag" ref="wrapper">
        <slot></slot>
    </component>
</template>

<script lang="ts">
// 直接通过ref获取到 ref(根节点) , 然后通过 unref().方法名 就能使用当前组件封装的方法
import BScrollConstructor from '@better-scroll/core';
import { EaseItem } from '@better-scroll/shared-utils';
import BScroll from '@better-scroll/core';
import ScrollBar from '@better-scroll/scroll-bar';
import MouseWheel from '@better-scroll/mouse-wheel';
import ObserveDOM from '@better-scroll/observe-dom';
import { defineComponent, onMounted, ref, unref } from 'vue';
import { betterScrollProps } from './props';

export default defineComponent({
    name: 'better-scroll',
    props: betterScrollProps,
    setup(props) {
        let scroll: BScrollConstructor | null = null;
        const wrapper = ref<any>(null);

        const initScroll = function () {
            BScroll.use(ScrollBar);
            BScroll.use(MouseWheel);
            BScroll.use(ObserveDOM);
            scroll = new BScroll(unref(wrapper), {
                scrollbar: true,
                observeDOM: true,
                startX: props.startX,
                startY: props.startY,
                scrollX: props.scrollX,
                scrollY: props.scrollY,
                specifiedIndexAsContent: props.specifiedIndexAsContent,
                mouseWheel: {
                    speed: 20,
                    invert: false,
                    easeTime: 300
                }
            });
        };

        onMounted(() => {
            setTimeout(() => {
                initScroll();
            }, 20);
        });

        const refresh = function () {
            scroll && scroll.refresh();
        };

        const scrollTo = function (
            x: number,
            y: number,
            time?: number,
            easing?: EaseItem,
            extraTransform?: {
                start: object;
                end: object;
            }
        ) {
            scroll && scroll.scrollTo(x, y, time, easing, extraTransform);
        };

        const scrollBy = function (x: number, y: number, time?: number, easing?: EaseItem) {
            scroll && scroll.scrollBy(x, y, time, easing);
        };

        const scrollToElement = function (
            el: HTMLElement | string,
            time: number,
            offsetX: number | boolean,
            offsetY: number | boolean,
            easing?: EaseItem
        ) {
            scroll && scroll.scrollToElement(el, time, offsetX, offsetY, easing);
        };

        const enable = function () {
            scroll && scroll.enable();
        };

        const disable = function () {
            scroll && scroll.disable();
        };

        const destroy = function () {
            scroll && scroll.destroy();
        };

        const stop = function () {
            scroll && scroll.stop();
        };

        const on = function (type: string, fn: Function, context?: Object) {
            scroll && scroll.on(type, fn, context);
        };

        const once = function (type: string, fn: Function, context?: Object) {
            scroll && scroll.once(type, fn, context);
        };

        const off = function (type: string, fn: Function) {
            scroll && scroll.off(type, fn);
        };

        const hooks = {
            on: function (type: string, fn: Function) {
                scroll && scroll.hooks.on(type, fn);
            }
        };

        return {
            wrapper,
            refresh,
            scrollTo,
            scrollBy,
            scrollToElement,
            enable,
            disable,
            destroy,
            stop,
            on,
            once,
            off,
            hooks
        };
    }
});
</script>
