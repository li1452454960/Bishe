import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login/login.vue'
import Home from '../views/home/home.vue'
import Welcome from '../views/welcome.vue'
import MembersPoint from '../views/members/membersPoint.vue'
import Members from '../views/members/members.vue'
import Toys from '../views/toys/toys.vue'
import ToysType from '../views/toys/toysType.vue'
import ToysEdit from '../views/toys/toysEdit.vue'
import AdminUserEdit from '../views/users/AdminUserEdit.vue'
import AdminUserList from '../views/users/AdminUserList.vue'
import Sales from '../views/orders/sales.vue'
import Stocks from '../views/orders/stocks.vue'
import Notfound from '../views/404.vue'

//解决添加相同的路由报错
Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}


const router = new Router({
        routes: [{
                name: 'login',
                path: '/',
                component: Login,
                meta: { isPublic: true }
            },
            {
                name: 'home',
                path: '/',
                component: Home,
                children: [
                    { path: '/welcome', component: Welcome },

                    { path: '/membersPoint', component: MembersPoint },

                    { path: '/members', component: Members },

                    { path: '/toys', component: Toys },
                    { path: '/toysCreate', component: ToysEdit },
                    { path: '/toysEdit/:id', component: ToysEdit, props: true },

                    { path: '/toysType', component: ToysType },

                    { path: '/usersCreate', component: AdminUserEdit },
                    { path: '/usersEdit/:id', component: AdminUserEdit, props: true },
                    { path: '/usersList', component: AdminUserList },

                    { path: '/sales', component: Sales },

                    { path: '/stocks', component: Stocks },

                ]
            },
            {
                path: '*',
                name: '/404',
                component: Notfound
            },

        ]
    })
    //客户端路由限制,路由守卫
router.beforeEach((to, from, next) => {
    if (!to.meta.isPublic && !localStorage.token) {
        return next('/login')
    }
    next()
})

export default router