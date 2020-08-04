import { Schema, model, Document } from 'mongoose';
import { UserDocument } from './user';

const fileSchema = new Schema({
    createTime: { type: Date, default: new Date(), required: true, index: true },
    title: { type: String, required: true },
    path: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User' }
});

export interface FileDocument extends Document {
    _id: Schema.Types.ObjectId;
    createTime: Date;
    title: string;
    path: string;
    type: string;
    creator: UserDocument;
}

export default model<FileDocument>('File', fileSchema);
