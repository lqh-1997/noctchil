import { Schema, model, Document } from 'mongoose';
import { UserDocument } from './user';

const articleSchema = new Schema({
    createTime: { type: Date, default: new Date(), required: true, index: true },
    title: { type: String, required: true, unique: true },
    content: String,
    type: { type: String, enum: ['paragraph', 'article'], required: true, default: 'article' },
    tag: { type: [String] },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    private: { type: Boolean, default: false, required: true }
});

export interface ArticleDocument extends Document {
    _id: Schema.Types.ObjectId;
    title: string;
    createTime: Date;
    content: string;
    type: string;
    tag: [string];
    creator: UserDocument;
    private: Boolean;
}

export default model<ArticleDocument>('Article', articleSchema);
