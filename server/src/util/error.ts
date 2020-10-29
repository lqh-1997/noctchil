/**
 * 代替async的try和catch
 * @param that 方法this指向
 * @param asyncFunction 调用的方法
 * @param args 方法的多余参数
 */
export async function errorCapture(that: any, asyncFunction: Function, ...args: any) {
	try {
		const res = await asyncFunction.apply(that, args);
		return [null, res];
	} catch (e) {
		return [e, null];
	}
}
