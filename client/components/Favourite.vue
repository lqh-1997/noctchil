<template>
    <div>
        <a class="like-button" @click="favourite" :class="beLiked ? 'liked' : ''">
            <span class="like-icon">
                <div class="heart-animation-1"></div>
                <div class="heart-animation-2"></div>
            </span>
            {{ number }}人点赞
        </a>
    </div>
</template>

<script>
export default {
    props: {
        count: {
            type: Number,
            default: 0
        },
        id: {
            type: String,
            required: true
        },
        likeList: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            number: this.count
        };
    },
    methods: {
        favourite() {
            // 改变localStorage
            this.$emit('changeLikeList', this.beLiked, this.id);
            this.beLiked = !this.beLiked;
            if (this.beLiked) {
                this.number--;
            } else {
                this.number++;
            }
        }
    },
    computed: {
        beLiked: {
            get: function () {
                return this.likeList.indexOf(this.id) !== -1;
            },
            set: function (val) {
                return val;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
// https://codepen.io/pugson/pen/wMBjLz
$gray: #c7c7c7;
$pink: #ff6e6f;
$bezier: cubic-bezier(0.175, 0.885, 0.32, 1.275);

a {
    cursor: pointer;
}
.like-button {
    color: darken($gray, 25%);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.25s $bezier;
    filter: grayscale(100%);
    user-select: none;

    &.liked {
        color: $pink;
        border-color: currentColor;
        filter: grayscale(0);
    }

    &:hover {
        border-color: currentColor;
    }
}

.like-icon {
    width: 18px;
    height: 16px;
    display: inline-block;
    position: relative;
    margin-right: 8px;
    font-size: 16px;
    background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAyMSAxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAuMTAxIDQuNDE3UzguODk1LjIwNyA1LjExMS4yMDdjLTQuNDY1IDAtMTAuOTY3IDYuODQ2IDUuMDgyIDE3LjU5MkMyNS4yMzcgNy4wMyAxOS42NjUuMjAyIDE1LjUwMS4yMDJjLTQuMTYyIDAtNS40IDQuMjE1LTUuNCA0LjIxNXoiIGZpbGw9IiNGRjZFNkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')
        no-repeat center;
    background-size: 100%;
    animation: heartUnlike 0.25s $bezier both;
}

.liked .like-icon {
    animation: heartPulse 0.25s $bezier both;

    [class^='heart-animation-'] {
        background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAyMSAxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAuMTAxIDQuNDE3UzguODk1LjIwNyA1LjExMS4yMDdjLTQuNDY1IDAtMTAuOTY3IDYuODQ2IDUuMDgyIDE3LjU5MkMyNS4yMzcgNy4wMyAxOS42NjUuMjAyIDE1LjUwMS4yMDJjLTQuMTYyIDAtNS40IDQuMjE1LTUuNCA0LjIxNXoiIGZpbGw9IiNGRjZFNkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')
            no-repeat center;
        background-size: 100%;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 16px;
        height: 14px;
        opacity: 0;

        &::before,
        &::after {
            content: '';
            background: inherit;
            background-size: 100%;
            width: inherit;
            height: inherit;
            display: inherit;
            position: relative;
            top: inherit;
            left: inherit;
            opacity: 0;
        }
    }

    .heart-animation-1 {
        animation: heartFloatMain-1 1s $bezier both;

        &::before,
        &::after {
            width: 12px;
            height: 10px;
            visibility: hidden;
        }
        &::before {
            opacity: 0.6;
            animation: heartFloatSub-1 1s 0.25s $bezier both;
        }
        &::after {
            animation: heartFloatSub-2 1s 0.15s $bezier both;
            opacity: 0.75;
        }
    }

    .heart-animation-2 {
        animation: heartFloatMain-2 1s 0.1s $bezier both;

        &::before,
        &::after {
            width: 10px;
            height: 8px;
            visibility: hidden;
        }
        &::before {
            animation: heartFloatSub-3 1s 0.25s $bezier both;
            opacity: 0.25;
        }
        &::after {
            animation: heartFloatSub-4 1s 0.15s $bezier both;
            opacity: 0.4;
        }
    }
}

// Animations
@keyframes heartPulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.5);
    }
}

@keyframes heartUnlike {
    50% {
        transform: scale(0.75);
    }
}

@keyframes heartFloatMain-1 {
    0% {
        opacity: 0;
        transform: translate(0) rotate(0);
    }
    50% {
        opacity: 1;
        transform: translate(0, -25px) rotate(-20deg);
    }
}

@keyframes heartFloatMain-2 {
    0% {
        opacity: 0;
        transform: translate(0) rotate(0) scale(0);
    }
    50% {
        opacity: 0.9;
        transform: translate(-10px, -38px) rotate(25deg) scale(1);
    }
}

@keyframes heartFloatSub-1 {
    0% {
        visibility: hidden;
        transform: translate(0) rotate(0);
    }
    50% {
        visibility: visible;
        transform: translate(13px, -13px) rotate(30deg);
    }
}

@keyframes heartFloatSub-2 {
    0% {
        visibility: hidden;
        transform: translate(0) rotate(0);
    }
    50% {
        visibility: visible;
        transform: translate(18px, -10px) rotate(55deg);
    }
}

@keyframes heartFloatSub-3 {
    0% {
        visibility: hidden;
        transform: translate(0) rotate(0);
    }
    50% {
        visibility: visible;
        transform: translate(-10px, -10px) rotate(-40deg);
    }
    100% {
        transform: translate(-50px, 0);
    }
}

@keyframes heartFloatSub-4 {
    0% {
        visibility: hidden;
        transform: translate(0) rotate(0);
    }
    50% {
        visibility: visible;
        transform: translate(2px, -18px) rotate(-25deg);
    }
}
</style>
