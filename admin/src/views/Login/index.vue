<template>
    <div class="login">
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
    </div>
</template>

<script lang="ts">
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
.login {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
.ant-form {
    flex-basis: 300px;
}
</style>
