export function signUp(env, userInfo) {
    return env.$axios({
        method: 'post',
        url: '/signUp',
        data: userInfo
    });
}

export function login(env, userInfo) {
    return env.$axios({
        method: 'post',
        url: '/login',
        data: userInfo
    });
}

export function logout(env) {
    return env.$axios({
        method: 'post',
        url: '/logout'
    });
}

export function getUserInfo(env) {
    return env.$axios({
        method: 'get',
        url: '/user'
    });
}

export function test(env) {
    return env.$axios({
        method: 'get',
        url: '/'
    });
}

export function loginTest(env) {
    return env.$axios({
        method: 'get',
        url: '/loginGet'
    });
}
