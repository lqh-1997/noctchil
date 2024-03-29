export interface ViteEnv {
    VITE_PORT?: number;
    VITE_SERVER_SITE?: string;
}

/**
 * 获取环境文件中的常量
 * @param envConf
 * @returns
 */
export function wrapperEnv(envConf: any): ViteEnv {
    const ret: ViteEnv = {};

    for (const envName of Object.keys(envConf)) {
        let realName = envConf[envName].replace(/\\n/g, '\n');
        realName = realName === 'true' ? true : realName === 'false' ? false : realName;
        if (envName === 'VITE_PORT') {
            realName = Number(realName);
        }
        if (envName === 'VITE_PROXY') {
            try {
                realName = JSON.parse(realName);
            } catch (err) {}
        }
        ret[envName] = realName;
        process.env[envName] = realName;
    }

    return ret;
}
