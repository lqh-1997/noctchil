export function createComment(env, commentInfo) {
    return env.$axios({
        method: 'post',
        url: '/comment',
        data: commentInfo
    });
}

export function getCommentsByArticleId(env, articleId) {
    return env.$axios({
        method: 'get',
        url: `/comments/article/${articleId}`
    });
}

export function likeComment(env, commentId, like = true) {
    return env.$axios({
        method: 'put',
        url: '/comment/like',
        params: {
            id: commentId,
            doLike: like
        }
    });
}
