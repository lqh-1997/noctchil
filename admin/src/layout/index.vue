<template>
    <a-layout>
        <LeftSide v-model:collapsed="collapsed"></LeftSide>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <menu-unfold-outlined v-if="collapsed" class="trigger" @click="toggleCollapse" />
                <menu-fold-outlined v-else class="trigger" @click="toggleCollapse" />
            </a-layout-header>
            <a-layout-content
                :style="{
                    margin: '24px 16px',
                    padding: '24px',
                    background: '#fff',
                    minHeight: '280px'
                }"
            >
                <router-view v-slot="{ Component }">
                    <BetterScroll style="overflow: hidden; height: 100%" ref="test">
                        <component :is="Component" />
                    </BetterScroll>
                </router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import BetterScroll from '/@/components/Better-Scroll/index.vue';
import LeftSide from './LeftSide/index.vue';
export default defineComponent({
    components: {
        LeftSide,
        BetterScroll,
        MenuUnfoldOutlined,
        MenuFoldOutlined
    },
    setup() {
        const collapsed = ref(false);
        const test = ref<any>(null);

        const toggleCollapse = function () {
            collapsed.value = !collapsed.value;
        };

        return {
            collapsed,
            toggleCollapse,
            test
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
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
        color: #1890ff;
    }
}
</style>
