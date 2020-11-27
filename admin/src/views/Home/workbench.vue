<template>
    <div style="height: 100%">这里毛都没有</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'workbench',
    setup() {}
});
</script>

<style lang="scss" scoped>
.canvas {
    border: 1px solid black;
    position: absolute;
    padding: 0;
    margin: auto;
    display: block;
    top: 0;
    right: 0;
    left: 0;
    transform: scale(1.2);
    bottom: 0;
}
</style>
