// 引入到main.js
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
// 引入首页组件
import Home from '@/views/Home.vue'
// 引入用户管理
import Welcome from '@/views/Welcome'
// 用户列表页面
import Users from '@/views/Users'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: { name: 'welcome' },
      children: [
        {
          name: 'welcome',
          path: 'welcome',
          component: Welcome
        },
        {
          name: 'users',
          path: 'users',
          component: Users
        }
      ]
    }
  ]
})
