<template>
    <ArticleTemplate :edit="true"></ArticleTemplate>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ArticleTemplate from './components/index.vue';
export default defineComponent({
    components: {
        ArticleTemplate
    }
});
</script>

<style lang="scss" scoped></style>
