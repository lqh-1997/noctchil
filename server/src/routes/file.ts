import * as Router from 'koa-router';
import * as multer from '@koa/multer';
import { DefaultContext, Context } from 'koa';
import { SuccessModule, ErrorModule } from '../util/resModel';
import { FileDocument } from '../models/file';
import * as mongoose from 'mongoose';

const router = new Router<DefaultContext, Context>();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `/uploads/${file.fieldname}`);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });

router.prefix('/api');

router.post('/photos', upload.single('avatar'), async (ctx: DefaultContext) => {
    const { file } = ctx.request;
    console.log(ctx.request.file);
    if (file) {
        ctx.body = new SuccessModule('上传成功');
    } else {
        ctx.body = new ErrorModule('上传失败');
    }
});

export = router;
