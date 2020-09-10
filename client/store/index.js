import { getUserInfo } from '../api/user';

export const state = () => ({
    userId: null,
    username: null,
    nicename: null
});

export const getters = {
    getUserId(state) {
        return state.userId;
    }
};

export const mutations = {
    setUserId(state, id) {
        state.userId = id;
    },
    setUsername(state, username) {
        state.username = username;
    },
    setNicename(state, nicename) {
        state.nicename = nicename;
    }
};

export const actions = {
    getUserInfo({ commit }, app) {
        return new Promise((resolve, reject) => {
            getUserInfo(app)
                .then((res) => {
                    const { data } = res.data;
                    commit('setUserId', data._id);
                    commit('setUsername', data.username);
                    commit('setNicename', data.nicename);
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
};
