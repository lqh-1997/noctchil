<template>
    <div class="content">nothing</div>
</template>

<script>
export default {
    data() {
        return {
            height: null
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            // eslint-disable-next-line no-console
            console.log((this.height = document.documentElement.clientHeight));
            // eslint-disable-next-line no-console
            console.log((this.width = document.documentElement.clientWidth));
        }
    }
};
</script>

<style lang="scss" scoped></style>
