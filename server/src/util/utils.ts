/**
 * 生成随机数 左开右闭
 * @param a 左边最小值
 * @param b 右边最大值
 */
export function getRandom(a: number, b: number): number {
    return Math.random() * (b - a) + a;
}
