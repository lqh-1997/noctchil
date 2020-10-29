<template>
    <div class="list-container">
        <a-table :columns="columns" :data-source="data.data" :pagination="false" rowKey="_id">
            <template v-slot:tags="{ text: tags }">
                <span>
                    <a-tag v-for="tag in tags" :key="tag" :color="tag">
                        {{ tag.toUpperCase() }}
                    </a-tag>
                </span>
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
                title: '创建者',
                dataIndex: 'creator',
                key: 'creator'
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime'
            },
            {
                title: '类型',
                key: 'type',
                dataIndex: 'type'
            },
            {
                title: '状态',
                dataIndex: 'type',
                key: 'state'
            },
            {
                title: '隐藏',
                dataIndex: 'invisible',
                key: 'invisible'
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
        let type = ref<ArticleType>('article');
        let state = ref<ArticleState>('draft');
        let invisible = ref<boolean>(false);

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
