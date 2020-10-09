import * as Router from 'koa-router';
import * as multer from '@koa/multer';
import { DefaultContext, Context } from 'koa';
import { errorCapture } from '../util/error';
import { SuccessModule, ErrorModule } from '../util/resModel';
import { FileDocument } from '../models/file';
import { getAllImage, createFolder } from '../util/fileUtils';
import { fileDir } from '../config/global';
import * as mongoose from 'mongoose';
import fs = require('fs');
import path = require('path');

const router = new Router<DefaultContext, Context>();

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

// 上传图片
router.post('/photo', upload.single('avatar'), async (ctx: DefaultContext) => {
    const { file } = ctx.request;
    if (file) {
        ctx.body = new SuccessModule('上传成功');
    } else {
        ctx.body = new ErrorModule('上传失败');
    }
});

// 获取某个目录下的所有图片(只包含指定文件夹)
router.get('/photos', async (ctx) => {
    const readDir = getAllImage(fileDir);
    ctx.body = new SuccessModule('获取成功', readDir);
});

export default router;
