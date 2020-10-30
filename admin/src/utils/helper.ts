function debounce(fn: Function, wait: number) {
    let timer: NodeJS.Timeout;
    return function (this: any, ...rest: any[]) {
        let result: any;
        clearTimeout(timer);
        timer = setTimeout(() => {
            result = fn.apply(this, rest);
        }, wait);
        return result;
    };
}

function throttle(fn: Function, wait: number) {
    let previous: number = Date.now();

    return function (this: any, ...rest: any[]) {
        let result: any;
        if (previous > wait) {
            result = fn.apply(this, rest);
            previous = Date.now() - previous;
        }
        return result;
    };
}
