export default (Context) => {
    const { app, store, redirect } = Context;
    app.router.beforeEach(async (to, from, next) => {
        if (store.state.userId === null) {
            await store.dispatch('getUserInfo', Context);
        }
        if (store.state.userId !== 0) {
            if (to.path === '/login' || to.path === '/signup') {
                redirect('/home');
            }
        }
        next();
    });
};
