import { Schema, model, Document } from 'mongoose';
import { UserDocument } from './user';

export type ArticleType = 'message' | 'article';
export type ArticleState = 'publish' | 'draft';

const articleSchema = new Schema({
    title: { type: String, required: true, unique: true, validate: /\S+/ },
    desc: String,
    content: String,
    type: { type: String, enum: ['message', 'article'], required: true, default: 'article' },
    state: { type: String, enum: ['publish', 'draft'], required: true, default: 'draft' },
    tags: { type: [String] },
    // comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', require: true }],
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    invisible: { type: Boolean, default: false, required: true },
    meta: {
        likes: { type: Number, default: 0, required: true },
        views: { type: Number, default: 0, required: true },
        comments: { type: Number, default: 0, required: true }
    },
    createTime: { type: Date, default: Date.now, required: true, index: true },
    updateTime: { type: Date, default: Date.now, required: true }
});

export interface ArticleDocument extends Document {
    _id: Schema.Types.ObjectId;
    // 标题
    title: string;
    // 描述
    desc: string;
    // 内容
    content: string;
    // 文章类别 分为message 和 article
    type: ArticleType;
    // 文章状态 分为 publish 和 draft
    state: ArticleState;
    // 文章标签
    tags: [string];
    // 文章评论
    // comments: [CommentDocument];
    // 创建者
    creator: UserDocument;
    // 是否要登录后才可查看
    invisible: boolean;
    // 元信息 存储数量
    meta: {
        likes: number;
        views: number;
        comments: number;
    };
    // 创建时间
    createTime: Date;
    // 更新时间
    updateTime: Date;
}

export default model<ArticleDocument>('Article', articleSchema);
