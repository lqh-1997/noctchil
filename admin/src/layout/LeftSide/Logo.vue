<template>
    <div>我就是logo</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { key } from '/@/store';

export default defineComponent({
    name: 'logo',
    setup() {
        const store = useStore(key);
        const collapse = computed(() => store.state.apply.collapse);
        return {
            collapse
        };
    }
});
</script>

<style lang="scss" scoped>
div {
    height: 48px;
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
}
</style>
