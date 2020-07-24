import { Context } from 'koa';
import { ErrorModule } from '../util/resModel';

export default async (ctx: Context, next: Function) => {
    if (ctx.session && !ctx.session.isAdmin) {
        ctx.body = new ErrorModule('权限不足');
        return;
    }
    await next();
};
