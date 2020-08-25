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

export function getAllArticle(env, pageNumber, pageSize) {
    return env.$axios({
        method: 'get',
        url: '/articles',
        params: {
            pageNumber,
            pageSize
        }
    });
}

export function likeArticle(env, articleId, like = true) {
    return env.$axios({
        method: 'put',
        url: '/article/like',
        params: {
            id: articleId,
            doLike: like
        }
    });
}
