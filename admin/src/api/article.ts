import service from '../utils/request';
import type { ArticleType, ArticleState, Article } from '/@/types/instance.d.ts';

export function getArticle(
    pageNumber: number,
    pageSize: number,
    type: ArticleType,
    state: ArticleState,
    invisible: boolean
) {
    return service({
        url: '/articles/admin',
        method: 'get',
        params: {
            pageNumber,
            pageSize,
            type,
            state,
            invisible
        }
    });
}

export function createArticle(article: Article) {
    return service({
        url: '/article',
        method: 'post',
        data: article
    });
}
