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
        </div>
        <a-table
            :columns="columns"
            :data-source="data.articleList"
            :pagination="pagination"
            rowKey="_id"
            @change="pageChange"
        >
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
import { defineComponent, reactive, watchEffect } from 'vue';
import { Table, Tag, Divider, Select } from 'ant-design-vue';
import { getArticle } from '/@/api/article';
import { ArticleState, ArticleType } from '/@/types/instance';
export default defineComponent({
    name: 'articleList',
    components: {
        ASelect: Select,
        ASelectOption: Select.Option,
        ATable: Table,
        ATag: Tag,
        ADivider: Divider
    },
    setup() {
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
                key: 'title',
                width: 300
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
                width: 200
            },
            {
                title: '类型',
                key: 'type',
                dataIndex: 'type',
                slots: { customRender: 'type' },
                width: 100
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                slots: { customRender: 'state' },
                width: 100
            },
            {
                title: '隐藏',
                dataIndex: 'invisible',
                key: 'invisible',
                slots: { customRender: 'invisible' },
                width: 100
            },
            {
                title: '标签',
                dataIndex: 'tags',
                key: 'tags',
                slots: { customRender: 'tags' },
                width: 200
            }
        ];

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
            articleList: []
        });

        // 根据选择的信息获取文章的列表内容
        function handleGetArticle() {
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

        return {
            options,
            typeList,
            stateList,
            invisibleList,
            data,
            columns,
            handleGetArticle,
            pagination,
            pageChange,
            changeSelectValue
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
