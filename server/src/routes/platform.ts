import type { DefaultState, Context } from 'koa';

import * as Router from 'koa-router';

import PlatForm from '../models/platform';
import isAdmin from '../middlewares/isAdmin';
import { SuccessModule, ErrorModule } from '../util/resModel';

const router = new Router<DefaultState, Context>();

router.prefix('/api');

// 博客中头部菜单栏的配置
router.put('/platform/headerMenu', isAdmin, async (ctx) => {
    const { headerMenu } = ctx.request.body;
    try {
        const res = await PlatForm.updateOne(
            {},
            {
                headerMenu
            },
            {
                upsert: true,
                omitUndefined: true,
                setDefaultsOnInsert: true
            }
        );
        ctx.body = new SuccessModule('修改成功');
    } catch (err) {
        ctx.body = new ErrorModule(err);
    }
});

// 查找博客中头部菜单栏的配置
router.get('/platform/headerMenu', async (ctx) => {
    try {
        const res: any = await PlatForm.findOne({});
        if (res) {
            ctx.body = new SuccessModule('查找成功', res.headerMenu);
        } else {
            ctx.body = new SuccessModule('查找成功', [
                {
                    name: '主页',
                    url: '/home',
                    target: '_self'
                }
            ]);
        }
    } catch (err) {
        ctx.body = new ErrorModule(err);
    }
});

export default router;
