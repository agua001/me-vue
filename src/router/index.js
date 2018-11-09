// 路由
// 引入vue框架
import Vue from 'vue'
// 引入路由插件
import Router from 'vue-router'
// 引入登录页面组件
import Login from '@/views/Login.vue'
// 使用路由插件
Vue.use(Router)
//导出路由规则
export default new Router({
  routes: {
    path: '/login',
    name: 'login',
    component: Login
  }
})
