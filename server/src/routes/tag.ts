import type { DefaultState, Context } from 'koa';

import * as Router from 'koa-router';

import Tag from '../models/tag';
import isAdmin from '../middlewares/isAdmin';
import { Schema } from 'mongoose';
import { SuccessModule, ErrorModule } from '../util/resModel';
import { createRandomColor } from '../util/createHelper';

const router = new Router<DefaultState, Context>();

router.prefix('/api');

/**
 * 跟随文章的变化更新tag
 * @param tagId
 * @param articleId
 * @param add true就是添加tag false就是删除tag
 */
export async function updateTag(
    tagId: Schema.Types.ObjectId,
    articleId: Schema.Types.ObjectId,
    add = true
) {
    const res = await Tag.findOne({ _id: tagId });
    if (!res) {
        return;
    }
    const article = res.article;
    if (add) {
        // 不存在当前文章id 则添加tag
        if (article.indexOf(articleId) === -1) {
            article.push(articleId);
        }
    } else {
        // 存在当前文章id 则删除tag
        const index = article.indexOf(articleId);
        if (index !== -1) {
            article.splice(index, 1);
        }
    }
    await Tag.findOneAndUpdate(
        { _id: tagId },
        {
            article
        },
        {
            omitUndefined: true,
            runValidators: true
        }
    );
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
        await tag.save();
        ctx.body = new SuccessModule('创建成功');
    } catch (err) {
        ctx.body = new ErrorModule(err);
    }
});

/**
 * @api {delete} /tag 删除标签
 * @apiName deleteTag
 * @apiGroup Tag
 * @apiParam {Object} Tag 通过body传递过来标签对象
 * @apiParam {String} Tag[id] 标签id
 */
router.delete('/tag', isAdmin, async (ctx) => {
    const { id } = ctx.request.query;
    try {
        const res = await Tag.findById(id);
        if (!res) {
            throw '不存在该tag';
        }
        // FIXME 什么傻吊错误 我吐了
        // @ts-ignore
        if (res.article.length !== 0) {
            // 有依赖的文章就不给删
            throw '该tag有依赖的文章，无法删除';
        }
        await Tag.findByIdAndDelete(id);
        ctx.body = new SuccessModule('删除成功');
    } catch (err) {
        ctx.body = new ErrorModule(err);
    }
});

export default router;
