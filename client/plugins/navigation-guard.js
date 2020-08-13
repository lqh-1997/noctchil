export default ({ app, redirect, route }) => {
    app.router.beforeEach((to, from, next) => {
        if (to.path === '/buzhunjin') {
            redirect('/home');
        }
        next();
    });
};
