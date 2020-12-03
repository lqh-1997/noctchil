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
            <a-collapse expand-icon-position="right" v-model:activeKey="optionKey">
                <a-collapse-panel key="1" header="选项">
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
                </a-collapse-panel>
            </a-collapse>
            <a-collapse
                expand-icon-position="right"
                v-model:activeKey="tagKey"
                class="collapse-tag-box"
            >
                <a-collapse-panel key="1" header="标签">
                    <template v-for="tag of data.tagList" :key="tag._id">
                        <a-checkable-tag
                            :checked="selectedTags.indexOf(tag) > -1"
                            @change="(checked) => handleTagChange(tag, checked)"
                        >
                            {{ tag.name.length > 15 ? `${tag.name.slice(0, 15)}...` : tag.name }}
                        </a-checkable-tag>
                    </template>
                </a-collapse-panel>
            </a-collapse>
            <a-button style="margin-top: 30px" @click="initTable">重置</a-button>
            <a-button style="margin-top: 30px; margin-left: 20px" @click="publish">发布</a-button>
        </div>
    </div>
</template>

<script lang="ts">
import { bilibiliPlugin } from '/@/utils/tuiEditorPlugin';
import { createVNode, defineComponent, onMounted, reactive, ref, unref, watchEffect } from 'vue';
import { Button, Input, Radio, Modal, message, Collapse, Tag as ATag } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import Editor from '@toast-ui/editor';
import Svg from '/@/components/Icon/index.vue';
// Editor's Dependency Style
import 'codemirror/lib/codemirror.css';
// Editor's Style
import '@toast-ui/editor/dist/toastui-editor.css';
import type { Article, Tag } from '/@/types/instance';
import { createArticle } from '/@/api/article';
import { getTag } from '/@/api/tag';

export default defineComponent({
    name: 'articleCreate',
    components: {
        AButton: Button,
        AInput: Input,
        ATextArea: Input.TextArea,
        ACollapse: Collapse,
        ACollapsePanel: Collapse.Panel,
        Svg,
        ARadioGroup: Radio.Group,
        ACheckableTag: ATag.CheckableTag
    },
    setup() {
        // 用来初始化editor
        const editorRef = ref<HTMLElement | null>(null);
        let editor: null | Editor = null;
        const obj = reactive<Article>({
            title: '',
            desc: '',
            state: 'draft',
            invisible: false,
            type: 'article',
            tags: []
        });

        // 这部分用来处理tag
        // 这个tagList存放的是从数据库获得的tag列表 用来进行渲染
        const data = reactive<{
            tagList: Array<Tag>;
        }>({
            tagList: []
        });
        // 这个selectTags与页面的已选择tag挂钩
        const selectedTags = ref<Array<Tag>>([]);
        // 页面的tag改变的时候触发的回调函数
        const handleTagChange = function (tag: Tag, checked: boolean) {
            // console.log(tag);
            // console.log(checked);
            selectedTags.value = checked
                ? [...selectedTags.value, tag]
                : selectedTags.value.filter((t) => t !== tag);
        };
        // obj.tags是要上传到数据库的tag (监听页面tag的变化,然后将它的_id赋值给要传给数据库的tag)
        watchEffect(() => {
            obj.tags = selectedTags.value.map((item) => {
                return item._id as string;
            });
            // console.log(obj.tags);
        });

        // 用来处理collapse的开关
        const optionKey = ref(['1']);
        const tagKey = ref(['1']);

        // 用来生成单选区的列表
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
                obj.invisible = false;
                obj.type = 'article';
                // 这里重置的是已选择的tag 因为传给后台的tag会根据这个改变而改变
                selectedTags.value = [];
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
            Modal.confirm({
                title: '确定发布文章？',
                icon: createVNode(ExclamationCircleOutlined),
                onOk() {
                    // 将文章基本信息和editor的内容结合
                    createArticle(Object.assign(obj, { content: editor && editor.getHtml() })).then(
                        (res) => {
                            initTable(false);
                            message.success(res.data.message);
                        }
                    );
                },
                onCancel() {}
            });
        };

        onMounted(() => {
            // 新建编辑器
            editor = new Editor({
                el: unref(editorRef)!,
                height: '500px',
                initialEditType: 'markdown',
                previewStyle: 'vertical',
                plugins: [bilibiliPlugin]
            });
            // 获取tag列表
            getTag().then((res) => {
                data.tagList = res.data.data;
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
            publish,
            optionKey,
            tagKey,
            data,
            selectedTags,
            handleTagChange
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
        .collapse-tag-box {
            line-height: 28px;
        }
    }
    .ant-collapse {
        margin-bottom: 20px;
        & ::v-deep(.ant-collapse-header) {
            text-align: left;
        }
    }
}
#editor ::v-deep(.te-preview) {
    background-color: white;
}
</style>
