### koa-generic-session版本过时

https://segmentfault.com/q/1010000023321430

最终结果

```javascript
import * as session from 'koa-session';
import * as reidsStore from 'koa-redis'
app.use(
    session(
        // 设置Config对象 或者直接传入app 按照默认的设置
        app
    )
);
```

### 引入koa-session直接使用ctx.session报的错

koa引进来的ctx本身没有定义session属性，会导致出现这个错误

![pic001](E:\project\my-blog\server\md\pic001.png)

但是在`koa-session`中定义了session这个属性

![pic002](E:\project\my-blog\server\md\pic002.png)

所以我们要做的就是将router里面的原有的ctx的类型修改成包含了koa-session里Context的类型

使用方法

```javascript
// 导入koa-session中的Context
import { DefaultState, Context } from 'koa';

// 设置router中的范式
const router = new Router<DefaultState, Context>();

router.get('/', async (ctx:Context) => {
    const result = await User.find({
        username: ctx.request.body.username
    });
    // 在此处就能够正常的使用session了，由于session有可能为空，所以加了一层判断
    ctx.session && (ctx.session.username = ctx.request.body.username);
    ctx.body = new SuccessModule('查询成功', result);
});
```

