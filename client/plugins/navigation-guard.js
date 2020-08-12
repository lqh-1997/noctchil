export default ({ app, redirect, route }) => {
    app.router.beforeEach((to, from, next) => {
        console.log(to);
        if (to.path === '/buzhunjin') {
            redirect('/home');
        }
        next();
    });
};
