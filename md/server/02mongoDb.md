## mongodb

### mongodb 介绍

MongodB 是一个非关系型数据库，但是它是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库中功能最丰富，最像关系数据库的。

Mongodb 特点：

-   没有预定的字段，扩展十分容易，例如在 mongoose 中如果想要在之后添加一个键值，通过[Schema#add](https://mongoosejs.com/docs/api.html#schema_Schema-add)即可添加；
-   Mongodb 相对于关系型数据库，性能更加优越；
-   Mongodb 字段长度不一，可以随意的进行存储和读取。

### NoSQL

NoSQL(Not only SQL)泛指非关系型数据库，是对关系型数据库的一种**补充**，补充这意味着 NoSQL 与关系型数据库并不是对立关系

关于 SQL 和 NoSQL 区别可以参考[这篇文章](https://www.cnblogs.com/xrq730/p/11039384.html)

总结来说 NoSQL 类型适合在高并发 IO 下的场景使用，但是不适合在表之间较有高一致性的场景，因为它无法同时满足[ACID 规则](https://www.runoob.com/mongodb/nosql.html)

### 使用方法

导入 mongoose mongoose 用来简化 node 对 mongodb 的操作

`npm install mongoose`

`npm install @types/mongoose --save-dev`

-   在 Koa 中引入 mongoose

```javascript
mongoose.connect('mongodb://127.0.0.1:27017/dbs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
```

-   使用 mongoose 要先 new 一个`Schema` 类似关系型数据库 mysql 中的表结构，以下以一张 user 表为例

```javascript
let userSchema = new mongoose.Schema({
    username: { type: String, trim: true, unique: true, index: true, required: true },
    password: { type: String, select: false },
    nicename: String,
    salt: String,
    avatar: String,
    email: String,
    url: String,
    status: { type: Boolean, default: false, required: true },
    last_login_time: Date
});
```

-   设置一个接口与`Schema`对应

```javascript
export interface UserDocument extends Document {
    _id: Schema.Types.ObjectId;
    username: string;
    nicename: string;
    salt: string;
    avatar: string;
    email: string;
    url: string;
    status: boolean;
    last_login_time: Date;
    valid: boolean;
    is_registry: boolean;
}
```

-   将模型导出

    `export default model('User', userSchema)`

    这里的 User 对应的就是数据库里'表'的名称

*   然后是简单的 CRUD 查询

```javascript
// 新建一个Collection mongoose将其抽象为构造函数
const User = mongoose.model('User', userSchema);
// 用户在访问url为 /user/xiaoming 的时候就能获取到数据库中所有user_login为xiaoming 的数据了
router.get('/user', async (ctx) => {
    // find为查找表中包含相关字段的操作
    const result = await User.find({
        username: ctx.params.username
    });
    ctx.body = new SuccessModule('查询成功', result);
});
```

-   新建

```javascript
router.post('/user', async (ctx) => {
    // 新建一个User实例，也就是新建数据库中的一条数据
    const user = new User({
        username: ctx.request.body.username,
        password: ctx.request.body.password,
        nicename: ctx.request.body.username,
        email: ctx.request.body.email
    });
    const result = await user.save();
    ctx.body = new SuccessModule('添加成功', result);
});
```

-   修改

```javascript
router.put('/user', async (ctx) => {
    const result = await User.updateOne(
        { username: ctx.request.body.username },
        { password: ctx.request.body.password }
    );
    ctx.body = new SuccessModule('修改成功', result);
});
```

-   删除

    删除的时候会报一个小错误 只要添加上`mongoose.set('useFindAndModify', false);`即可

```javascript
router.delete('/user', async (ctx) => {
    const result = await User.findOneAndRemove({
        username: ctx.request.body.username
    });
    ctx.body = new SuccessModule('删除成功', result);
});
```

