import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'ant-design-vue/dist/antd.css';
import '/@/assets/scss/reset.scss';

const app = createApp(App).use(router);

app.mount('#app');

export default app;
