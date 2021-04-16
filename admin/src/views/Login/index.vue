<template>
    <div class="user" v-myLoading="true">
        <div class="container">
            <div class="base">
                <div class="base-info">
                    <h1>还没有一个账号吗？</h1>
                    <div>点击下方链接添加一个账号</div>
                    <a-button size="large" ghost @click="toggleAction">注册</a-button>
                </div>
                <div class="base-info">
                    <h1>已有一个账号了？</h1>
                    <div>点击下方链接登录您的账号</div>
                    <a-button size="large" ghost @click="toggleAction">登录</a-button>
                </div>
            </div>
            <div class="slider" :class="sliderClass">
                <div class="login">
                    <h1>登录</h1>
                    <form class="form">
                        <NoOutLineInput
                            v-model="formData.account"
                            placeholder="请输入用户名"
                        ></NoOutLineInput>
                        <NoOutLineInput
                            v-model="formData.password"
                            placeholder="请输入密码"
                        ></NoOutLineInput>
                        <AButton @click.prevent="handleLogin" block type="primary" ghost>
                            登录
                        </AButton>
                    </form>
                </div>
                <div class="signUp">
                    <h1>注册</h1>
                    <form>
                        <NoOutLineInput></NoOutLineInput>
                        <NoOutLineInput></NoOutLineInput>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import toggleUI from './toggleUI';
import NoOutLineInput from '/@/components/MyInput/NoOutLine.vue';
import { defineComponent, reactive, ref } from 'vue';
import { message, Form, Button, Input } from 'ant-design-vue';
import { login } from '/@/api/user';
import { useRouter } from 'vue-router';
import { setAuthorize } from '/@/utils/authorize';
export default defineComponent({
    components: {
        NoOutLineInput,
        AButton: Button,
        AFormItem: Form.Item,
        AForm: Form,
        AInput: Input,
        AInputPassword: Input.Password
    },
    setup() {
        const router = useRouter();

        // 表单的ref
        const formRef = ref<any>(null);

        const formData = reactive({
            account: '',
            password: ''
        });
        const loading = ref(false);

        const formState = reactive({
            loading: false
        });

        const formRules = reactive({
            account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
            password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
        });

        function handleLogin() {
            login({ username: formData.account, password: formData.password }).then(() => {
                setAuthorize().then(() => {
                    message.success('登陆成功');
                    router.push('/menu');
                });
            });
        }

        return {
            ...toggleUI(),
            formRef,
            formData,
            formState,
            formRules,
            handleLogin,
            loading
        };
    }
});
</script>

<style lang="scss" scoped>
@import '../../assets/scss/global.scss';
$innerPaddingLeft: 40px;
$innerPaddingTop: 30px;
.user {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    .container {
        display: flex;
        width: 80%;
        position: relative;
        align-items: center;
        justify-content: center;
        .base {
            width: 100%;
            min-height: 300px;
            background: linear-gradient(to right bottom, #8874f8 0%, #5d5bff 50%, #593cfa 100%);
            display: flex;
            .base-info {
                width: 50%;
                margin-left: 10%;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                color: white;
                & > * {
                    margin-bottom: 10px;
                    color: inherit;
                }
            }
        }
        .slider {
            position: absolute;
            min-height: 500px;
            left: 30px;
            width: calc(50% - 30px);
            background: white;
            transform: translate3d(100%, 0, 0);
            transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
            box-shadow: 2px 0 15px rgba(0, 0, 0, 0.25);
            .signUp,
            .login {
                left: $innerPaddingLeft;
                top: $innerPaddingTop;
                position: absolute;
                visibility: hidden;
                opacity: 0;
                width: calc(100% - #{$innerPaddingLeft * 2});
                height: calc(100% - #{$innerPaddingTop * 2});
                display: flex;
                flex-direction: column;
                color: $defaultColor;
                h1 {
                    color: inherit;
                    font-weight: bold;
                    letter-spacing: 2px;
                    font-family: 'Montserrat', sans-serif;
                }
                .form {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    align-items: center;
                    height: 300px;
                }
            }
            .login {
                transform: translate3d(80px, 0, 0);
            }
            .signUp {
                transform: translate3d(-80px, 0, 0);
            }
        }
        .bounceLeft {
            animation: bounceLeft 1s forwards;
            .signUp {
                animation: showUp 1s forwards;
            }
        }
        .bounceRight {
            animation: bounceRight 1s forwards;
            .login {
                animation: showUp 1s forwards;
            }
        }
        @keyframes bounceRight {
            0% {
                transform: translate3d(0, 0, 0);
            }
            50% {
                transform: translate3d(calc(100% + 30px), 0, 0);
            }
            100% {
                transform: translate3d(100%, 0, 0);
            }
        }
        @keyframes bounceLeft {
            0% {
                transform: translate3d(100%, 0, 0);
            }
            50% {
                transform: translate3d(-30px, 0, 0);
            }
            100% {
                transform: translate3d(0, 0, 0);
            }
        }
        @keyframes showUp {
            100% {
                visibility: visible;
                opacity: 1;
                transform: translate3d(0, 0, 0);
            }
        }
    }
}
</style>
