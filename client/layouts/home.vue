<template>
    <el-container class="container">
        <my-header />
        <description></description>
        <el-main class="main">
            <nuxt />
        </el-main>
        <el-footer>
            <my-footer></my-footer>
        </el-footer>
    </el-container>
</template>

<script>
import myHeader from '@/components/MyHeader';
import description from '@/components/description';
import myFooter from '@/components/MyFooter';
export default {
    components: {
        myHeader,
        description,
        myFooter
    }
};
</script>

<style lang="scss" scope>
@import '@/assets/scss/global.scss';
.container {
    width: 100%;
    // background-image: url('../assets/image/EYmkjO1VcAEFR9e.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
}
.main {
    width: $defaultLayoutWidth;
    margin: 0 auto;
    padding: 0;
    overflow: visible;
}
.el-footer {
    padding: 0;
    margin: 0;
}
@media screen and (max-width: 1260px) {
    .main {
        width: 100%;
    }
}
</style>
