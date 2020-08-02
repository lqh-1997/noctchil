<template>
    <div class="description">
        <h1>NOCTCHIL</h1>
        <h2>explanation of NOCTCHIL</h2>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/global.scss';
.description {
    background-color: rgba($color: $defaultColor, $alpha: 0.4);
    height: 320px;
    display: flex;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
    z-index: -1;
}
h1 {
    font-size: 3rem;
}
h2 {
    font-size: 2rem;
}
</style>
