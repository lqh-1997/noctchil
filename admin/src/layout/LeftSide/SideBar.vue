<template>
    <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectKeys" :forceSubMenuRender="true">
        <a-sub-menu key="sub1">
            <template v-slot:title>
                <span>nav 1</span>
            </template>
            <a-menu-item key="1">option1</a-menu-item>
            <a-menu-item key="2">option2</a-menu-item>
            <a-menu-item key="3">option3</a-menu-item>
            <a-menu-item key="4">option4</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
            <template v-slot:title>
                <span>nav 2</span>
            </template>
            <a-menu-item key="5">option5</a-menu-item>
            <a-menu-item key="6">option6</a-menu-item>
            <a-menu-item key="7">option7</a-menu-item>
            <a-menu-item key="8">option8</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
            <template v-slot:title>
                <span>nav 3</span>
            </template>
            <a-menu-item key="9">option9</a-menu-item>
            <a-menu-item key="10">option10</a-menu-item>
            <a-menu-item key="11">option11</a-menu-item>
            <a-menu-item key="12">option12</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub4">
            <template v-slot:title>
                <span>nav 4</span>
            </template>
            <a-menu-item key="Q">option9</a-menu-item>
            <a-menu-item key="W">option10</a-menu-item>
            <a-menu-item key="E">option11</a-menu-item>
            <a-menu-item key="R">option12</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub5">
            <template v-slot:title>
                <span>nav 5</span>
            </template>
            <a-menu-item key="9">optionA</a-menu-item>
            <a-menu-item key="10">optionS</a-menu-item>
            <a-menu-item key="11">optionD</a-menu-item>
            <a-menu-item key="12">optionF</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub6">
            <template v-slot:title>
                <span>nav 6</span>
            </template>
            <a-menu-item key="9">optionZ</a-menu-item>
            <a-menu-item key="10">optionX</a-menu-item>
            <a-menu-item key="11">optionC</a-menu-item>
            <a-menu-item key="12">optionV</a-menu-item>
        </a-sub-menu>
    </a-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'SideBar',
    props: {},
    setup() {
        const selectKeys = ref(['1']);

        return {
            selectKeys
        };
    }
});
</script>