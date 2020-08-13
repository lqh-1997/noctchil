## vuex

vue 中使用[vuex](https://vuex.vuejs.org/zh/)

```javascript
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getter: {},
  mutations: {},
  actions: {},
  modules: {},
});
```

nuxt 中使用[vuex](https://zh.nuxtjs.org/guide/vuex-store)

在 store 文件夹目录下的 index.js 就相当于 store 对象

在 store 文件夹下的其余 js 文件相当于 module

每个文件里面的结构为

```javascript
export const state = () => ({});
export const getters = () => ({});
export const mutations = {};
export const actions = {};
```

凡是通过 Vue.use()加载的组件都要写在`/plugin`目录下 比如说 vue 的路由导航功能

```javascript
default export function ({app}) => {
    app.router.beforeEach((to, from, next) => {
        next();
    });
};
```

## 路由守卫

vue中使用[路由守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#导航守卫)

```
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

nuxt中使用路由守卫

首先在plugin中新增一个js文件，拦截所有路由信息后，遇到跳转的情况使用redirect()

```
// 比如这里所有访问'/buzhunjin'的都会跳回home页面
export default ({ app, redirect }) => {
    app.router.beforeEach((to, from, next) => {
        if (to.path === '/buzhunjin') {
            redirect('/home');
        }
        next();
    });
};

```

然后再`nuxt.config.js`里面注册这个文件即可

## 链接跳转

`router-link`和`nuxt-link`用法一样

## 关于页面meta

vue单页面

nuxt可以在每一个page里面添加meta

```js
export default {
    head() {//set meta tags for this page}
}
```

## 路由错误拦截

vue一般会在route的最后面加上一个全局的path拦截

```
{
	path: '*',
	redirect: '/404'
}
```

nuxt则是在layouts里面增加一个error.vue文件，该文件只能拦截客户端的错误，不能拦截在服务端渲染的错误

如果要拦截服务端渲染时的错误可以使用try和catch，catch到错误的时候使用`context.error(error)`即可将错误抛出到错误页面

```
<template>
  <div>
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
  }
</script>
```