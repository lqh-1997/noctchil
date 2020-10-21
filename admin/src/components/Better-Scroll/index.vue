<template>
    <component :is="tag" ref="wrapper">
        <slot></slot>
    </component>
</template>

<script lang="typescript">
// TODO 封装better-scroll 问题在于怎么调用scroll上的方法
// 返回scroll实例？又或者是用什么东西的更新触发refresh
import BScrollConstructor from '@better-scroll/core';
import { EaseItem } from '@better-scroll/shared-utils';
import BScroll from '@better-scroll/core';
import ScrollBar from '@better-scroll/scroll-bar';
import MouseWheel from '@better-scroll/mouse-wheel';
import { defineComponent, onMounted, ref } from 'vue';
import { betterScrollProps } from './props';

export default defineComponent({
    name: 'better-scroll',
    props: betterScrollProps,
    setup(props) {
        let scroll: BScrollConstructor | null = null
        const wrapper = ref<any>(null)

        const initScroll = function() {
            BScroll.use(ScrollBar);
            BScroll.use(MouseWheel);
            scroll =  new BScroll(wrapper, {
                scrollbar: true,
                specifiedIndexAsContent: props.specifiedIndexAsContent
            })
        }

        onMounted(() => {
            setTimeout(() => {
                initScroll()
            }, 20)
        })

        const refresh = function () {
            scroll && scroll.refresh()
        }

        const scrollTo = function(x: number, y: number, time?: number, easing?: EaseItem, extraTransform?: {
            start: object;
            end: object;
        }) {
            scroll && scroll.scrollTo(x, y, time, easing, extraTransform)
        }

        return {
            wrapper,
            refresh,
            scrollTo
        }
    }
})
</script>
