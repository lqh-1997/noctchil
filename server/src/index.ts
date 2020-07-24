import * as Koa from 'koa';
import * as bodyparser from 'koa-bodyparser';

import * as mongoose from 'mongoose';
import { REDIS_CONF, MONGO_CONF } from './config/db';

import * as session from 'koa-session';
import * as redisStore from 'koa-redis';
import * as user from './routes/user';
import * as article from './routes/article';

import haveSession from './middlewares/haveSession';

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
            key: 'noctchil_s',
            // 访问某个url时才会带上的路径，比如访问'/'时才会带上'noctchil_s'
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

app.use(haveSession);

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(MONGO_CONF.getDbs(), {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const mongodb = mongoose.connection;
mongodb.on('open', (err) => {
    err ? console.error('mongoDb连接失败') : console.log('mongoDb连接成功');
});

app.use(user.routes());
app.use(user.allowedMethods());
app.use(article.routes());
app.use(article.allowedMethods());

export = app;
