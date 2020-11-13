import Cookie from 'js-cookie';

export function getCookie(key: string) {
    return Cookie.get(key);
}

export function setCookie(key: string, value: string) {
    return Cookie.set(key, value);
}

export function removeCookie(key: string) {
    return Cookie.remove(key);
}
