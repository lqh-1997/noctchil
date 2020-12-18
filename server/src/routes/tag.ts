import type { DefaultState, Context } from 'koa';

import * as Router from 'koa-router';

import Tag from '../models/tag';
import Article from '../models/article';
import isAdmin from '../middlewares/isAdmin';
import { SuccessModule, ErrorModule } from '../util/resModel';
import { createRandomColor } from '../util/createHelper';
import { Schema } from 'mongoose';

const router = new Router<DefaultState, Context>();

router.prefix('/api');

async function tagHasDependence(tag: Schema.Types.ObjectId): Promise<boolean> {
    const res = await Article.find({ tags: { $elemMatch: { $eq: tag } } });
    return res.length !== 0;
}

/**
 * @api {get} /tags 查询标签
 * @apiName getTags
 * @apiGroup Tag
 */
router.get('/tags', async (ctx) => {
    try {
        const res = await Tag.find({}, '-article');
        ctx.body = new SuccessModule('查询成功', res);
    } catch (err) {
        ctx.body = new ErrorModule(err);
    }
});

/**
 * @api {post} /tag 新增标签
 * @apiName addTag
 * @apiGroup Tag
 * @apiParam {Object} Tag 通过body传递过来标签对象
 * @apiParam {String} Tag[name] 标签名
 * @apiParam {String} Tag[color] 标签颜色
 */
router.post('/tag', isAdmin, async (ctx) => {
    let { color } = ctx.request.body;
    const { name } = ctx.request.body;
    try {
        if (!color) {
            color = createRandomColor(true);
        }
        const tag = new Tag({
            color,
            name
        });
        const newTag = await tag.save();
        ctx.body = new SuccessModule('创建成功', newTag._id);
    } catch (err) {
        ctx.body = new ErrorModule(err);
    }
});

/**
 * @api {delete} /tag 删除标签
 * @apiName deleteTag
 * @apiGroup Tag
 * @apiParam {String} [id] 标签id
 */
router.delete('/tag', isAdmin, async (ctx) => {
    const { id } = ctx.request.body;
    try {
        const res = await Tag.findById(id);
        if (!res) {
            throw '不存在该tag';
        }
        if (await tagHasDependence(id)) {
            throw '标签存在依赖文章';
        }
        await Tag.findByIdAndDelete(id);
        ctx.body = new SuccessModule('删除成功');
    } catch (err) {
        ctx.body = new ErrorModule(err);
    }
});

export default router;
