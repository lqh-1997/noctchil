import { getRandom } from './utils';

/**
 *
 * @param dark 是否为深色模式
 * @param light 是否为浅色模式
 */
export function createRandomColor(dark = false, light = false): string {
    let r: string | number = parseInt((getRandom(0, 256) as unknown) as string);
    let g: string | number = parseInt((getRandom(0, 256) as unknown) as string);
    let b: string | number = parseInt((getRandom(0, 256) as unknown) as string);
    if (dark && r > 200 && g > 200 && b > 200) {
        return createRandomColor(true);
    }
    if (light && r < 50 && g < 50 && b < 50) {
        return createRandomColor(false, true);
    }
    return ('#' + getFullString(r) + getFullString(g) + getFullString(b)).toUpperCase();
}

/**
 * 将数字转成16进制 1位的补零在前面
 * @param num 输入的数字(0- 255)
 */
function getFullString(num: number) {
    let str = num.toString(16);
    if (str.length === 1) {
        str = '0' + str;
    }
    return str;
}
