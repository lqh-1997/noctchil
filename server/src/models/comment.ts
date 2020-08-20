import { Schema, model, Document } from 'mongoose';
import { UserDocument } from './user';
import { ArticleDocument } from './article';

const commentSchema = new Schema({
    content: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createTime: { type: Date, default: new Date(), required: true },
    likes: { type: Number, default: 0, required: true },
    from: { type: Schema.Types.ObjectId, ref: 'Article', required: true }
});

export interface CommentDocument extends Document {
    _id: Schema.Types.ObjectId;
    // 内容
    content: string;
    // 创建者
    creator: Schema.Types.ObjectId;
    // 创建时间
    createTime: Date;
    // 点赞数
    likes: number;
    // 被评论的文章id
    from: Schema.Types.ObjectId;
}

export default model<CommentDocument>('Comment', commentSchema);
