<template>
    <div class="container">
        <div class="left-container">
            <div v-if="obj.type === 'article'">
                <a-input
                    id="title"
                    v-model:value="obj.title"
                    placeholder="请输入文章名"
                    size="large"
                />
            </div>
            <div v-if="obj.type === 'article'">
                <a-text-area
                    v-model:value="obj.desc"
                    placeholder="请输入文章描述"
                    @keydown="clickTab"
                />
            </div>
            <div ref="editorRef" id="editor"></div>
        </div>
        <div class="right-container">
            <MyCollapse height="110px">
                <template v-slot:title> 选项 </template>
                <template v-slot:default>
                    <div class="radio">
                        <Svg :iconClass="obj.state"></Svg>
                        <a-radio-group
                            :options="statusList"
                            v-model:value="obj.state"
                            @change="showStatus"
                        />
                        <br />
                    </div>
                    <div class="radio">
                        <Svg :iconClass="obj.invisible ? 'invisible' : 'visible'"></Svg>
                        <a-radio-group
                            :options="visibleList"
                            v-model:value="obj.invisible"
                            @change="showStatus"
                        />
                        <br />
                    </div>
                    <div class="radio">
                        <Svg :iconClass="obj.type"></Svg>
                        <a-radio-group
                            :options="typeList"
                            v-model:value="obj.type"
                            @change="showStatus"
                        />
                        <br />
                    </div>
                </template>
            </MyCollapse>
            <MyCollapse style="margin-top: 30px">
                <template v-slot:title> 标签 </template>
                <a-empty />
            </MyCollapse>
            <a-button style="margin-top: 30px" @click="initTable">重置</a-button>
            <a-button style="margin-top: 30px; margin-left: 20px" @click="publish">发布</a-button>
        </div>
    </div>
</template>

<script lang="ts">
import Collapse from '/@/components/Collapse/index.vue';
import { bilibiliPlugin } from '/@/utils/tuiEditorPlugin';
import { createVNode, defineComponent, onMounted, reactive, ref, unref } from 'vue';
import { Button, Input, Radio, Empty, Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import Editor from '@toast-ui/editor';
import Svg from '/@/components/Icon/index.vue';
// Editor's Dependency Style
import 'codemirror/lib/codemirror.css';
// Editor's Style
import '@toast-ui/editor/dist/toastui-editor.css';
import type { Article } from '/@/types/instance';
import { createArticle } from '/@/api/article';

export default defineComponent({
    name: 'articleCreate',
    components: {
        AButton: Button,
        AInput: Input,
        ATextArea: Input.TextArea,
        MyCollapse: Collapse,
        Svg,
        ARadioGroup: Radio.Group,
        AEmpty: Empty
    },
    setup() {
        const editorRef = ref<HTMLElement | null>(null);
        let editor: null | Editor = null;
        let obj = reactive<Article>({
            title: '',
            desc: '',
            state: 'draft',
            invisible: false,
            type: 'article'
        });

        const statusList = [
            {
                label: '草稿',
                value: 'draft'
            },
            {
                label: '公开',
                value: 'publish'
            }
        ];

        const visibleList = [
            {
                label: '可见',
                value: false
            },
            {
                label: '隐藏',
                value: true
            }
        ];

        const typeList = [
            {
                label: '文章',
                value: 'article'
            },
            {
                label: '吐槽',
                value: 'message'
            }
        ];

        const showStatus = function (e: any) {
            console.log(e.target.value);
        };

        // 重置当前页面所有的输入
        const initTable = function (hint = true) {
            if (hint) {
                Modal.confirm({
                    title: '确定要重置当前页面的输入信息吗？',
                    icon: createVNode(ExclamationCircleOutlined),
                    content: createVNode(
                        'div',
                        { style: 'color:red;' },
                        '重置后当前输入信息将无法挽回'
                    ),
                    onOk() {
                        init();
                    },
                    onCancel() {}
                });
                return;
            }
            init();
            function init() {
                obj.title = '';
                obj.desc = '';
                obj.state = 'draft';
                obj.invisible = true;
                obj.type = 'article';
                editor && editor.reset();
            }
        };

        // 如果用户在desc位置点击键盘的tab就focus当前editor
        const clickTab = function (e: KeyboardEvent) {
            if (e.which === 9) {
                e.preventDefault();
                editor && editor.focus();
            }
        };

        // 发布文章
        const publish = function () {
            // 将文章基本信息和editor的内容结合
            createArticle(Object.assign(obj, { content: editor && editor.getHtml() })).then(
                (res) => {
                    initTable(false);
                    console.log(res);
                }
            );
        };

        onMounted(() => {
            editor = new Editor({
                el: unref(editorRef)!,
                height: '500px',
                initialEditType: 'markdown',
                previewStyle: 'vertical',
                plugins: [bilibiliPlugin]
            });
        });

        return {
            editorRef,
            obj,
            statusList,
            showStatus,
            visibleList,
            typeList,
            initTable,
            clickTab,
            publish
        };
    }
});
</script>

<style lang="scss" scoped>
.container {
    display: grid;
    // 分成两列 右边固定300px
    // 1fr表示剩下的按比例切分 比如分成3列 1fr 2fr 300 第一列就代表分到剩下的1/3 第二列获得剩下的2/3
    grid-template-columns: 1fr 300px;
    // 表示列之间的间隙 行之间的间隙为row-gap: 10px; 两个可以简写成gap: 10px 20px;
    column-gap: 20px;
    #title {
        font-size: 22px;
        font-weight: 550;
    }
    .left-container {
        padding: 20px 10px 20px 10px;
        display: grid;
        row-gap: 20px;
    }
    .right-container {
        text-align: center;
        height: 100%;
        padding: 20px 10px;
        .radio {
            margin-left: 20px;
            margin-top: 5px;
            height: 30px;
            display: flex;
            align-items: center;
            .svg-icon {
                font-size: 26px;
                margin-right: 10px;
            }
        }
    }
}
#editor ::v-deep(.te-preview) {
    background-color: white;
}
</style>
