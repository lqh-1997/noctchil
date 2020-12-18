<template>
    <div class="list-container">
        <div class="list-select-group">
            <div>
                <span>文章类型:</span>
                <a-select
                    style="width: 120px"
                    v-model:value="options.type"
                    @change="changeSelectValue($event, 'type')"
                >
                    <a-select-option v-for="item of typeList" :key="item.value">
                        {{ item.name }}
                    </a-select-option>
                </a-select>
            </div>
            <div>
                <span>文章状态:</span>
                <a-select
                    style="width: 120px"
                    v-model:value="options.state"
                    @change="changeSelectValue($event, 'state')"
                >
                    <a-select-option v-for="item of stateList" :key="item.value">
                        {{ item.name }}
                    </a-select-option>
                </a-select>
            </div>
            <div>
                <span>文章显示:</span>
                <a-select
                    style="width: 120px"
                    v-model:value="options.invisibleString"
                    @change="changeSelectValue($event, 'invisibleString')"
                >
                    <a-select-option v-for="item of invisibleList" :key="item.value">
                        {{ item.name }}
                    </a-select-option>
                </a-select>
            </div>
            <div>
                <a-button type="primary" @click="createArticle">新增文章</a-button>
            </div>
            <div>
                <a-button type="danger" @click="removeArticle">删除文章</a-button>
            </div>
        </div>
        <a-table
            :columns="columns"
            :data-source="data.articleList"
            :pagination="pagination"
            rowKey="_id"
            @change="pageChange"
            :loading="tableLoading"
            :bordered="false"
            size="small"
            :rowSelection="{
                columnWidth: 0,
                onSelect: pageSelect
            }"
        >
            <template v-slot:tags="{ text: tags }">
                <span>
                    <a-tag v-for="tag in tags" :key="tag._id" :color="tag.color" :title="tag.name">
                        {{ tag.name.length > 7 ? `${tag.name.slice(0, 7)}...` : tag.name }}
                    </a-tag>
                </span>
            </template>
            <template v-slot:createTime="{ text: createTime }">
                <span>{{ createTime.replace('T', ' ').replace(/\.[0-9]{3}Z$/, '') }}</span>
            </template>
            <template v-slot:state="{ text: state }">
                <span v-if="state === 'draft'">草稿</span>
                <span v-else :style="`color: ${color}`">发布中</span>
            </template>
            <template v-slot:type="{ text: type }">
                <span v-if="type === 'article'">文章</span>
                <span v-else :style="`color: ${color}`">吐槽</span>
            </template>
            <template v-slot:invisible="{ text: invisible }">
                <span v-if="invisible">是</span>
                <span v-else :style="`color: ${color}`">否</span>
            </template>
            <template #operation="{ record }">
                <a-button @click="updateArticle(record)">编辑</a-button>
            </template>
        </a-table>
        <MyDialog></MyDialog>
    </div>
</template>

