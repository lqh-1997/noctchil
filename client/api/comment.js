export function createComment(env, commentInfo) {
    return env.$axios({
        method: 'POST',
        url: '/comment',
        data: commentInfo
    });
}

export function getCommentsByArticleId(env, articleId) {
    return env.$axios({
        method: 'GET',
        url: `/comments/article/${articleId}`
    });
}

export function likeComment(env, commentId, like = true) {
    return env.$axios({
        method: 'PUT',
        url: '/comment/like',
        params: {
            id: commentId,
            doLike: like
        }
    });
}

export function getLatestComment(env, number) {
    return env.$axios({
        method: 'GET',
        url: '/comments/latest',
        params: {
            number
        }
    });
}
