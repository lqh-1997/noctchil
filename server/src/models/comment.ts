import { Schema, model, Document } from 'mongoose';
import { UserDocument } from './user';

const commentSchema = new Schema({});

export interface CommentDocument extends Document {}

export default model<CommentDocument>('Comment', commentSchema);
