import Vue from "vue";
import Router from "vue-router";
import AppIndex from '@/components/AppIndex'
import Login from '@/components/Login'
import skMap from "@/components/skcx/skMap";
import skTj from "@/components/sktj/skTj";

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

            component: AppIndex,
            meta: {
                requireAuth: true
            },
            children:[
                {path: '/', meta: {requireAuth: true}, redirect: encodeURI('/实况查询')},
                {
                    path: encodeURI("/实况查询"),
                    name: "实况查询",
                    component: skMap,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: encodeURI("/数据统计"),
                    name: "数据统计",
                    component: skTj,
                    meta: {
                        requireAuth: true
                    }
                }
            ]
        }
    ]
})
;
