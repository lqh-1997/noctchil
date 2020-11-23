export function createArticle(env, articleInfo) {
    return env.$axios({
        method: 'POST',
        url: '/article',
        data: articleInfo
    });
}

export function updateArticle(env, articleInfo) {
    return env.$axios({
        method: 'PUT',
        url: '/article',
        data: articleInfo
    });
}

export function getArticleById(env, articleId) {
    return env.$axios({
        method: 'GET',
        url: '/article/client',
        params: {
            id: articleId
        }
    });
}

export function getAllArticle(env, pageNumber, pageSize) {
    return env.$axios({
        method: 'GET',
        url: '/articles/client',
        params: {
            pageNumber,
            pageSize
        }
    });
}

export function likeArticle(env, articleId, like = true) {
    return env.$axios({
        method: 'PUT',
        url: '/article/like',
        params: {
            id: articleId,
            doLike: like
        }
    });
}
