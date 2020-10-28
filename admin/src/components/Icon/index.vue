<template>
    <svg class="svg-icon" aria-hidden="true">
        <use :xlink:href="iconName" />
    </svg>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
export default defineComponent({
    name: 'svg-icon',
    props: {
        iconClass: {
            type: String as PropType<string>,
            require: true
        }
    },
    setup(props) {
        const iconName = computed(() => {
            return `#icon-${props.iconClass}`;
        });

        return {
            iconName
        };
    }
});
</script>

<style lang="scss" scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    display: inline-block;
}
</style>
