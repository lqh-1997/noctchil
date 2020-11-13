// function debounce(fn: Function, wait: number) {
//     let timer: NodeJS.Timeout;
//     return function (this: any, ...rest: any[]) {
//         let result: any;
//         clearTimeout(timer);
//         timer = setTimeout(() => {
//             result = fn.apply(this, rest);
//         }, wait);
//         return result;
//     };
// }

// function throttle(fn: Function, wait: number) {
//     let previous: number = Date.now();

//     return function (this: any, ...rest: any[]) {
//         let result: any;
//         if (previous > wait) {
//             result = fn.apply(this, rest);
//             previous = Date.now() - previous;
//         }
//         return result;
//     };
// }

export function deepClone<T>(obj: T): T {
    if (typeof obj !== 'object') {
        return obj;
    }
    const newObj: any = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
        if ((obj as Object).hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
        }
    }
    return newObj;
}
