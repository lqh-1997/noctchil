<template>
    <el-container class="home-container">
        <my-header />
        <description></description>
        <el-main class="home-main">
            <nuxt keep-alive />
        </el-main>
        <el-footer>
            <my-footer></my-footer>
        </el-footer>
    </el-container>
</template>

<script>
import myHeader from '@/components/layout/MyHeader';
import description from '@/components/layout/Description';
import myFooter from '@/components/layout/MyFooter';
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
    padding-bottom: 50px;
    position: relative;
    width: $defaultLayoutWidth;
    margin: 0 auto;
    padding: 0;
    overflow: visible;
    min-height: 500px;
}
.el-footer {
    padding: 0;
    margin: 0;
}
// 这里加三十是为了防止滚动条占用空间导致横向滚动条的出现
@media screen and (max-width: $defaultLayoutWidth + 30) {
    .home-main {
        width: 100%;
    }
    .main {
        width: 100%;
    }
}
</style>
