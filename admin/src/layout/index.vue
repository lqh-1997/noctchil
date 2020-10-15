<template>
    <a-layout id="components-layout-demo-custom-trigger">
        <SideBar :collapsed="collapsed" :selectedKeys="selectedKeys"></SideBar>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <div class="trigger" @click="() => (collapsed = !collapsed)" />
            </a-layout-header>
            <a-layout-content
                :style="{
                    margin: '24px 16px',
                    padding: '24px',
                    background: '#fff',
                    minHeight: '280px'
                }"
            >
                Content
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SideBar from './SideBar.vue';
export default defineComponent({
    components: {
        SideBar
    },
    setup() {
        const collapsed = ref(false);
        const selectedKeys = ref(['1']);
        return {
            collapsed,
            selectedKeys
        };
    }
});
</script>

<style lang="scss" scope>
.ant-layout {
    height: 100%;
}
.trigger {
    height: 30px;
    width: 30px;
    background-color: #333;
}
</style>
