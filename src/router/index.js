import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: require('../components/Home.vue').default,
            meta: {
                // requiresAuth: true
                guest: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: require('../components/Login.vue').default,
            meta: {
                guest: true
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            let user = JSON.parse(localStorage.getItem('user'))
            if (to.matched.some(record => record.meta.is_admin)) {
                if (user.is_admin == 1) {
                    next();
                } else {
                    next({ name: 'userboard'});
                }
            } else {
                next();
            }
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('jwt') == null) {
            next();
        } else {
            next({ name: 'userboard'});
        }
    } else {
        next();
    }
});

export default router
