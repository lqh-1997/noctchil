import { ActionContext } from 'vuex';
import { MyStore } from '..';
import { getUserInfo } from '/@/api/user';

export interface UserStore {
    userId: string | null;
    username: string | null;
    nicename: string | null;
    isAdmin: boolean;
}

const userStore = {
    state: (): UserStore => ({
        userId: null,
        username: null,
        nicename: null,
        isAdmin: false
    }),
    getters: {
        getUserId(state: UserStore) {
            return state.userId;
        }
    },
    mutations: {
        setUserId(state: UserStore, id: string) {
            state.userId = id;
        },
        setUsername(state: UserStore, username: string) {
            state.username = username;
        },
        setNicename(state: UserStore, nicename: string) {
            state.nicename = nicename;
        },
        setIsAdmin(state: UserStore, isAdmin: boolean) {
            state.isAdmin = isAdmin;
        }
    },
    actions: {
        getUserInfo({ commit }: ActionContext<UserStore, MyStore>) {
            return new Promise((resolve, reject) => {
                getUserInfo()
                    .then((res) => {
                        const { data } = res.data;
                        commit('setUserId', data._id);
                        commit('setUsername', data.username);
                        commit('setNicename', data.nicename);
                        commit('setIsAdmin', data.isAdmin || false);
                        resolve();
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        }
    }
};

export default userStore;
