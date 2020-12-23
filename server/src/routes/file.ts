import type { DefaultContext, Context } from 'koa';

import * as Router from 'koa-router';
import * as multer from '@koa/multer';

import fs = require('fs');
import path = require('path');

import { SuccessModule, ErrorModule } from '../util/resModel';
import { getAllImage, createFolder } from '../util/fileUtils';
import { fileDir } from '../config/global';

const router = new Router<DefaultContext, Context>();

// 使用multer实现写入本地
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = `${fileDir}/${file.fieldname}`;
        createFolder(path);
        cb(null, path);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });

router.prefix('/api');

// 上传头像 存放位置为'/static/avatar'下面 服务器ip地址+位置 就可以访问到了
router.post('/image/avatar', upload.single('avatar'), async (ctx: DefaultContext) => {
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
