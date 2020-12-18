<template>
    <div class="set-container">
        <div class="set-item">
            <h1>头部菜单</h1>
            <!-- <a-button @click="addHeaderMenu">添加菜单</a-button>
            <div v-for="(item, index) of headerMenu" :key="index">
                <a-input-group compact>
                    <a-input style="width: 30%" v-model:value="item.name" />
                    <a-input style="width: 30%" v-model:value="item.url" />
                    <a-input style="width: 30%" v-model:value="item.target" />
                </a-input-group>
                <Svg iconClass="add" class="svg"></Svg>
                <a-button @click="addHeaderSubMenu(index)">添加子菜单</a-button>
                <template v-if="item.children">
                    <a-input-group
                        compact
                        style="width: 90%"
                        v-for="(subItem, subIndex) of item.children"
                        :key="subIndex"
                    >
                        <a-input style="width: 30%" v-model:value="subItem.name" />
                        <a-input style="width: 30%" v-model:value="subItem.url" />
                        <a-input style="width: 30%" v-model:value="subItem.target" />
                    </a-input-group>
                </template>
            </div>
            <div style="text-align: center">
                <a-button style="margin-right: 10px" @click="resetHeaderMenu">复原</a-button>
                <a-button @click="submitHeaderMenu">修改</a-button>
            </div> -->
            <a-table
                :columns="columns"
                :data-source="[]"
                rowKey="_id"
                :loading="false"
                :bordered="false"
                size="small"
            ></a-table>
        </div>
    </div>
</template>

<script lang="ts">
import Svg from '/@/components/Icon/index.vue';
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { Form, Input, Button, message, Modal, Table } from 'ant-design-vue';
import { getHeaderMenu, updateHeaderMenu } from '../../api/platform';
import { HeaderMenu } from '../../types/instance';
import { deepClone } from '/@/utils/helper';
export default defineComponent({
    name: 'GlobalSet',
    components: {
        AForm: Form,
        AInput: Input,
        AInputGroup: Input.Group,
        AButton: Button,
        ATable: Table,
        Svg
    },
    setup() {
        // TODO 删除未做 改成策略模式?
        const state = reactive<{
            headerMenu: HeaderMenu;
        }>({
            headerMenu: [
                {
                    name: '',
                    url: '',
                    target: '_self',
                    children: [
                        {
                            name: '',
                            url: '',
                            target: '_self'
                        }
                    ]
                }
            ]
        });
        let headerMenuBackup: HeaderMenu;

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
                title: '操作',
                dataIndex: 'operation',
                slots: { customRender: 'operation' },
                width: 100
            }
        ];

        // 添加头部菜单
        function addHeaderMenu() {
            state.headerMenu.push({
                name: '',
                url: '',
                target: '_self'
            });
        }

        // 添加头部子菜单
        function addHeaderSubMenu(index: number) {
            if (state.headerMenu[index]!.children) {
                state.headerMenu[index]!.children!.push({
                    name: '',
                    url: '',
                    target: '_self'
                });
            } else {
                state.headerMenu[index]!.children = [
                    {
                        name: '',
                        url: '',
                        target: '_self'
                    }
                ];
            }
        }

        // 复原头部菜单
        function resetHeaderMenu() {
            state.headerMenu = deepClone(headerMenuBackup);
        }

        // 提交头部菜单更改
        function submitHeaderMenu() {
            Modal.confirm({
                title: '确定要修改菜单栏吗',
                onOk() {
                    updateHeaderMenu(state.headerMenu).then((res) => {
                        message.success(res.data.message);
                        headerMenuBackup = deepClone(state.headerMenu);
                    });
                }
            });
        }

        onMounted(async () => {
            const { data } = await getHeaderMenu();
            // console.log(data);
            state.headerMenu = data.data;
            headerMenuBackup = deepClone(data.data);
        });

        return {
            ...toRefs(state),
            resetHeaderMenu,
            submitHeaderMenu,
            addHeaderMenu,
            addHeaderSubMenu,
            columns
        };
    }
});
</script>

<style lang="scss" scoped>
.set-container {
    padding: 20px;
    .set-item {
        background-color: white;
        padding: 20px;
        margin-bottom: 20px;
    }
    h1 {
        font-weight: bold;
        margin-bottom: 20px;
    }
}
.svg {
    font-size: 16px;
    color: black;
}
</style>
