import { logger } from '../config/logger';
import { Context } from 'koa';

export default async (ctx: Context, next: Function) => {
    const start = Date.now();
    const id = (ctx.session && ctx.session.userId) || 0;
    await next();
    const ms = Date.now() - start;
    // const ip = ctx.request.ip;
    // console.log(ip);
    logger.info(`${ctx.method} ${ctx.url} - ${ms}ms ${ctx.response.status} - by ${id}`);
};
