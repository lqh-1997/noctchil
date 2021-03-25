/**
 * 生成随机数 左开右闭
 * @param a 左边最小值
 * @param b 右边最大值
 */
export function getRandom(a: number, b: number): number {
    return Math.random() * (b - a) + a;
}

/**
 * 判断是不是string类型
 * @param str
 */
export function isString(str: any): boolean {
    if (typeof str === 'string' || str instanceof String) {
        return true;
    }
    return false;
}

export function isNumber(str: any): boolean {
    if (typeof str === 'number' || str instanceof Number) {
        return true;
    }
    return false;
}
