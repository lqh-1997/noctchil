<template>
    <input
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
    />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { inputProps, inputEmits } from './mixin';
export default defineComponent({
    props: inputProps,
    emits: inputEmits,
    setup() {
        return {};
    }
});
</script>

<style lang="scss" scoped>
@import '../../assets/scss/global.scss';
input {
    display: block;
    width: 100%;
    border: 0;
    border-bottom: 1px solid rgba($color: $defaultColor, $alpha: 0.4);
    outline: none;
    padding: 6px 20px 6px 6px;
    color: $defaultColor;
    transition: all 0.3s ease;
    background: transparent;
    // box-shadow: 0 2px 2px 2px $defaultColor;
    &::placeholder {
        color: rgba($color: $defaultColor, $alpha: 0.4);
    }
    &:focus {
        border-bottom: 1px solid $defaultColor;
    }
}
</style>
