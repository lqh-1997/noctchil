<template>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible breakpoint="lg">
        <div class="logo" />
        <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
            <a-menu-item key="1">
                <span>nav 1</span>
            </a-menu-item>
            <a-menu-item key="2">
                <span>nav 2</span>
            </a-menu-item>
            <a-menu-item key="3">
                <span>nav 3</span>
            </a-menu-item>
        </a-menu>
    </a-layout-sider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SideBar',
    props: {
        collapsed: {
            type: Boolean
        },
        selectedKeys: {
            type: Array
        }
    },
    setup(props) {
        console.log(props);
    }
});
</script>
