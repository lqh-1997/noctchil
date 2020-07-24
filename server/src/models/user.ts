import { Schema, model, Document } from 'mongoose';

const userSchema = new Schema({
    username: { type: String, trim: true, unique: true, index: true, required: true },
    password: { type: String, select: false },
    nicename: String,
    salt: { type: String, select: false },
    avatar: String,
    email: String,
    url: String,
    status: { type: Boolean, default: false, required: true },
    last_login_time: { type: Date, default: new Date() },
    valid: { type: Boolean, default: true, required: true, select: false },
    isAdmin: { type: Boolean, default: false }
});

export interface UserDocument extends Document {
    _id: Schema.Types.ObjectId;
    username: string;
    nicename: string;
    salt: string;
    avatar: string;
    email: string;
    url: string;
    status: boolean;
    isAdmin: boolean;
    last_login_time: Date;
    valid: boolean;
}

export default model<UserDocument>('User', userSchema);
