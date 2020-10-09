import * as Koa from 'koa';
import * as bodyparser from 'koa-bodyparser';

import * as mongoose from 'mongoose';
import { REDIS_CONF, MONGO_CONF } from './config/db';
import { fileDir } from './config/global';

import * as session from 'koa-session';
import * as redisStore from 'koa-redis';
import * as staticFile from 'koa-static';
import user from './routes/user';
import article from './routes/article';
import file from './routes/file';
import comment from './routes/comment';

import haveSession from './middlewares/haveSession';
import log from './middlewares/log';
import catchError from './middlewares/catchError';

const app = new Koa();

app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text']
    })
);

app.use(catchError());
app.use(log);

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
                port: REDIS_CONF.getPort(),
                host: REDIS_CONF.getHost()
            })
        },
        app
    )
);

app.use(haveSession);

app.use(
    staticFile(fileDir, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        gzip: true
    })
);

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose
    .connect(MONGO_CONF.getDbs(), {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((res) => {
        console.log('数据库连接成功');
    })
    .catch((err) => {
        console.log('数据库连接失败' + err);
    });

app.use(user.routes());
app.use(user.allowedMethods());
app.use(article.routes());
app.use(article.allowedMethods());
app.use(file.routes());
app.use(file.allowedMethods());
app.use(comment.routes());
app.use(comment.allowedMethods());

export default app;
