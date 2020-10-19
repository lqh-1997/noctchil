<template>
    <a-layout>
        <LeftSide v-model:collapsed="collapsed"></LeftSide>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <div class="trigger" @click="toggleCollapse" />
            </a-layout-header>
            <a-layout-content
                :style="{
                    margin: '24px 16px',
                    padding: '24px',
                    background: '#fff',
                    minHeight: '280px'
                }"
            >
                <!-- <router-view v-slot="{ Component }">
                    <transition name="fade">
                        <component :is="Component" />
                    </transition>
                </router-view> -->
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LeftSide from './LeftSide/index.vue';
export default defineComponent({
    components: {
        LeftSide
    },
    setup() {
        const collapsed = ref(false);
        const toggleCollapse = function () {
            collapsed.value = !collapsed.value;
        };
        return {
            collapsed,
            toggleCollapse
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
