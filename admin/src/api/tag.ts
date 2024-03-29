import service from '../utils/request';
import type { Tag } from '../types/instance';

export function getTag() {
    return service({
        method: 'GET',
        url: '/tags'
    });
}

export function addTag(data: Tag) {
    return service({
        method: 'POST',
        url: '/tag',
        data
    });
}

export function deleteTag(id: string) {
    return service({
        method: 'DELETE',
        url: '/tag',
        data: {
            id
        }
    });
}
