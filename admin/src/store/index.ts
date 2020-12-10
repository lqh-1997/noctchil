import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import userStore, { UserStore } from './modules/user';
import applyStore, { ApplyStore } from './modules/apply';

export interface State {
    user: UserStore;
    apply: ApplyStore;
}

export const key: InjectionKey<Store<State>> = Symbol();

const store = createStore<State>({
    modules: {
        user: userStore,
        apply: applyStore
    }
});

export default store;
