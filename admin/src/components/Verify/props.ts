import type { PropType } from 'vue';

export const basicProps = {
    value: {
        type: Boolean as PropType<boolean>,
        default: false
    },

    isSlot: {
        type: Boolean as PropType<boolean>,
        default: false
    },

    text: {
        type: [String] as PropType<string>,
        default: '请按住滑块拖动'
    },
    successText: {
        type: [String] as PropType<string>,
        default: '验证通过'
    },
    height: {
        type: [Number, String] as PropType<number | string>,
        default: 40
    },

    width: {
        type: [Number, String] as PropType<number | string>,
        default: 220
    },

    circle: {
        type: Boolean as PropType<boolean>,
        default: false
    },

    wrapStyle: {
        type: Object as PropType<any>,
        default: {}
    },
    contentStyle: {
        type: Object as PropType<any>,
        default: {}
    },
    barStyle: {
        type: Object as PropType<any>,
        default: {}
    },
    actionStyle: {
        type: Object as PropType<any>,
        default: {}
    }
};

export const rotateProps = {
    ...basicProps,
    src: {
        type: String as PropType<string>
    },

    imgWidth: {
        type: Number as PropType<number>,
        default: 260
    },

    imgWrapStyle: {
        type: Object as PropType<any>,
        default: {}
    },

    minDegree: {
        type: Number as PropType<number>,
        default: 90
    },

    maxDegree: {
        type: Number as PropType<number>,
        default: 270
    },

    diffDegree: {
        type: Number as PropType<number>,
        default: 20
    }
};
