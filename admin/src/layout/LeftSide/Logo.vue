<template>
    <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'logo',
    props: {
        collapsed: {
            type: Boolean
        }
    }
});
</script>

<style lang="scss" scoped>
div {
    height: 48px;
    width: 100%;
}
</style>
