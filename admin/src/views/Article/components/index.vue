<template>
    <div class="container">
        <div class="left-container">
            <div v-if="obj.type === 'article'">
                <MyFocus v-model:value="obj.title" text="文章名称"></MyFocus>
            </div>
            <div v-if="obj.type === 'article'">
                <MyTextArea
                    v-model:value="obj.desc"
                    text="文章描述"
                    @keydown="clickTab"
                ></MyTextArea>
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
                    <div class="radio" v-if="!edit">
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
                    <template v-for="tag of tagsObj.list" :key="tag._id">
                        <a-checkable-tag
                            :checked="obj.tags.indexOf(tag._id) !== -1"
                            @change="(checked) => handleTagChange(tag, checked)"
                        >
                            {{ tag.name.length > 15 ? `${tag.name.slice(0, 15)}...` : tag.name }}
                        </a-checkable-tag>
                    </template>
                </a-collapse-panel>
            </a-collapse>
            <a-button style="margin-top: 30px" @click="initTable">重置</a-button>
            <a-button style="margin-top: 30px; margin-left: 20px" @click="articleControl">
                {{ edit ? '编辑' : '发布' }}
            </a-button>
        </div>
    </div>
</template>

<script lang="ts">
import Editor from '@toast-ui/editor';
import Svg from '/@/components/Icon/index.vue';
import MyFocus from '/@/components/MyInput/index.vue';
import MyTextArea from '/@/components/MyTextArea/index.vue';
import { createVNode, defineComponent, onMounted, PropType, reactive, ref, unref } from 'vue';
import { useRoute } from 'vue-router';
// FIXME deepClone回把proxy 弄掉 就没有响应式了 先手动赋值
// import { deepClone } from '/@/utils/helper';
import { getTag } from '/@/api/tag';
import { createArticle, getArticleById, updateArticle } from '/@/api/article';
import { Button, Radio, Modal, message, Collapse, Tag as ATag } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { bilibiliPlugin } from '/@/utils/tuiEditorPlugin';
// Editor's Dependency Style
import 'codemirror/lib/codemirror.css';
// Editor's Style
import '@toast-ui/editor/dist/toastui-editor.css';
import type { Article, Tag } from '/@/types/instance';

export default defineComponent({
    name: 'articleCreate',
    props: {
        // 用来判断当前是编辑页面还是新增页面
        edit: {
            type: Boolean as PropType<boolean>,
            default: false
        }
    },
    components: {
        Svg,
        MyFocus,
        MyTextArea,
        AButton: Button,
        ACollapse: Collapse,
        ARadioGroup: Radio.Group,
        ACollapsePanel: Collapse.Panel,
        ACheckableTag: ATag.CheckableTag
    },
    setup(props) {
        // 文章标识放在params里面
        let articleId: string;
        if (props.edit) {
            const route = useRoute();
            articleId = <string>route.params.articleId;
        }

        // 用来初始化editor
        const editorRef = ref<HTMLElement | null>(null);
        let editor: null | Editor = null;

        // 存放初始的数据 重置的时候会使用
        let oldContent: string = '';
        let oldObj = reactive<Article>({
            title: '',
            desc: '',
            state: 'draft',
            invisible: false,
            type: 'article',
            tags: []
        });

        // 上传时候使用的数据 双向绑定的数据 重置的时候就将oldObj的赋值到这里
        let obj = reactive<Article>({
            title: '',
            desc: '',
            state: 'draft',
            invisible: false,
            type: 'article',
            tags: []
        });

        // 这部分用来处理tag
        // 这个tagsObj中的list存放的是从数据库获得的tag列表 用来进行渲染
        // (用reactive包裹可以监听到数组操作的变化，不要写成reactive<[]>哦，不然直接赋值是不会触发proxy的)
        const tagsObj = reactive<{
            list: Array<Tag>;
        }>({
            list: []
        });
        // 页面的tag改变的时候触发的回调函数
        const handleTagChange = function (tag: Tag, checked: boolean) {
            obj.tags = checked ? [...obj.tags, tag._id!] : obj.tags.filter((t) => t !== tag._id);
        };

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

        // 重置当前页面所有的输入 也就是重置obj 将当前oldObj的内容赋值给obj
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
                obj.title = oldObj.title;
                obj.desc = oldObj.desc;
                obj.state = oldObj.state;
                obj.invisible = oldObj.invisible;
                obj.type = oldObj.type;
                obj.tags = oldObj.tags.map((item) => item);
                // obj = deepClone(oldObj);
                editor && editor.setHtml(oldContent);
            }
        };
        // 重置oldObj 就是将当前obj的内容赋值给oldObj
        const initOldObj = function () {
            oldObj.title = obj.title;
            oldObj.desc = obj.desc;
            oldObj.state = obj.state;
            oldObj.invisible = obj.invisible;
            oldObj.type = obj.type;
            oldObj.tags = obj.tags.map((item) => item);
            // oldObj = deepClone(obj);
            oldContent = editor!.getHtml();
        };

        // 如果用户在desc位置点击键盘的tab就focus当前editor
        const clickTab = function (e: KeyboardEvent) {
            if (e.which === 9) {
                e.preventDefault();
                editor && editor.focus();
            }
        };

        // 发布文章
        const addArticle = function () {
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
        const editArticle = function () {
            Modal.confirm({
                title: '确定修改文章？',
                icon: createVNode(ExclamationCircleOutlined),
                onOk() {
                    // 将文章基本信息和editor的内容结合
                    updateArticle(
                        Object.assign(obj, { content: editor && editor.getHtml(), id: articleId })
                    ).then((res) => {
                        initOldObj();
                        message.success(res.data.message);
                    });
                },
                onCancel() {}
            });
        };

        // 根据操作类型初始化操作方法
        const articleControl = (function () {
            if (props.edit) {
                return editArticle;
            } else {
                return addArticle;
            }
        })();

        onMounted(() => {
            // 新建编辑器
            editor = new Editor({
                el: unref(editorRef)!,
                height: '500px',
                initialEditType: 'markdown',
                previewStyle: 'vertical',
                plugins: [bilibiliPlugin]
            });
            // 异步获取tag列表
            getTag().then((res) => {
                tagsObj.list = res.data.data;
                // 如果是edit状态则异步获取文章信息 如果获取tag失败就单纯弹个错误
                if (props.edit) {
                    getArticleById(articleId).then((res) => {
                        const data = res.data.data;
                        // 初始化上传时的数据
                        obj.title = data.title;
                        obj.desc = data.desc;
                        obj.state = data.state;
                        obj.invisible = data.invisible;
                        obj.type = data.type;
                        obj.tags = data.tags.map((item: Tag) => item._id);
                        // obj = deepClone(data);
                        // 初始化留档复原数据
                        oldObj.title = data.title;
                        oldObj.desc = data.desc;
                        oldObj.state = data.state;
                        oldObj.invisible = data.invisible;
                        oldObj.type = data.type;
                        oldObj.tags = data.tags.map((item: Tag) => item._id);
                        // oldObj = deepClone(data);
                        // 初始化文章内容
                        oldContent = data.content;
                        // 存储当前文章数据
                        editor!.setHtml(oldContent);
                    });
                }
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
            articleControl,
            optionKey,
            tagKey,
            tagsObj,
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
