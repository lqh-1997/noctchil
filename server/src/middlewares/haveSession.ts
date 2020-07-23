import { Context } from 'koa';

export default async (ctx: Context, next: Function) => {
    if (ctx.session && !ctx.session.userId) {
        ctx.session.userId = 0;
    }
    await next();
};
