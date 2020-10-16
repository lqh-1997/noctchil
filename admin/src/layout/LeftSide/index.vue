<template>
    <a-layout-sider
        v-model:collapsed="collapse"
        :trigger="null"
        collapsible
        breakpoint="lg"
        collapsed-width="0"
        @collapse="collapseCb"
    >
        <!-- <Logo :collapsed="collapsed"></Logo>
        <SideBar v-model:selectedKeys="selectedKeys"></SideBar> -->
    </a-layout-sider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Logo from './Logo.vue';
import SideBar from './SideBar.vue';

export default defineComponent({
    name: 'leftSide',
    components: {
        Logo,
        SideBar
    },
    props: {
        collapsed: {
            type: Boolean
        },
        selectedKeys: {
            type: Array
        }
    },
    setup(props, ctx) {
        const collapse = props.collapsed;
        console.log(props);
        console.log(collapse);
        const collapseCb = function (collapsed: boolean) {
            ctx.emit('update:collapsed', collapsed);
        };

        return {
            collapse,
            collapseCb
        };
    }
});
</script>
