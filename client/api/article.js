export function createArticle(env, articleInfo) {
    return env.$axios({
        method: 'post',
        url: '/article',
        data: articleInfo
    });
}

export function updateArticle(env, articleInfo) {
    return env.$axios({
        method: 'put',
        url: '/article',
        data: articleInfo
    });
}

export function getArticleById(env, articleId) {
    return env.$axios({
        method: 'get',
        url: '/article',
        params: {
            id: articleId
        }
    });
}

export function getAllArticle(env) {
    return env.$axios({
        method: 'get',
        url: '/articles'
    });
}
