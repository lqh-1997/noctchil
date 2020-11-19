export function getHeaderMenu(env) {
    return env.$axios({
        method: 'get',
        url: '/platform/headerMenu'
    });
}
