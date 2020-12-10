import { RouteRecordRaw } from 'vue-router';

export interface ApplyStore {
    routes: RouteRecordRaw[];
    collapse: boolean;
}

const appStore = {
    state: (): ApplyStore => ({
        routes: [],
        collapse: false
    }),
    getters: {
        getRoutes(state: ApplyStore) {
            return state.routes;
        },
        getCollapse(state: ApplyStore) {
            return state.collapse;
        }
    },
    mutations: {
        setRoutes(state: ApplyStore, routes: RouteRecordRaw[]) {
            state.routes = routes;
        },
        toggleCollapse(state: ApplyStore) {
            state.collapse = !state.collapse;
        }
    }
};

export default appStore;
