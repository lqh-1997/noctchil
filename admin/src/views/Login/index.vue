<template>
    <div class="login">
        <a-form :model="formData" :rules="formRules" ref="formRef">
            <a-form-item name="account" required>
                <a-input v-model:value="formData.account" />
            </a-form-item>
            <a-form-item name="password" required>
                <a-input v-model:value="formData.password" />
            </a-form-item>
            <a-form-item>
                <a-button
                    type="primary"
                    size="large"
                    class="rounded-sm"
                    block
                    @click="login"
                    :loading="formState.loading"
                    >登录</a-button
                >
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, unref } from 'vue';
import { notification } from 'ant-design-vue';
export default defineComponent({
    setup() {
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
            console.log('formRef', formRef);
            const form = unref(formRef);
            console.log('form', form);
            try {
                const data = await form.validate();
                console.log('data', data);
                notification.success({
                    message: '登陆成功'
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

<style lang="scss" scoped></style>
