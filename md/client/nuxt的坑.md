nuxt从父页面到子页面的时候asyncData不会执行

比如说以下结构从`index`通过`nuxt-link`跳转到`home/index`，会发现`home/index`中的asyncData不会执行

原因:通过`nuxt-link`跳转是走的vue-router，这样的话跳转页面本身并不会通过server端

解决方法 1、将`nuxt-link`标签改成`a`标签 

https://github.com/nuxt/nuxt.js/issues/7467

![nuxt的坑001](E:\project\noctchil\md\client\nuxt的坑001.jpg)