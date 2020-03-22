import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login/login.vue'
import Home from '../views/home/home.vue'
import Welcome from '../views/welcome.vue'
// import Users from '../views/users/users.vue'
import MembersPoint from '../views/members/membersPoint.vue'
import Members from '../views/members/members.vue'
import Toys from '../views/toys/toys.vue'
import ToysType from '../views/toys/toysType.vue'
import UsersType from '../views/users/usersType.vue'
import AdminUserEdit from '../views/users/AdminUserEdit.vue'
import AdminUserList from '../views/users/AdminUserList.vue'

Vue.use(Router)

const router = new Router({
  routes: [
     {
       name: 'login',
       path: '/login',
       component: Login,
       meta: {isPublic: true}
     },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
      {path: '/welcome',component: Welcome},

      {path: '/membersPoint',component:  MembersPoint},

      {path: '/members',component:  Members } ,

      {path: '/toys',component:  Toys },

      {path: '/toysType',component:  ToysType },

      { path: '/usersCreate', component: AdminUserEdit },
      { path: '/usersEdit/:id', component: AdminUserEdit, props: true },
      { path: '/usersList', component: AdminUserList },
      
      {path: '/usersType',component:  UsersType },

    ]
    },
    
  ]
})
//客户端路由限制
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
})

export default router