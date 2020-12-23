import { Context } from 'koa';
import { ErrorModule } from '../util/resModel';

export default function catchError() {
    return async (ctx: Context, next: Function) => {
        try {
            await next();
        } catch (err) {
            ctx.status = err.statusCode || err.status || 500;
            ctx.body = new ErrorModule(err);
        }
    };
}
