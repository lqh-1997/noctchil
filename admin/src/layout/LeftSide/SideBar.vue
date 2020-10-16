<template>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SideBar',
    props: {
        selectedKeys: {
            type: Array
        }
    }
});
</script>
