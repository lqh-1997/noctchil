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
        toggleCollapse(state: ApplyStore, value?: boolean) {
            if (value === undefined) {
                state.collapse = !state.collapse;
                return;
            }
            state.collapse = value;
        }
    }
};

export default appStore;
