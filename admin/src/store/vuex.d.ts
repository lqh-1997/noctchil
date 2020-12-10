import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';
import { ApplyStore } from './modules/apply';
import { UserStore } from './modules/user';

declare module '@vue/runtime-core' {
    // declare your own store states
    interface State {
        user: UserStore;
        apply: ApplyStore;
    }

    interface ComponentCustomProperties {
        $store: Store<State>;
    }
}
