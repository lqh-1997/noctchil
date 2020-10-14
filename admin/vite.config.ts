import type { UserConfig } from 'vite';
import { resolve } from 'path';

const pathResolve = function (dir: string) {
    return resolve(__dirname, dir);
};

const viteConfig: UserConfig = {
    // 端口号
    port: 8999,
    // 浏览器
    open: false,
    // 别名
    alias: {
        '/@/': pathResolve('src')
    },
    // 本地代理
    proxy: {
        '/api': {
            target: 'http://localhost:8000'
        }
    }
};

export default viteConfig;
