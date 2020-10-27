<template>
    <div class="container">
        <div class="left-container">
            <div>
                <a-input v-model:value="title" placeholder="请输入文章名" />
            </div>
            <div>
                <a-text-area v-model:value="desc" placeholder="请输入文章描述" />
            </div>
            <div ref="editorRef" id="editor"></div>
        </div>
        <div class="right-container">
            <div>
                <MyCollapse>
                    <template v-slot:title> 名字 </template>
                    <template v-slot:default>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                    </template>
                </MyCollapse>
            </div>
            <div>类型</div>
            <div>标签</div>
            <div>分类</div>
        </div>
    </div>
</template>

<script lang="ts">
import Collapse from '/@/components/Collapse/index.vue';
import { bilibiliPlugin } from '/@/utils/tuiEditorPlugin';
import { defineComponent, onMounted, ref, unref } from 'vue';
import { Button, Input } from 'ant-design-vue';
import Editor from '@toast-ui/editor';
// Editor's Dependency Style
import 'codemirror/lib/codemirror.css';
// Editor's Style
import '@toast-ui/editor/dist/toastui-editor.css';

export default defineComponent({
    name: 'articleCreate',
    components: {
        AButton: Button,
        AInput: Input,
        ATextArea: Input.TextArea,
        MyCollapse: Collapse
    },
    setup() {
        const editorRef = ref<HTMLElement | null>(null);
        const title = ref<string>('');
        const desc = ref<string>('');

        onMounted(() => {
            new Editor({
                el: unref(editorRef)!,
                height: '500px',
                initialEditType: 'markdown',
                previewStyle: 'vertical',
                plugins: [bilibiliPlugin]
            });
        });

        return {
            editorRef,
            title,
            desc
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
    .left-container {
        padding: 20px 10px 20px 10px;
        display: grid;
        row-gap: 20px;
    }
    .right-container {
        height: 100%;
        padding: 20px 10px;
    }
}
#editor ::v-deep(.te-preview) {
    background-color: white;
}
</style>
