import { Schema, model, Document } from 'mongoose';
import { UserDocument } from './user';
import { ArticleDocument } from './article';

const commentSchema = new Schema({
    content: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createTime: { type: Date, default: new Date(), required: true },
    likes: { type: Number, default: 0, required: true },
    father: {
        type: { type: String, default: 'article', required: true },
        id: { type: Schema.Types.ObjectId, ref: 'Article' || 'Comments', required: true }
    }
});

export interface CommentDocument extends Document {
    _id: Schema.Types.ObjectId;
    // 内容
    content: string;
    // 创建时间
    createTime: Date;
    // 点赞数
    likes: number;
    // 父节点
    father: {
        type: string;
        id: Schema.Types.ObjectId;
    };
}

export default model<CommentDocument>('Comment', commentSchema);
