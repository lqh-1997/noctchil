<template>
    <a-layout>
        <LeftSide v-model:collapsed="collapsed"></LeftSide>
        <a-layout>
            <TopSide :collapsed="collapsed" @collapseHandler="toggleCollapse"></TopSide>
            <BetterScroll tag="main" style="overflow: hidden" ref="test">
                <router-view v-slot="{ Component }">
                    <transition name="component-fade" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </BetterScroll>
        </a-layout>
    </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import BetterScroll from '/@/components/Better-Scroll/index.vue';
import LeftSide from './LeftSide/index.vue';
import TopSide from './TopSide/index.vue';
export default defineComponent({
    components: {
        TopSide,
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
.component-fade-enter-active,
.component-fade-leave-active {
    transition: opacity 0.3s ease;
}

.component-fade-enter-from,
.component-fade-leave-to {
    opacity: 0;
}
</style>
