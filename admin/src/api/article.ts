import service from '../utils/request';
import type { ArticleType, ArticleState } from '/@/types/instance.d.ts';

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
