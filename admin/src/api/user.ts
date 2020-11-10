import { User } from '../types/instance';
import service from '../utils/request';

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
