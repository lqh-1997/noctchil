### router获取传来的数据

```javascript
// rest方式
router.get('/:username', async (ctx) => {
    const username = ctx.params.username
})
// post方式
router.post('/', async (ctx) => {
    const username = ctx.request.body.username
})
// get方式
router.get('/', async (ctx) => {
    const username = ctx.request.query.username
})
```

