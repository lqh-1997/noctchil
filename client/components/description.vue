<template>
    <div class="description">
        <h1>NOCTCHIL</h1>
        <h2>explanation of NOCTCHIL</h2>
    </div>
</template>

<script>
// 标题以及小标题栏
export default {};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/global.scss';
.description {
    background-color: rgba($color: #000000, $alpha: 0.1);
    height: 320px;
    display: flex;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
}
h1 {
    font-size: 3rem;
}
h2 {
    font-size: 2rem;
    white-space: nowrap;
}
</style>
