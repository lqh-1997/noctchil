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
                <BetterScroll style="overflow: hidden; height: 100%" ref="test" @click="refresh">
                    <div style="height: 2000px">122</div>
                </BetterScroll>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref, unref } from 'vue';
import BetterScroll from '/@/components/Better-Scroll/index.vue';
import LeftSide from './LeftSide/index.vue';
export default defineComponent({
    components: {
        LeftSide,
        BetterScroll
    },
    setup() {
        const collapsed = ref(false);
        const test = ref<any>(null);

        const toggleCollapse = function () {
            collapsed.value = !collapsed.value;
        };

        function refresh() {
            test && unref(test).refresh();
        }

        return {
            collapsed,
            toggleCollapse,
            test,
            refresh
        };
    }
});
</script>

<style lang="scss" scope>
.ant-layout {
    height: 100%;
    overflow: hidden;
}
.trigger {
    height: 30px;
    width: 30px;
    background-color: #333;
}
</style>
