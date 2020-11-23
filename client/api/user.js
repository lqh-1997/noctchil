export function signUp(env, userInfo) {
    return env.$axios({
        method: 'POST',
        url: '/signUp',
        data: userInfo
    });
}

export function login(env, userInfo) {
    return env.$axios({
        method: 'POST',
        url: '/login',
        data: userInfo
    });
}

export function logout(env) {
    return env.$axios({
        method: 'POST',
        url: '/logout'
    });
}

export function getUserInfo(env) {
    return env.$axios({
        method: 'GET',
        url: '/user/client'
    });
}

export function test(env) {
    return env.$axios({
        method: 'GET',
        url: '/'
    });
}

export function loginTest(env) {
    return env.$axios({
        method: 'GET',
        url: '/loginGet'
    });
}
