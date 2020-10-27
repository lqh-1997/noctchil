<template>
    <div class="collapse">
        <div class="collapse-header">
            <slot name="title"></slot>
            <RightOutlined
                @click="toggleShow"
                :class="show ? 'toggle-icon' : 'toggle-icon rotate'"
            />
        </div>
        <div
            :class="show ? 'collapse-container' : 'collapse-container invisible'"
            :style="`height: ${height};`"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
// FIXME 当高度不是一个确定的值 比如说为100%的时候 切换的时候会没有动画效果
// 建议参考ant-design-vue 的collapse
import { RightOutlined } from '@ant-design/icons-vue';
import { defineComponent, PropType, ref } from 'vue';
export default defineComponent({
    name: 'my-collapse',
    components: {
        RightOutlined
    },
    props: {
        height: {
            type: String as PropType<string>,
            default: '100px'
        }
    },
    setup() {
        const show = ref<boolean>(true);

        const toggleShow = function () {
            show.value = !show.value;
        };

        return {
            show,
            toggleShow
        };
    }
});
</script>

<style lang="scss" scoped>
$border: 1px solid rgb(172, 172, 172);
.collapse {
    border: $border;
    .collapse-header {
        height: 30px;
        line-height: 30px !important;
        display: flex;
        border-bottom: $border;
        font-weight: bold;
        background: rgba(0, 0, 0, 0.2);
        justify-content: space-between;
        padding: 0 10px;
        .toggle-icon {
            transition: all 0.3s ease;
            margin: auto 0;
        }
        .rotate {
            transform: rotate(90deg);
        }
    }
    .collapse-container {
        background-color: white;
        transition: all 0.3s ease;
        height: 300px;
        overflow: hidden;
    }
    .invisible {
        height: 0 !important;
    }
}
</style>
