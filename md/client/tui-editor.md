## 引入tui.editor

使用 tui.editor 作为 markdown 的编辑器 [github](https://github.com/nhn/tui.editor)地址

在 github 上可以找到 vue 封装好的组件，于是直接就引入了 vue 的组件

`npm install --save @toast-ui/vue-editor`

tui.editor分为editor和viewer

由于使用了nuxt，所以引入方法和官方文档有些许不同

首先要在nuxt的plugins目录下新建对应的`tui_editor.js`和`tui_viewer.js`分别写上以下内容

```javascript
import Vue from 'vue';
import { Editor } from '@toast-ui/vue-editor';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

Vue.component('editor', Editor);

```

```javascript
import Vue from 'vue';
import { Viewer } from '@toast-ui/vue-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

Vue.component('viewer', Viewer);

```

然后在`nuxt.config.js`文件中导入这两个js文件

```javascript
plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios',
    { src: '@/plugins/tui_editor', mode: 'client' },
    { src: '@/plugins/tui_viewer', mode: 'client' }
]
```

这样子就能防止出现在服务端渲染的时候出现`window is not defined`的情况了

### 使用方法

具体使用方法以及参数配置可参考https://nhn.github.io/tui.editor/latest/ToastUIEditor

```javascript
<editor previewStyle="tab" :options="{hideModeSwitch: true}" ref="toastuiEditor"/>
```

调用挂载的方法通过`this.$refs.xxx.invoke(methodName, ...args)`,例子

```javascript
export default{
    methods: {
        getHtml(){
            return this.$refs.toastuiEditor.invoke('getHtml')
        }
    }
}
```

事件回调

- load : It would be emitted when editor fully load
- change : It would be emitted when content changed
- stateChange : It would be emitted when format change by cursor position
- focus : It would be emitted when editor get focus
- blur : It would be emitted when editor loose focus