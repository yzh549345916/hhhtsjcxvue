import Vue from "vue";
import Router from "vue-router";
import AppIndex from '@/components/Home/AppIndex'
import Login from '@/components/Login'

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: encodeURI('/'), redirect: '/index',
        },
        {
            path: encodeURI('/login'),
            name: 'Login',
            component: Login
        },
        {
            path: encodeURI('/index'),
            name: 'AppIndex',
            component: AppIndex,
            meta: {
                requireAuth: true
            }
        }
    ]
})
;
