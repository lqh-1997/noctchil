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
    SET_USERID(state, id) {
        state.userId = id;
    },
    SET_USERNAME(state, username) {
        state.username = username;
    },
    SET_NICENAME(state, nicename) {
        state.nicename = nicename;
    }
};

export const actions = {
    getUserInfo({ commit }, app) {
        return new Promise((resolve, reject) => {
            getUserInfo(app)
                .then((res) => {
                    const { data } = res.data;
                    commit('SET_USERID', data._id);
                    commit('SET_USERNAME', data.username);
                    commit('SET_NICENAME', data.nicename);
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
};
