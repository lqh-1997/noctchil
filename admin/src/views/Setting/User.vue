<template>
    <div>
        <div class="header-setting">
            <h1>头像设置</h1>
            <div class="header-upload">
                <div class="header-container">
                    <img style="height: 200px; width: 200px" :src="avatar" />
                </div>
                <a-upload name="avatar" :customRequest="handleUpdate">
                    <a-button> <upload-outlined /> Click to Upload </a-button>
                </a-upload>
            </div>
            <a-button class="header-confirm" @click="confirmAvatar">确定</a-button>
        </div>
    </div>
</template>

<script lang="ts">
import { createVNode, defineComponent, ref } from 'vue';
import { Upload, Button, Modal, message } from 'ant-design-vue';
import { ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons-vue';
import { uploadAvatar } from '../../api/file';
import { updateUserInfo } from '/@/api/user';
import { useStore } from 'vuex';
import { key } from '/@/store/index';
import { getServerIp } from '/@/utils/helper';
export default defineComponent({
    components: {
        AUpload: Upload,
        UploadOutlined,
        AButton: Button
    },
    setup() {
        const store = useStore(key);

        const avatar = ref(store.state.user.avatar);
        const userAvatar = ref('');

        // FIXME 增加onProgress
        function handleUpdate(options: any) {
            // 读取本地图片的base64 然后写入左边的栏目中
            const reader = new FileReader();
            reader.readAsDataURL(options.file);
            reader.onload = (e: any) => {
                avatar.value = e.target.result;
            };

            // 上传图片
            const formData = new FormData();
            formData.append('avatar', options.file);
            uploadAvatar(formData)
                .then((res) => {
                    // 上传成功则修改进度条状态
                    options.onSuccess(res, options.file);
                    // 上传成功则修改要传的待定头像
                    userAvatar.value = '/' + res.data.data.fieldname + '/' + res.data.data.filename;
                })
                .catch((err) => {
                    // 上传失败惹 就把左边的图片复原
                    avatar.value = store.state.user.avatar;
                    userAvatar.value = '';
                    options.onError(err, options.file);
                });
        }

        function confirmAvatar() {
            if (userAvatar.value === '') {
                message.info('请先上传图片');
                return;
            }
            Modal.confirm({
                title: '更新头像',
                icon: createVNode(ExclamationCircleOutlined),
                content: '确定要更新头像吗?',
                okText: '是',
                okType: 'danger',
                cancelText: '否',
                onOk() {
                    updateUserInfo({ avatar: userAvatar.value }).then(() => {
                        store.commit('setAvatar', getServerIp() + userAvatar.value);
                        message.success('更新成功');
                    });
                },
                onCancel() {}
            });
        }

        return {
            handleUpdate,
            avatar,
            confirmAvatar
        };
    }
});
</script>

<style lang="scss" scoped>
.header-setting {
    margin: 20px;
    background-color: white;
    min-height: 100px;
    border-radius: 10px;
    padding: 10px;
    h1 {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .header-upload {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 20px;
        .header-container {
            height: 200px;
            width: 200px;
            overflow: hidden;
            border: 1px solid #eee;
        }
    }
    .header-confirm {
        left: 50%;
        transform: translateX(-50%);
    }
}
</style>
