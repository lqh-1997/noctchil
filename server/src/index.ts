import * as Koa from 'koa';
import * as bodyparser from 'koa-bodyparser';

import * as mongoose from 'mongoose';
import { REDIS_CONF, MONGO_CONF } from './config/db';

import * as session from 'koa-session';
import * as redisStore from 'koa-redis';
import * as user from './routes/user';

const app = new Koa();

app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text']
    })
);

app.keys = ['EagI_$%d42'];
app.use(
    session(
        {
            path: '/',
            httpOnly: false,
            // session的有效时间
            maxAge: 60 * 60 * 24 * 1000,
            // 每次响应的时候刷新expire的有效期
            rolling: true,
            store: redisStore({
                port: REDIS_CONF.port,
                host: REDIS_CONF.host
            })
        },
        app
    )
);

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(MONGO_CONF.getDbs(), {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(user.routes());
app.use(user.allowedMethods());

export = app;
