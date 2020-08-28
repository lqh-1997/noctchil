<template>
    <div class="signup">
        <div class="signup-container">
            <div class="signup-title">NOCTCHIL</div>
            <el-form :model="loginForm">
                <el-form-item prop="username">
                    <input
                        type="text"
                        v-model="loginForm.username"
                        class="input"
                        placeholder="username"
                        @blur="hasUsername"
                    />
                    <div v-show="tipsShow">
                        用户名不得为空
                    </div>
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
import md5 from 'js-md5';
export default {
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            },
            // 是否显示错误提示
            tipsShow: false
        };
    },
    methods: {
        handleSignup() {
            const username = this.loginForm.username;
            const password = md5(this.loginForm.password);
            if (!this.hasUsername(username)) {
                return;
            }
            // 点击注册
            signUp(this, { username, password }).then((res) => {
                this.$message({
                    message: res.data.message,
                    type: 'success'
                });
                this.$router.push('/login');
            });
        },
        // 判断有没有username
        hasUsername(e) {
            // object为事件取value string直接使用
            const value = typeof e === 'object' ? e.target.value : e;
            const hasValue = value !== '';
            this.tipsShow = !hasValue;
            return hasValue;
        }
    },
    async asyncData() {}
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/global.scss';
.signup {
    background-image: linear-gradient(0deg, #0093dd, #50d0d0);
    background: url('../assets/image/EX4icBFWoAEr5se.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .signup-container {
        width: 320px;
        display: flex;
        justify-content: center;
        justify-self: center;
        flex-direction: column;
        .signup-title {
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
    .input + div {
        color: red;
        font-size: 12px;
        position: absolute;
        height: 22px;
        line-height: 22px;
        padding-left: 5px;
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