<script lang="ts">
import { createVNode, defineComponent, reactive, ref, watchEffect } from 'vue';
import { Table, Tag, Divider, Select, Button, message, Modal } from 'ant-design-vue';
import { globalSetting } from '/@/config/global';
import { deleteArticles, getArticle } from '/@/api/article';
import { ArticleState, ArticleType } from '/@/types/instance';
import MyDialog from '/@/components/MyDialog/index.vue';
import { useRouter } from 'vue-router';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
export default defineComponent({
    name: 'articleList',
    components: {
        ASelect: Select,
        ASelectOption: Select.Option,
        ATable: Table,
        ATag: Tag,
        ADivider: Divider,
        AButton: Button,
        MyDialog
    },
    setup() {
        const router = useRouter();

        // select的列表内容
        const typeList = [
            {
                value: 'null',
                name: '--'
            },
            {
                value: 'article',
                name: '文章'
            },
            {
                value: 'message',
                name: '吐槽'
            }
        ];
        const stateList = [
            {
                value: 'null',
                name: '--'
            },
            {
                value: 'publish',
                name: '已发布'
            },
            {
                value: 'draft',
                name: '草稿'
            }
        ];
        const invisibleList = [
            {
                value: 'null',
                name: '--'
            },
            {
                value: 'false',
                name: '公开'
            },
            {
                value: 'true',
                name: '隐藏'
            }
        ];

        // 表格的列信息
        const columns = [
            {
                title: '文章名',
                dataIndex: 'title',
                width: 200
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                slots: { customRender: 'createTime' },
                width: 200
            },
            {
                title: '类型',
                dataIndex: 'type',
                slots: { customRender: 'type' },
                width: 100
            },
            {
                title: '状态',
                dataIndex: 'state',
                slots: { customRender: 'state' },
                width: 100
            },
            {
                title: '隐藏',
                dataIndex: 'invisible',
                slots: { customRender: 'invisible' },
                width: 100
            },
            {
                title: '标签',
                dataIndex: 'tags',
                slots: { customRender: 'tags' },
                width: 150
            },
            {
                title: '操作',
                dataIndex: 'operation',
                slots: { customRender: 'operation' },
                width: 100
            }
        ];
        const tableLoading = ref<boolean>(false);

        // 分页的配置信息
        const pagination = reactive({
            total: 0,
            showQuickJumper: true
        });

        // select选择器中的选项
        const options = reactive<{
            pageNumber: number;
            pageSize: number;
            type: ArticleType | null;
            state: ArticleState | null;
            invisible: boolean | null;
            invisibleString: 'true' | 'false' | null;
        }>({
            pageNumber: 1,
            pageSize: 10,
            type: null,
            state: null,
            invisible: null,
            // 由于ant组件不能传除了string和number以外的值 所以定义一个变量用来和select组件双向绑定
            invisibleString: null
        });

        // 文章的列表内容
        let data = reactive<any>({
            articleList: [],
            selectedList: []
        });

        // 根据选择的信息获取文章的列表内容
        function handleGetArticle() {
            tableLoading.value = true;
            getArticle(
                options.pageNumber,
                options.pageSize,
                options.type,
                options.state,
                options.invisible
            ).then((res) => {
                // console.log(res.data.data);
                data.articleList = res.data.data.data;
                pagination.total = res.data.data.total;
                tableLoading.value = false;
            });
        }

        // 页数改变时的回调
        function pageChange(e: any) {
            options.pageNumber = e.current;
        }

        /**
         * @param val 选择的回调值
         * @param name 属性名字
         * @description 由于ant组件不能传除了string和number以外的值 所以用来手动触发赋值 注意为了保持行为一致性 所以name是要和双向绑定的值一样的
         */
        function changeSelectValue(val: string, name: string) {
            if (val === 'null') {
                options[name] = null;
                options.invisible = name === 'invisibleString' ? null : options.invisible;
                return;
            }
            if (name === 'invisibleString') {
                options.invisible = val === 'true' ? true : false;
            }
        }

        handleGetArticle();

        watchEffect(handleGetArticle);

        // 跳转到更新文章页面
        function updateArticle(obj: any) {
            router.push({ name: 'articleUpdate', params: { articleId: obj._id } });
        }
        // 跳转到新建文章页面
        function createArticle() {
            router.push({ name: 'articleCreate' });
        }
        // 删除selectedList中的文章 删除之后重新像服务器发起一次请求 重置当前的文章列表
        function removeArticle() {
            const idList = data.selectedList.map((item: any) => {
                return item._id;
            });
            if (!Array.isArray(idList) || idList.length === 0) {
                message.info('你在删个🔨');
                return;
            }
            Modal.confirm({
                title: '确定删除文章' + idList.length + '篇?',
                icon: createVNode(ExclamationCircleOutlined),
                okText: '确定',
                okType: 'danger',
                cancelText: '取消',
                onCancel() {},
                onOk() {
                    deleteArticles(idList).then((res) => {
                        const { data } = res.data;
                        if (data === 0) {
                            message.info('删除了个寂寞');
                        } else if (data.length) {
                            message.success('成功删除文章' + data + '篇');
                        }
                        handleGetArticle();
                    });
                }
            });
        }

        function pageSelect(_key: any, _selected: boolean, selectedRows: any) {
            data.selectedList = selectedRows;
            // row ? data.selectedList.push()
        }

        return {
            options,
            typeList,
            stateList,
            invisibleList,
            data,
            columns,
            tableLoading,
            handleGetArticle,
            pagination,
            pageChange,
            changeSelectValue,
            updateArticle,
            createArticle,
            removeArticle,
            pageSelect,
            color: globalSetting.defaultColor
        };
    }
});
</script>

<style lang="scss" scoped>
.list-container {
    margin: 20px;
    .list-select-group {
        display: flex;
        margin-bottom: 20px;
        & > div {
            margin-left: 20px;
        }
        span {
            margin-right: 10px;
        }
    }
}
</style>
