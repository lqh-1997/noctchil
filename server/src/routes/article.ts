import type { DefaultState, Context } from 'koa';
import type { ArticleDocument } from '../models/article';

import * as Router from 'koa-router';
import * as mongoose from 'mongoose';

import Article from '../models/article';
import isAdmin from '../middlewares/isAdmin';
import { SuccessModule, ErrorModule } from '../util/resModel';
import { getPagination } from 'src/util/dbHelper';

const { ObjectId } = mongoose.Types;
const router = new Router<DefaultState, Context>();

router.prefix('/api');

/**
 * @api {post} /article 新建文章
 * @apiName GetArticle
 * @apiGroup Article
 *
 */
router.post('/article', isAdmin, async (ctx) => {
	const { title, desc, content, type, state, tag, invisible } = ctx.request.body;
	try {
		let article = await Article.findOne({ title });
		if (article) {
			ctx.body = new ErrorModule('文章名已存在');
			return;
		}
		if (!title) {
			ctx.body = new ErrorModule('文章标题不得为空');
			return;
		}
		article = new Article({
			title,
			desc,
			content,
			type,
			state,
			tag,
			invisible,
			creator: ctx.session && ctx.session.userId
		});
		await article.save();
	} catch (err) {
		ctx.body = new ErrorModule(err);
		return;
	}
	ctx.body = new SuccessModule('文章创建成功');
});


/**
 * @api {put} /article 更新文章
 */
router.put('/article', isAdmin, async (ctx) => {
	const { id, title, desc, content, type, state, tag, invisible } = ctx.request.body;
	if (!title) {
		ctx.body = new ErrorModule('文章标题不得为空');
		return;
	}
	let res: null | ArticleDocument = null;
	// 防止id输入错误
	try {
		res = await Article.findByIdAndUpdate(id, {
			title,
			desc,
			content,
			type,
			state,
			tag,
			invisible,
			updateTime: new Date()
		});
	} catch (err) {
		ctx.body = new ErrorModule(err);
	}
	// 判定是否修改
	res ? (ctx.body = new SuccessModule('修改成功')) : (ctx.body = new ErrorModule('修改失败'));
});

// 获取单个文章，同时使文章查看数目+1
router.get('/article', async (ctx) => {
	const { id } = ctx.request.query;
	if (!ObjectId.isValid(id)) {
		ctx.body = new ErrorModule('请输入合法id');
		return;
	}
	let res = null;
	try {
		res = await Article.findById(id);
	} catch (err) {
		ctx.body = new ErrorModule(err);
		return;
	}
	if (res) {
		const { meta } = res;
		meta.views++;
		try {
			await Article.findByIdAndUpdate(id, {
				meta: meta
			});
		} catch {}
		ctx.body = new SuccessModule('查询成功', res);
	} else {
		ctx.body = new ErrorModule('文章不存在');
	}
});

// 分页查找所有文章信息 前台使用 不能查找草稿类型的以及隐藏类型的
router.get('/articles', async (ctx) => {
	// 先将筛选条件设置为发布类和非隐藏类
	const option: any = {
		state: 'publish',
		invisible: false
	};
	try {
		// 用户传入pageSize pageNumber 和type
		const pageSize = parseInt(ctx.request.query.pageSize);
		const pageNumber = parseInt(ctx.request.query.pageNumber);
		const { type } = ctx.request.query;
		type && (option.type = type);

		const res = await getPagination(Article, pageSize, pageNumber, option);
		ctx.body = res;
	} catch (err) {
		ctx.body = new ErrorModule(err);
	}
});

// 分页查找所有文章信息 后台使用 管理员权限
router.get('/articles/admin', isAdmin, async (ctx) => {
	const option: any = {};
	try {
		// 用户传入pageSize pageNumber 和type
		const pageSize = parseInt(ctx.request.query.pageSize);
		const pageNumber = parseInt(ctx.request.query.pageNumber);
		const { type, state, invisible } = ctx.request.query;
		type && (option.type = type);
		state && (option.state = state);
		invisible && (option.invisible = invisible);

		const res = await getPagination(Article, pageSize, pageNumber, option);
		ctx.body = res;
	} catch (err) {
		ctx.body = new ErrorModule(err);
	}
});

// 给文章点赞/取消点赞 由doLike决定
router.put('/article/like', async (ctx) => {
	let { id, doLike = true } = ctx.request.query;
	doLike = JSON.parse(doLike);
	let res = null;
	try {
		res = await Article.findById(id);
	} catch (err) {
		ctx.body = new ErrorModule(err);
		return;
	}
	if (res) {
		const { meta } = res;
		doLike ? meta.likes++ : meta.likes--;
		try {
			await Article.findByIdAndUpdate(id, {
				meta: meta
			});
		} catch (err) {
			ctx.body = new ErrorModule(err);
			return;
		}
		ctx.body = doLike ? new SuccessModule('点赞成功') : new SuccessModule('取消成功');
	} else {
		ctx.body = new ErrorModule('文章不存在');
	}
});

export default router;
