<template>
    <div class="comment">
        <h1>发表评论</h1>
        <div class="comment-avatar"></div>
        <div class="comment-main">
            <editor
                :options="editorOptions"
                previewStyle="tab"
                ref="editorInstance"
                initialEditType="wysiwyg"
                class="comment-editor"
                height="180px"
            ></editor>
            <div class="comment-tool">
                <el-button size="mini" @click="switchMode" plain>切换模式</el-button>
                <emoji></emoji>
                <el-button size="mini" class="comment-submit" type="primary">评论</el-button>
            </div>
        </div>
    </div>
</template>

<script>
// 评论组件
// 添加按钮切换markdown和富文本 不用原生的 自己调用方法 可以修改样式
// 增加表情 使用哈希替换 初步想法 表情点开的时候缓存到浏览器的数据库里面 或者 强缓存 ?
// 游客的时候有一个填写名字的输入框 登录之后该输入框就不显示(默认填入用户名)
import emoji from './Emoji';
export default {
    components: {
        emoji
    },
    data() {
        return {
            editorOptions: {
                hideModeSwitch: true,
                placeholder: '小提示: 切换模式后支持使用markdown语法',
                language: 'zh-cn'
            }
        };
    },
    methods: {
        switchMode() {
            const editor = this.$refs.editorInstance;
            const type = editor.invoke('isMarkdownMode') ? 'wysiwyg' : 'markdown';
            editor.invoke('changeMode', type, true);
        }
    },
    mounted() {},
    async asyncData() {}
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/global.scss';
.comment {
    margin-top: 20px;
    h1 {
        font-size: 30px;
        margin-bottom: 10px;
    }
    .comment-avatar {
        width: 50px;
        height: 50px;
        background: wheat;
        border-radius: 50%;
        float: left;
        margin: 10px 20px 20px 20px;
    }
    .comment-editor /deep/.te-mode-switch-section {
        display: none !important;
    }
    .comment-editor /deep/.te-toolbar-section {
        border-bottom: none;
    }
    .comment-editor /deep/.tui-editor-defaultUI {
        border-radius: 8px 8px 0 0;
        border: 1px solid #eee;
        overflow: auto;
    }
    .comment-tool {
        background-color: white;
        padding-left: 10px;
        position: relative;
        height: 40px;
        line-height: 40px;
        border-radius: 0 0 8px 8px;
        border: 1px solid #eee;
        margin-left: 90px;
        .comment-submit {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}
@media screen and (max-width: $defaultMiddleWidth) {
    .comment-main {
        margin: 20px;
        .comment-tool {
            margin-left: 70px;
        }
    }
}
</style>
