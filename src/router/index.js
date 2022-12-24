import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Manage',
        component: () => import('../views/Manage.vue'),
        /*重定向*/
        redirect:"/home",
        //子路由
        children:[
            {
                path: 'home',
                name: 'Home',
                component: () => import('../views/Home.vue'),
            }
            ,
            {
                path: 'user',
                name: 'User',
                component: () => import('../views/User.vue'),
            },

        ]
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
// 路由守卫

router.beforeEach((to, from, next) => {
    localStorage.setItem("currentPathName", to.name)  // 设置当前的路由名称，为了在Header组件中去使用
    store.commit("setPath")  // 触发store的数据更新
    next()  // 放行路由
})
export default router
