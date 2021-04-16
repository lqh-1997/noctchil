// import type { App } from '@vue/runtime-core';
import App from 'vue';
import MyLoading from './loading.vue';

export default function MyLoadingDirective(app: App) {
    app.directive('myLoading', (el, binding) => {
        console.log(el);
        console.log(binding);
    });

    return app;
}

App.extend;
