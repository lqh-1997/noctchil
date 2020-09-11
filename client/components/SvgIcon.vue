<template>
    <svg class="svg-icon" aria-hidden="true">
        <use :xlink:href="iconName" />
    </svg>
</template>

<script>
export default {
    name: 'SvgIcon',
    props: {
        // eslint-disable-next-line vue/require-default-prop
        iconClass: {
            type: String,
            require: true
        }
    },
    computed: {
        iconName() {
            return `#icon-${this.iconClass}`;
        }
    }
};
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
