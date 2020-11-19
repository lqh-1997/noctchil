import service from '../utils/request';
import { HeaderMenu } from '/@/types/instance';

export function getHeaderMenu() {
    return service({
        url: '/platform/headerMenu',
        method: 'GET'
    });
}

export function updateHeaderMenu(headerMenu: HeaderMenu) {
    return service({
        url: '/platform/headerMenu',
        method: 'PUT',
        data: {
            headerMenu
        }
    });
}
