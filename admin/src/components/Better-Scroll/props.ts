// https://better-scroll.github.io/docs/en-US/guide/base-scroll-options.html
import type { PropType } from 'vue';

export const betterScrollProps = {
    tag: {
        type: String as PropType<string>,
        default: 'div'
    },
    // 设置scroll起始位置
    startX: {
        type: Number as PropType<number>,
        default: 0
    },
    startY: {
        type: Number as PropType<number>,
        default: 0
    },
    // 是否开启scroll横竖轴
    scrollX: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    scrollY: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    // 由第几个子组件撑开父组件 默认为第零个
    specifiedIndexAsContent: {
        type: Number as PropType<number>,
        default: 0
    }
};
