import type { App } from 'vue';
import MyLoading from './MyLoading/index';

export default function initDirective(app: App) {
    MyLoading(app);

    return app;
}
