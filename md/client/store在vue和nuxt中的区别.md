vue中使用https://vuex.vuejs.org/zh/

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{},
    getter: {},
    mutations: {},
    actions: {},
    modules: {}
})
```



nuxt中使用https://zh.nuxtjs.org/guide/vuex-store

在store文件夹目录下的index.js就相当于store对象

在store文件夹下的其余js文件相当于module

每个文件里面的结构为

```javascript
export const state = () => ({})
export const getters = () => ({})
export const mutations = {}
export const actions = {}
```

