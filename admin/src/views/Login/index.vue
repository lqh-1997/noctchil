<template>
    <!-- <div class="login">
        <a-form :model="formData" :rules="formRules" ref="formRef">
            <a-form-item name="account" required>
                <a-input v-model:value="formData.account" />
            </a-form-item>
            <a-form-item name="password" required>
                <a-input-password v-model:value="formData.password" />
            </a-form-item>
            <a-form-item>
                <a-button
                    type="primary"
                    size="large"
                    class="rounded-sm"
                    block
                    @click.prevent="login"
                    :loading="formState.loading"
                    >登录</a-button
                >
            </a-form-item>
        </a-form>
    </div> -->
    <div class="user">
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
            <div class="slider" :class="sliderClass"></div>
        </div>
    </div>
</template>

<script lang="ts">
import toggleUI from './toggleUI';
import { defineComponent, reactive, ref, unref } from 'vue';
import { message, Form, Button, Input } from 'ant-design-vue';
import { login } from '/@/api/user';
import { useRouter } from 'vue-router';
import { setAuthorize } from '/@/utils/authorize';
export default defineComponent({
    components: {
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

        const formState = reactive({
            loading: false
        });

        const formRules = reactive({
            account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
            password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
        });

        async function handleLogin() {
            // 返回 ref 内部值或者文件本身
            const form = unref(formRef);
            try {
                // 获取到表单中填入的对象
                const data = await form.validate();
                login({ username: data.account, password: data.password }).then(() => {
                    setAuthorize().then(() => {
                        message.success('登陆成功');
                        router.push('/menu');
                    });
                });
            } catch (err) {}
        }

        return {
            ...toggleUI(),
            formRef,
            formData,
            formState,
            formRules,
            login: handleLogin
        };
    }
});
</script>

<style lang="scss" scoped>
@import '../../assets/scss/global.scss';
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
            background-color: $defaultColor;
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
            height: 500px;
            left: 30px;
            width: calc(50% - 30px);
            background: white;
            transform: translate3d(100%, 0, 0);
            transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
            box-shadow: 2px 0 15px rgba(0, 0, 0, 0.25);
        }
        .bounceLeft {
            animation: bounceLeft 1s forwards;
        }
        .bounceRight {
            animation: bounceRight 1s forwards;
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
    }
}
</style>
