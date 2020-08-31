import { Context } from 'koa';
import { ErrorModule } from '../util/resModel';

export default function catchError() {
    return async (ctx: Context, next: Function) => {
        try {
            await next();
        } catch (err) {
            ctx.body = new ErrorModule(err);
        }
    };
}
