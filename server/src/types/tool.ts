// 将T中所有类型转换成可选
export type Partial<T> = {
    [K in keyof T]?: T[K];
};

// 将T中所有类型转换成必选
export type Required<T> = {
    [K in keyof T]-?: T[K];
};

//将T中所有类型转换成只读
export type Readonly<T> = {
    readonly [K in keyof T]: T[K];
};

// 从一个接口中挑选一些字段
// 用法 type Part = Pick<A, "a" | "b">
export type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

// 接收两个类型参数，如果T的类型在U中就将他赋值为never(剔除)
export type Exclude<T, U> = T extends U ? never : T;
// 从一个接口去除一些字段
// 用法 type Omit<A, "a" | "b">
export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// 生成键名为K 键值为T的新接口
export type Record<K extends keyof any, T> = {
    [P in K]: T;
};
