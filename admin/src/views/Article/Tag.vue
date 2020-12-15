<template>
    <div class="tag-container">
        <a-tag
            v-for="item of data.list"
            :key="item._id"
            :color="item.color"
            closable
            @close="removeTag($event, item)"
            :ref="setTagRefs"
        >
            {{ item.name }}
        </a-tag>
        <a-input
            type="text"
            size="small"
            :style="{ width: '78px' }"
            v-model:value="tagName"
            v-if="inputVisible"
            @blur="toggleInputVisible"
            @keyup.enter="newTag"
        />
        <a-tag v-else class="add-tag" @click="toggleInputVisible">
            <PlusOutlined /> 新建 Tag
        </a-tag>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, createVNode, ref } from 'vue';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { Modal, Tag, Input, message } from 'ant-design-vue';
import { deleteTag, getTag, addTag } from '../../api/tag';
import { globalSetting } from '../../config/global';
export default defineComponent({
    name: 'tag',
    components: {
        ATag: Tag,
        AInput: Input,
        PlusOutlined
    },
    setup() {
        // 什么类型 是ComponentPublicInstance? 还是写AnyScript吧
        const tagRefs: Array<any> = [];
        const data = reactive<any>({
            list: []
        });
        const tagName = ref('');
        const inputVisible = ref(false);

        // 这个东西没啥用 也留着了 就当是一个例子 表示动态的ref是这样写的
        const setTagRefs = (el: any) => {
            tagRefs.push(el);
        };

        function toggleInputVisible() {
            inputVisible.value = !inputVisible.value;
        }

        onMounted(() => {
            getTag().then((res) => {
                data.list = res.data.data;
            });
        });

        /**
         * @param e 原生的事件 用来阻止默认事件
         * @param item 标签的信息
         * @param index 获得当前是第几个标签 用来移除标签的显示
         */
        function removeTag(e: Event, item: any) {
            e.preventDefault();
            Modal.confirm({
                title: '删除tag',
                icon: createVNode(ExclamationCircleOutlined),
                content: '确定要删除该tag吗?',
                okText: '是',
                okType: 'danger',
                cancelText: '否',
                onOk() {
                    deleteTag(item._id).then(() => {
                        message.success('删除成功');
                        data.list = data.list.filter((tag: any) => {
                            if (tag._id === item._id) {
                                return false;
                            }
                            return true;
                        });
                    });
                },
                onCancel() {}
            });
        }

        // TODO 暂时直接传入的是系统设定的默认颜色 彩色好像太难看了 也没有想要改的想法
        function newTag() {
            addTag({ name: tagName.value, color: globalSetting.defaultColor }).then((res) => {
                message.success(res.data.message);
                data.list.push({
                    name: tagName.value,
                    color: globalSetting.defaultColor,
                    _id: res.data.data
                });
                tagName.value = '';
                console.log(data.list);
            });
        }

        return {
            data,
            removeTag,
            setTagRefs,
            tagName,
            inputVisible,
            toggleInputVisible,
            newTag
        };
    }
});
</script>

<style lang="scss" scoped>
@import '../../assets/scss/global.scss';
.tag-container {
    margin: 20px;
    line-height: 30px;
    .add-tag {
        background: #fff;
        border-style: dashed;
        color: $defaultColor;
        border-color: $defaultColor;
        &:hover {
            cursor: pointer;
        }
    }
}
</style>
