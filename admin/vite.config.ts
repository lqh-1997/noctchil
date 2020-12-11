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
    },
    // 配置Dep优化行为
    // 会使用 rollup 对 包重新编译，将编译成符合 esm 模块规范的新的包放入 node_modules 下的 .
    optimizeDeps: {
        include: ['echarts', 'echarts/map/js/china']
    },
    cssPreprocessOptions: {
        less: {
            modifyVars: {
                'primary-color': '#5d5bff',
                'link-color': '#5d5bff',
                'border-radius-base': '2px'
            },
            javascriptEnabled: true
        }
    }
};

export default viteConfig;
