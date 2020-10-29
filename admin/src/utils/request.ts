import axios from 'axios';
import { message } from 'ant-design-vue';

const service = axios.create({
    baseURL: '/api/',
    timeout: 5000
});

service.interceptors.response.use(
    (res) => {
        if (res.data.code > 0) {
            return res;
        } else {
            message.error(res.data.message);
            return Promise.reject(res.data.message);
        }
    },
    (err) => {
        message.error(err.message);
        return Promise.reject(err.message);
    }
);

export default service;
