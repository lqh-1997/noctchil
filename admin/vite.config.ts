import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { getServerIp } from './src/utils/helper';

const pathResolve = function (dir: string) {
    return resolve(__dirname, dir);
};

export default defineConfig({
    plugins: [vue()],
    // 别名
    alias: {
        '/@': pathResolve('src')
    },
    // 配置Dep优化行为
    // 会使用 rollup 对 包重新编译，将编译成符合 esm 模块规范的新的包放入 node_modules 下的 .
    optimizeDeps: {
        include: ['echarts', 'echarts/map/js/china']
    },
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: {
                    'primary-color': '#5d5bff',
                    'link-color': '#5d5bff',
                    'border-radius-base': '2px'
                },
                javascriptEnabled: true
            }
        }
    },
    server: {
        // 端口号
        port: 8999,
        // 浏览器
        open: false,
        // 本地代理
        proxy: {
            '/api': {
                target: getServerIp()
            }
        }
    }
});
