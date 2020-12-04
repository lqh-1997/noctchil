// 用来配置整个应用的全局设置 数据库中应该只有一条记录 只有管理员能够操作
import { Schema, model, Document } from 'mongoose';

export type linkJumpType = '_blank' | '_self';

const subMenuItem = new Schema({
    name: { type: String, require: true, default: '占坑' },
    url: { type: String, default: '#' },
    target: { type: String, enum: ['_blank', '_self'], default: '_self' }
});
const menuItem = new Schema({
    name: { type: String, require: true, default: '占坑' },
    url: { type: String, default: '#' },
    target: { type: String, enum: ['_blank', '_self'], default: '_self' },
    children: [subMenuItem]
});

const platformSchema = new Schema({
    headerMenu: [menuItem]
});

export interface PlatformDocument extends Document {
    _id: Schema.Types.ObjectId;
    headerMenu: [
        {
            name?: string;
            url?: string;
            target?: linkJumpType;
            children?: [
                {
                    name: string;
                    url?: string;
                    target?: linkJumpType;
                }
            ];
        }
    ];
}

export default model<PlatformDocument>('Platform', platformSchema);
