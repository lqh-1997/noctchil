<template>
    <div class="tag-container">
        <a-tag
            v-for="(item, index) of data.list"
            :key="item._id"
            :color="item.color"
            closable
            @close="removeTag($event, item, index)"
            :ref="setTagRefs"
        >
            {{ item.name }}
        </a-tag>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, createVNode } from 'vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { Modal, Tag } from 'ant-design-vue';
import MyTag from '/@/components/MyTag/index.vue';
import { deleteTag, getTag } from '../../api/tag';
export default defineComponent({
    components: {
        MyTag,
        ATag: Tag
    },
    setup() {
        // 什么类型 是ComponentPublicInstance? 还是写AnyScript吧
        const tagRefs: Array<any> = [];
        const data = reactive<any>({
            list: []
        });

        const setTagRefs = (el: any) => {
            tagRefs.push(el);
        };

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
        function removeTag(e: Event, item: any, index: number) {
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
                        tagRefs[index].$el.style.display = 'none';
                    });
                },
                onCancel() {}
            });
        }

        return {
            data,
            removeTag,
            setTagRefs
        };
    }
});
</script>

<style lang="scss" scoped>
.tag-container {
    margin: 20px;
}
</style>
