import fs = require('fs');

/**
 * 递归获取某个目录下的所有文件
 * @param path 文件路径 后面不要带'/'
 * @param pre 递归时使用 调用时并不需要传递或者传递默认值'/'
 * @returns {Array[string]} 不包含path的文件夹下所有文件数组
 */
export function getAllFile(path: string, pre = '/'): string[] {
    let files = fs.readdirSync(path);
    let res: string[] = [];
    files = files.filter((item) => {
        // 获取文件路径
        const doc = path + '/' + item;
        // 利用statSync判断是不是文件夹 递归循环的入口 如果是文件夹则从数组中去掉该行
        if (fs.statSync(doc).isDirectory()) {
            // 如果有多个文件夹则将返回值全部concat到res里面
            res = [...getAllFile(doc, item + '/'), ...res];
            return false;
        }
        return true;
    });
    // 合并当前的以及递归得到的
    res = [...files, ...res];
    // 给路径加上当前的路径前缀
    res = res.map((item) => {
        return pre + item;
    });
    return res;
}

/**
 * 获取某个文件夹下面的所有图片
 * @param path 文件路径 后面不要带'/'
 * @return {Array[string]} 不包含path的文件夹下所有图片数组
 */
export function getAllImage(path: string): string[] {
    const files = getAllFile(path);
    return files.filter((item) => /(.png|.jpg|.gif|.jpeg|.webp)$/.test(item));
}

/**
 * 判断文件夹是否存在 若不存在则新建文件夹
 * @param path
 */
export function createFolder(path: string): void {
    let exist = false;
    // 可以传递三个参数 http://nodejs.cn/api/fs.html#fs_fs_access_path_mode_callback 第二个可选
    // 第三个为回调 若err不存在则代表文件存在
    fs.access(path, (err) => {
        exist = !err;
    });
    if (!exist) {
        fs.mkdir(path, { recursive: true }, (err) => {
            if (err) throw err;
        });
    }
}

/**
 * 判断文件是否是图片类型
 * @param name 文件名称
 */
export function isImage(name: string): boolean {
    const typeList = ['webp', 'jpeg', 'png', 'gif', 'jpg'];
    const dot = name.indexOf('.');
    const suffix = name.substring(dot + 1).toLowerCase();
    return typeList.indexOf(suffix) !== -1;
}

// export function createFile(path: string) {
//     const index = path.lastIndexOf('\\');
//     createFolder(path.slice(0, index));
// }
