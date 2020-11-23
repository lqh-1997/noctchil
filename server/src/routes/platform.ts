import type { DefaultState, Context } from 'koa';

import * as Router from 'koa-router';

import PlatForm from '../models/platform';
import isAdmin from '../middlewares/isAdmin';
import { SuccessModule, ErrorModule } from '../util/resModel';

const router = new Router<DefaultState, Context>();

router.prefix('/api');

/**
 * @api {put} /platform/headerMenu 配置头部菜单栏
 * @apiName UpdateHeaderMenu
 * @apiGroup Platform
 * @apiParam {Object} Platform 通过body传递过来配置对象
 * @apiParam {String} name 菜单名
 * @apiParam {String} [url=#] 跳转地址
 * @apiParam {String} [target=self] 跳转方式
 * @apiParam {Array} [children] 子菜单 子菜单结构同上(但是只有一级)
 */
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

/**
 * @api {get} /platform/headerMenu 获取头部菜单栏
 * @apiName GetHeaderMenu
 * @apiGroup Platform
 * @apiDescription 如果数据库中不存在记录 则会新建一个默认的
 */
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
