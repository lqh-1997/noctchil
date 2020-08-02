<template>
    <div :style="`height: ${height}; width: ${width};`" class="all-bubble">
        <span
            v-for="i of count"
            :key="i"
            class="single-bubble"
            :style="`
                bottom: ${random(bottom[0], bottom[1])}%;left: ${random(left[0], left[1])}%;
                width: ${getBubbleShape(i)}px;height: ${getBubbleShape(i)}px;
                animation-delay: -${random(0, 30) / 10}s;animation-duration: ${speed}s;
                background-color: ${color};
                `"
        />
    </div>
</template>

<script>
export default {
    props: {
        count: {
            type: Number,
            default: 20
        },
        speed: {
            type: Number,
            default: 3
        },
        color: {
            type: String,
            default: 'rgba(255, 100, 0, 0.8)'
        },
        width: {
            type: [String, Number],
            default: '100%'
        },
        height: {
            type: [String, Number],
            default: '100vh'
        },
        bubbleSize: {
            type: Array,
            default() {
                return [4, 8];
            }
        },
        bottom: {
            type: Array,
            default() {
                return [0, 100];
            }
        },
        left: {
            type: Array,
            default() {
                return [0, 100];
            }
        }
    },
    data() {
        return {
            bubbleShapeMap: null
        };
    },
    created() {
        this.initBubbleComponent();
    },
    methods: {
        random(m, n) {
            m = parseInt(m);
            n = parseInt(n);
            return Math.random() * (n - m + 1) + m;
        },
        randomBubbleShape() {
            const map = new Map();
            for (let i = 0; i < this.count; i++) {
                map.set(i, this.random(this.bubbleSize[0], this.bubbleSize[1]));
            }
            this.bubbleShapeMap = map;
        },
        getBubbleShape(index) {
            return Number(this.bubbleShapeMap.get(index)).toFixed(1);
        },
        initBubbleComponent() {
            this.randomBubbleShape();
        }
    }
};
</script>

<style lang="scss" scoped>
.all-bubble {
    overflow: hidden;
}
.single-bubble {
    opacity: 0;
    position: absolute;
    animation-name: bubbles;
    animation-timing-function: ease-in;
    animation-iteration-count: infinite;
    border-radius: 100%;
}
@keyframes bubbles {
    0% {
        opacity: 0;
    }
    20% {
        opacity: 0.8;
        transform: translate(0, -20%);
    }
    100% {
        opacity: 0;
        transform: translate(0, -1000%);
    }
}
</style>
