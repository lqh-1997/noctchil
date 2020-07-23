<template>
    <div class="login">
        <el-form label-position="left" label-width="80px" :model="loginForm">
            <el-form-item label="用户名">
                <el-input v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="loginForm.password"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            }
        };
    }
};
</script>

<style scoped lang="scss">
.login {
    background-color: rgba($color: rgb(48, 48, 48), $alpha: 1);
    height: 100vh;
    width: 100%;
}
.el-form {
    display: flex;
    position: absolute;
    width: 400px;
    height: 100%;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba($color: #fff, $alpha: 0.1);
    right: 10%;
    align-content: center;
    flex-wrap: wrap;
    justify-content: center;
    .el-form-item {
        width: 90%;
    }
}
</style>
