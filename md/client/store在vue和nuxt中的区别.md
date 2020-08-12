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