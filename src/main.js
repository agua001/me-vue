// 入口配置
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入vue
import Vue from 'vue'
// 引入App组件
import App from './App'
// 引入路由插件
import router from './router'
// 引入样式
import '@/styles/index.scss'
// productionTip 2.2.0 新增 类型: boolean 默认值: true 用法: 设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false
// eslint-disable no-new
// 创建vue实例
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})