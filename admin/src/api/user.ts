import service from '../utils/request';
import type { User } from '../types/instance';

export function signUp(data: User) {
    return service({
        method: 'POST',
        url: '/signUp',
        data
    });
}

export function login(data: User) {
    return service({
        method: 'POST',
        url: '/login',
        data
    });
}

export function logout() {
    return service({
        method: 'POST',
        url: 'logout'
    });
}

export function getUserInfo() {
    return service({
        method: 'GET',
        url: '/user'
    });
}

export function updateUserInfo(data: any) {
    return service({
        method: 'PUT',
        url: '/user',
        data
    });
}
