import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Dashboard',
            component: require('../components/Dashboard.vue').default
        },
        {
            path: '/login',
            name: 'Login',
            component: require('../components/Login.vue').default
        },
        {
            path: '/signup',
            name: 'Signup',
            component: require('../components/Signup.vue').default
        }
    ]
});