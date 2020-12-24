import type { DefaultContext, Context } from 'koa';

import * as Router from 'koa-router';
import * as multer from '@koa/multer';

import { SuccessModule, ErrorModule } from '../util/resModel';
import { getAllImage, createFolder, isImage } from '../util/fileUtils';
import { fileDir } from '../config/global';

const router = new Router<DefaultContext, Context>();

// 使用multer实现写入本地
const storage = multer.diskStorage({
    destination: function (_req, file, cb) {
        // config中的path加上前端传递过来的fieldname
        const path = `${fileDir}/${file.fieldname}`;
        // 如果不存在就创建新文件夹
        createFolder(path);
        cb(null, path);
    },
    filename: function (_req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

// 头像上传方式 限定大小 只能单个传 只能传图片
const avatarUpload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        isImage(file.originalname) ? cb(null, true) : cb(new Error('仅支持图片类型'), false);
    }
});
const upload = multer({ storage });

router.prefix('/api');

// 上传头像 存放位置为'/static/avatar'下面 服务器ip地址+位置 就可以访问到了
router.post('/image/avatar', avatarUpload.single('avatar'), async (ctx: DefaultContext) => {
    const { file } = ctx.request;
    if (file) {
        ctx.body = new SuccessModule('上传成功', file);
    } else {
        ctx.body = new ErrorModule('上传失败');
    }
});

// 上传图片
router.post('/image', upload.single('image'), async (ctx: DefaultContext) => {
    const { file } = ctx.request;
    if (file) {
        ctx.body = new SuccessModule('上传成功', file);
    } else {
        ctx.body = new ErrorModule('上传失败');
    }
});

// 获取某个目录下的所有图片(只包含指定文件夹)
router.get('/images', async (ctx) => {
    const readDir = getAllImage(fileDir);
    ctx.body = new SuccessModule('获取成功', readDir);
});

export default router;
