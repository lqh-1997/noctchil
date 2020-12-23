import service from '../utils/request';

export function uploadAvatar(file: FormData, onProgress?: (progressEvent: any) => void) {
    return service({
        method: 'POST',
        url: '/image/avatar',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: file,
        onUploadProgress: onProgress
    });
}
