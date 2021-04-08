import { ActionContext } from 'vuex';
import { State } from '..';
import { getUserInfo } from '/@/api/user';
import { globalSetting } from '../../config/global';

export interface UserStore {
    userId: string | null;
    username: string | null;
    nicename: string | null;
    isAdmin: boolean;
    avatar: string;
}

const serverIp = import.meta.env.VITE_SERVER_SITE;

const userStore = {
    state: (): UserStore => ({
        userId: null,
        username: null,
        nicename: null,
        isAdmin: false,
        avatar: serverIp + globalSetting.defaultAvatar
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
        },
        setAvatar(state: UserStore, avatar?: string) {
            state.avatar = avatar ? avatar : serverIp + globalSetting.defaultAvatar;
        }
    },
    actions: {
        getUserInfo({ commit }: ActionContext<UserStore, State>) {
            return new Promise<void>((resolve, reject) => {
                getUserInfo()
                    .then((res) => {
                        const { data } = res.data;
                        commit('setUserId', data._id);
                        commit('setUsername', data.username);
                        commit('setNicename', data.nicename);
                        commit('setIsAdmin', data.isAdmin || false);
                        commit('setAvatar', serverIp + data.avatar);
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
