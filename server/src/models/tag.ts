import { Schema, model, Document } from 'mongoose';
import { ArticleDocument } from './article';

const tagSchema = new Schema({
    name: { type: String, unique: true, index: true, required: true },
    article: { type: [Schema.Types.ObjectId], ref: 'Article' },
    color: { type: String, default: '#000' }
});

export interface TagDocument extends Document {
    _id: Schema.Types.ObjectId;
    name: string;
    article: [ArticleDocument | Schema.Types.ObjectId];
    color: string;
}

export default model<TagDocument>('Tag', tagSchema);
