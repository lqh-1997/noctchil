import { createStore } from 'vuex';
import userStore, { UserStore } from './modules/user';
import applyStore, { ApplyStore } from './modules/apply';

export interface MyStore {
    user: UserStore;
    apply: ApplyStore;
}

const store = createStore({
    modules: {
        user: userStore,
        apply: applyStore
    }
});

export default store;
