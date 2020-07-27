<template>
    <div class="login">
        <div class="login-column">
            <el-form label-position="left" label-width="80px" :model="loginForm">
                <el-form-item label="用户名">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="loginForm.password"></el-input>
                </el-form-item>
                <el-form-item class="form-button">
                    <el-button style="margin-right: 10px;" @click="handleLogin">登录</el-button>
                    <el-button>注册</el-button>
                </el-form-item>
            </el-form>
            <div class="login-choose">
                <span class="back-home"><i class="el-icon-d-arrow-left"></i>返回首页</span
                ><span class="forget-pass">忘记密码</span>
            </div>
        </div>
        <div>{{ a }}</div>
    </div>
</template>

<script>
import { login } from '../api/user';
export default {
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            }
        };
    },
    methods: {
        handleLogin() {
            login(this, this.loginForm).then((res) => {
                console.log(res);
            });
        }
    },
    async asyncData() {
        return {
            a: '123'
        };
    }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/global.scss';
$form-width: 400px;
$form-right: 80px;
$form-media: $form-width + $form-right;
.login {
    background-color: rgba($color: rgb(48, 48, 48), $alpha: 1);
    height: 100%;
    width: 100%;
}
.login-column {
    display: flex;
    position: absolute;
    width: $form-width;
    height: 100%;
    top: 50%;
    right: 100px;
    transform: translateY(-50%);
    background-color: rgba($color: #fff, $alpha: 0.1);
    align-content: center;
    flex-wrap: wrap;
    justify-content: center;
    overflow: hidden;
    .el-form {
        margin-right: 10px;
        margin-left: 10px;
        width: 100%;
        display: flex;
        align-content: center;
        flex-wrap: wrap;
        justify-content: center;
        background-color: rgba($color: black, $alpha: 0.2);
        height: 260px;
        .el-form-item {
            width: 90%;
            /deep/ .el-form-item__label {
                color: white;
            }
        }
        .form-button {
            /deep/ .el-form-item__content {
                margin-left: 60px !important;
                text-align: center;
            }
        }
    }
    .login-choose {
        margin-top: 15px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-around;
        width: 100%;
        color: white;
    }
}
@media screen and (max-width: $form-media) {
    .login-column {
        left: 0;
        right: 0;
        margin: 0 auto;
    }
}
@media screen and (max-width: $form-width) {
    .login-column {
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 100%;
    }
}
</style>
