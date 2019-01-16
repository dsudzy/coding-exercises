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
                requiresAuth: true
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
                params: { nextUrl: '/' }
            })
        } else {
            next()
        }
    } else if(to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('jwt') == null){
            next()
        } else if (to.fullPath == '/login') {
            next({
                path: '/',
            })
        } else {
            next()
        }
    } else {
        next() 
    }
})

export default router
