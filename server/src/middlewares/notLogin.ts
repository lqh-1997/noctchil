import { Context } from 'koa';
import { ErrorModule } from '../util/resModel';

/**
 * 用来判断用户有没有登录的中间件
 */
export default async (ctx: Context, next: Function) => {
    if (!ctx.session) {
        ctx.body = new ErrorModule('session不存在');
        return;
    }
    if (ctx.session.userId) {
        ctx.body = new ErrorModule('您已登录');
        return;
    }
    await next();
};
