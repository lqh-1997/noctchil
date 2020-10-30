<template>
    <div class="list-container">
        <a-table :columns="columns" :data-source="data.data" :pagination="false" rowKey="_id">
            <template v-slot:tags="{ text: tags }">
                <span>
                    <a-tag v-for="tag in tags" :key="tag" color="blue">
                        {{ tag.toUpperCase() }}
                    </a-tag>
                </span>
            </template>
            <template v-slot:state="{ text: state }">
                <span v-if="state === 'draft'" style="color: #52c41a">草稿</span>
                <span v-else style="color: #40a9ff">发布中</span>
            </template>
            <template v-slot:type="{ text: type }">
                <span v-if="type === 'article'" style="color: #ca750b">文章</span>
                <span v-else style="color: #faad14">吐槽</span>
            </template>
            <template v-slot:invisible="{ text: invisible }">
                <span v-if="invisible" style="color: #f5222d">是</span>
                <span v-else style="color: #3cff0b">否</span>
            </template>
        </a-table>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { Table, Tag, Divider } from 'ant-design-vue';
import { getArticle } from '/@/api/article';
import { ArticleState, ArticleType } from '/@/types/instance';
export default defineComponent({
    name: 'articleList',
    components: {
        ATable: Table,
        ATag: Tag,
        ADivider: Divider
    },
    setup() {
        const columns = [
            {
                title: '文章名',
                dataIndex: 'title',
                key: 'title'
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime'
            },
            {
                title: '类型',
                key: 'type',
                dataIndex: 'type',
                slots: { customRender: 'type' }
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                slots: { customRender: 'state' }
            },
            {
                title: '隐藏',
                dataIndex: 'invisible',
                key: 'invisible',
                slots: { customRender: 'invisible' }
            },
            {
                title: '标签',
                dataIndex: 'tags',
                key: 'tags',
                slots: { customRender: 'tags' }
            }
        ];
        let pageNumber = ref<number>(1);
        let pageSize = ref<number>(10);
        let type = ref<ArticleType | null>(null);
        let state = ref<ArticleState | null>(null);
        let invisible = ref<boolean | null>(null);

        let data = reactive<any>({
            data: []
        });

        handleGetArticle();

        function handleGetArticle() {
            getArticle(
                pageNumber.value,
                pageSize.value,
                type.value,
                state.value,
                invisible.value
            ).then((res) => {
                data.data = res.data.data.data;
            });
        }

        return {
            data,
            columns,
            handleGetArticle
        };
    }
});
</script>

<style lang="scss" scoped>
.list-container {
    margin: 20px;
}
</style>
