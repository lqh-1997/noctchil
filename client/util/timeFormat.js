/**
 * 时间戳变时间(YY-MM-DD hh:mm:ss)格式
 * @param timestamp
 * @returns {string}
 */
export function timestampToTime(timestamp) {
    const date = new Date(timestamp);
    const Y = date.getFullYear() + '-';
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
}

/**
 * 获取该月份第一秒
 * @param timestamp
 * @returns {Date}
 */
export function getFirstDayOfMonth(timestamp) {
    const date = new Date(timestamp);
    date.setDate(1);
    date.setHours(0);
    date.setSeconds(0);
    date.setMinutes(0);
    return new Date(timestampToTime(date.getTime()));
}

/**
 * 获取某天的第一秒
 * @param timestamp
 * @returns {String}
 */
export function getFirstSecondOfDay(timestamp) {
    const date = new Date(timestamp);
    date.setHours(0);
    date.setSeconds(0);
    date.setMinutes(0);
    return timestampToTime(date.getTime());
}

/**
 * 获取某天的最后一秒
 * @param timestamp
 * @returns {String}
 */
export function getLastSecondOfDay(timestamp) {
    const date = new Date(timestamp);
    date.setHours(23);
    date.setSeconds(59);
    date.setMinutes(59);
    return timestampToTime(date.getTime());
}

/**
 * 将数据库传来的时间转换成(YY-MM-DD hh:mm:ss)格式
 * @param time
 * @returns {*}
 */
export function timeFromDbToTime(time) {
    return time.replace('T', ' ').replace(/\.[0-9a-zA-Z]*$/, '');
}

/**
 * 获取上N个月的第一秒
 * 例子: getLastNMonthAndFirstSecond(4) 1月就获取上一年10月的第一秒 4月就获取当年的一月的第一秒
 * @param month *代表上个月
 * @param date 可选择传入的时间
 * @returns {Date}
 */
export function getLastNMonthAndFirstSecond(month, date) {
    date = date || new Date();
    const year = Math.floor(month / 12);
    const sub = date.getMonth() - (month - year * 12) + 2;
    if (sub >= 1) {
        date.setMonth(sub - 1);
        date.setFullYear(date.getFullYear() - year);
        return getFirstDayOfMonth(date);
    } else {
        date.setFullYear(date.getFullYear() - 1 - year);
        date.setMonth(11 + sub);
        return getFirstDayOfMonth(date);
    }
}
