import { globalSetting } from '../config/global';
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

export function deepClone<T extends {}>(obj: T): T {
    if (typeof obj !== 'object') {
        return obj;
    }

    const newObj: any = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] =
                typeof obj[key] === 'object'
                    ? obj[key] === null
                        ? null
                        : deepClone(obj[key])
                    : obj[key];
        }
    }
    return newObj;
}

export function isDevMode() {
    return process.env.NODE_ENV === 'development';
}

export function getServerIp() {
    return (function () {
        return isDevMode() ? globalSetting.devServerIp : globalSetting.prodServerIp;
    })();
}
