import { Model, Document } from 'mongoose';
import { Pagination } from 'src/types/global';

/**
 * 获取分页数据
 * @param model
 * @param pageSize
 * @param pageNumber
 * @param option 筛选选项 https://mongoosejs.com/docs/api.html#model_Model.find
 */
export async function getPagination<T extends Document>(
    model: Model<T>,
    pageSize: number,
    pageNumber: number,
    option: Record<string, unknown>
): Promise<Pagination<T>> {
    const result: Pagination<T> = {
        total: 0,
        data: []
    };

    result.total = await model.find(option as any).countDocuments();
    result.data = await model
        .find(option as any)
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);

    return result;
}

export function htmlToBriefContent(content: string, len = 100) {
    content = content
        .replace(/<.*?>/g, '')
        .replace(/[^a-z0-9\u4e00-\u9fa5]/, '')
        .substring(0, len);
    if (content.length === len) {
        content = content + '...';
    }
    return content;
}
