import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import type { UserConfigExport } from 'vite';
import { loadEnv } from 'vite';
import { resolve } from 'path';
import { wrapperEnv } from './src/utils/vite';

const root = process.cwd();

export default ({ command, mode }): UserConfigExport => {
    const env = loadEnv(mode, root);
    const viteEnv = wrapperEnv(env);
    const { VITE_PORT, VITE_SERVER_SITE } = viteEnv;
    return {
        plugins: [vue()],
        resolve: {
            // 别名
            alias: {
                '/@': resolve(__dirname, 'src')
            }
        },
        // 配置Dep优化行为
        // 会使用 rollup 对 包重新编译，将编译成符合 esm 模块规范的新的包放入 node_modules 下的 .
        optimizeDeps: {
            include: ['echarts']
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
            },
            postcss: {
                plugins: [autoprefixer()]
            }
        },
        server: {
            port: VITE_PORT,
            strictPort: true,
            // https: true,
            open: false,
            proxy: {
                '^/api': {
                    target: VITE_SERVER_SITE,
                    changeOrigin: true
                }
            }
        },
        build: {
            sourcemap: true
        }
    };
};
