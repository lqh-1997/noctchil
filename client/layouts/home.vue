<template>
    <el-container class="home-container">
        <my-header />
        <description></description>
        <el-main class="home-main">
            <nuxt />
        </el-main>
        <el-footer>
            <my-footer></my-footer>
        </el-footer>
    </el-container>
</template>

<script>
import myHeader from '@/components/MyHeader';
import description from '@/components/Description';
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
.home-container {
    width: 100%;
    background-attachment: fixed;
    background-image: url('../assets/image/EYmkjO1VcAEFR9e.jpg');
    background-repeat: no-repeat;
    background-size: cover;
}
.home-main {
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
    .home-main {
        width: 100%;
    }
    .main {
        width: 100%;
    }
}
</style>
