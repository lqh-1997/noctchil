import { Schema, model, Document } from 'mongoose';

const userSchema = new Schema({
    username: { type: String, trim: true, unique: true, index: true, required: true },
    password: { type: String, select: false },
    nicename: String,
    salt: String,
    avatar: String,
    email: String,
    url: String,
    status: { type: Boolean, default: false, required: true },
    last_login_time: Date,
    valid: { type: Boolean, default: false, required: true },
    is_registry: { type: Boolean, default: false, required: true }
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
    last_login_time: Date;
    valid: boolean;
    is_registry: boolean;
}

export default model('User', userSchema);
