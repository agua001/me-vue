// 入口配置
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入vue
import Vue from 'vue'
// 引入App组件
import App from './App'
// 引入路由插件
import router from './router'
// 引入element-ui组件和局部组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入样式
import '@/styles/index.css'
// productionTip 2.2.0 新增 类型: boolean 默认值: true 用法: 设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false
// 使用element-ui组件方法
Vue.use(ElementUI)
// 全局导航过滤
router.beforeEach((to, from, next) => {
  let user = localStorage.getItem('mytoken')
  if (user) {
    next()
  } else {
    if (to.path !== '/login') {
      next({path: '/login'})
    } else {
      next()
    }
  }
})
// eslint-disable no-new
// 创建vue实例
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // render: h => h(App)
  components: { App },
  template: '<App/>'
})
