import * as Koa from 'koa';
import * as bodyparser from 'koa-bodyparser';

import * as mongoose from 'mongoose';
import { REDIS_CONF, MONGO_CONF } from './config/db';
import { fileDir } from './config/global';

import * as session from 'koa-session';
import * as redisStore from 'koa-redis';
import * as staticFile from 'koa-static';
import * as logger from 'koa-logger';
import * as morgan from 'koa-morgan';
import * as user from './routes/user';
import * as article from './routes/article';
import * as file from './routes/file';
import * as comment from './routes/comment';
import path = require('path');
import fs = require('fs');

import haveSession from './middlewares/haveSession';
import { createFolder } from './util/fileUtils';

const app = new Koa();

app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text']
    })
);
app.use(logger());

// logger
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 日志记录
const ENV = process.env.NODE_ENV;
if (ENV !== 'production') {
    app.use(morgan('dev'));
} else {
    const logFileName = path.join(__dirname, 'logs', 'access.log');
    createFolder(path.join(__dirname, 'logs'));
    const writeStream = fs.createWriteStream(logFileName, {
        flags: 'a'
    });
    app.use(
        morgan('combined', {
            stream: writeStream
        })
    );
}

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

app.use(staticFile(fileDir));

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

export = app;
