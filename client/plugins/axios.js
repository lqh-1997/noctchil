import { Message } from 'element-ui';
export default function ({ $axios, redirect }) {
    $axios.onRequest((config) => {
        console.log('Making request to ' + config.url);
    });

    $axios.onError((err) => {
        Message({
            message: err || '请求错误',
            type: 'error'
        });
        return Promise.reject(err);
    });

    $axios.onResponse((res) => {
        if (res.data.code < 0) {
            Message({
                message: res.data.message || '请求错误',
                type: 'error'
            });
            return Promise.reject(res.data.message);
        }
        return res;
    });
}
