import { RouteRecordRaw } from 'vue-router';

export interface ApplyStore {
    routes: RouteRecordRaw[];
}

const appStore = {
    state: (): ApplyStore => ({
        routes: []
    }),
    getters: {
        getRoutes(state: ApplyStore) {
            return state.routes;
        }
    },
    mutations: {
        setRoutes(state: ApplyStore, routes: RouteRecordRaw[]) {
            state.routes = routes;
        }
    }
};

export default appStore;
