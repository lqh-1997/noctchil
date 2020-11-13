import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'ant-design-vue/dist/antd.css';
import '/@/assets/scss/reset.scss';
import './permission';

const app = createApp(App).use(router).use(store);

app.mount('#app');

export default app;
