<template>
    <div class="login">
        <div class="container">
            <div class="title">NOCTCHIL</div>
            <el-form :model="loginForm" :rules="loginRules">
                <el-form-item prop="username">
                    <input
                        type="text"
                        v-model="loginForm.username"
                        class="input"
                        placeholder="username"
                    />
                </el-form-item>
                <el-form-item>
                    <input
                        type="password"
                        v-model="loginForm.password"
                        class="input"
                        placeholder="password"
                        autocomplete="current-password"
                    />
                </el-form-item>
                <el-form-item>
                    <button type="button" class="button" @click="handleSignup">signUp</button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { signUp } from '../api/user';
export default {
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            },
            loginRules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
            }
        };
    },
    methods: {
        handleSignup() {
            signUp(this, this.loginForm).then((res) => {
                this.$message({
                    message: res.data.message,
                    type: 'success'
                });
            });
        }
    },
    async asyncData() {}
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/global.scss';
.login {
    background-image: linear-gradient(0deg, #0093dd, #50d0d0);
    background: url('../assets/image/EX4icBFWoAEr5se.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .container {
        width: 320px;
        display: flex;
        justify-content: center;
        justify-self: center;
        flex-direction: column;
        .title {
            font-size: 40px;
            color: white;
            text-align: center;
            margin-bottom: 20px;
        }
    }
    .input {
        width: 100%;
        height: 35px;
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.6);
        border-radius: 2px;
        color: rgba(255, 255, 255, 0.8);
        font-size: 17px;
        font-weight: 400;
        padding: 4px;
        &:hover {
            border: 1px solid rgba(255, 255, 255, 0.8);
            color: rgba(255, 255, 255, 0.9);
        }
        &:focus {
            outline: none;
            border: 1px solid rgba(255, 255, 255, 1);
            color: rgba(255, 255, 255, 1);
        }
        &::placeholder {
            color: rgba(255, 255, 255, 0.6);
        }
    }
    .button {
        width: 100%;
        height: 35px;
        background: #fff;
        border: 1px solid #fff;
        cursor: pointer;
        border-radius: 2px;
        color: #0093dd;
        font-size: 16px;
        font-weight: 600;
        padding: 4px;
        margin-top: 10px;
        box-sizing: content-box;
        &:focus {
            outline: none;
        }
    }
}
</style>
