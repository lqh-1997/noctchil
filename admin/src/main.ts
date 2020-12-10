import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store, { key } from './store';
import 'ant-design-vue/dist/antd.css';
import '/@/assets/scss/reset.scss';
import './permission';

const app = createApp(App).use(router).use(store, key);

app.mount('#app');

export default app;
