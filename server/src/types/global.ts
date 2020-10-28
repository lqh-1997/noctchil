export interface Pagination<T> {
    total: number | 0;
    data: Array<T | null>;
}
