export function getHeaderMenu(env) {
    return env.$axios({
        method: 'GET',
        url: '/platform/headerMenu'
    });
}
