import service from '../utils/request';
import type { ArticleType, ArticleState, Article } from '/@/types/instance.d.ts';

export function getArticle(
    pageNumber: number,
    pageSize: number,
    type: ArticleType | null,
    state: ArticleState | null,
    invisible: boolean | null
) {
    return service({
        url: '/articles/admin',
        method: 'GET',
        params: {
            pageNumber,
            pageSize,
            type,
            state,
            invisible
        }
    });
}

export function getArticleById(id: string) {
    return service({
        url: '/article/admin',
        method: 'GET',
        params: {
            id
        }
    });
}

export function createArticle(article: Article) {
    return service({
        url: '/article',
        method: 'POST',
        data: article
    });
}

export function updateArticle(article: Article) {
    return service({
        url: '/article',
        method: 'PUT',
        data: article
    });
}
