import { Schema, model, Document } from 'mongoose';

const userSchema = new Schema({
    username: { type: String, trim: true, unique: true, index: true, required: true },
    password: { type: String, select: false },
    nicename: String,
    salt: { type: String, select: false, required: true },
    avatar: { type: String, default: '/avatar/default.webp' },
    email: String,
    url: String,
    status: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false },
    last_login_time: { type: Date, default: Date.now },
    valid: { type: Boolean, default: true, required: true, select: false }
});

export interface UserDocument extends Document {
    _id: Schema.Types.ObjectId;
    // 登录名称
    username: string;
    // 密码
    password: string;
    // 用户昵称
    nicename: string;
    // 盐
    salt: string;
    // 头像
    avatar: string;
    // 邮箱地址
    email: string;
    // 友情链接之类的(点击头像跳转)
    url: string;
    // 上线状态
    status: boolean;
    // 是否是管理员
    isAdmin: boolean;
    // 最后登录时间
    last_login_time: Date;
    // 用户信息是否有效
    valid: boolean;
}

export default model<UserDocument>('User', userSchema);
