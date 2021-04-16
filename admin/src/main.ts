import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store, { key } from './store';
import 'ant-design-vue/dist/antd.less';
import '/@/assets/scss/reset.scss';
import './permission';
import initDirective from '/@/directive/index';

const app = createApp(App).use(router).use(store, key);

initDirective(app);

app.config.globalProperties.foo = 'bar';

app.mount('#app');

export default app;
