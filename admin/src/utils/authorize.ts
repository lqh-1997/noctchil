import store from '/@/store';
import { logout } from '/@/api/user';
import { removeCookie } from './cookie';

// 目前为直接获取userId
export function getAuthorize() {
    return store.state.user.userId;
}

// 目前为 不存在就发送请求再获取一遍 返回Promise
export async function setAuthorize() {
    return await store.dispatch('getUserInfo');
}

// 目前为 将userId置为空 调用登出函数 如果登出失败就直接删除cookie
export async function removeAuthorize() {
    store.commit('setUserId', null);
    try {
        await logout();
    } catch (err) {
        removeCookie('noctchil_s.sig');
        removeCookie('noctchil_s');
        throw err;
    }
}

export function roleIsAdmin() {
    return store.state.user.isAdmin;
}
