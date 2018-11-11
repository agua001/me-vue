<template>
  <div class="home">
    <!-- 这是首页 -->
    <el-container>
      <!-- 左侧导航部分 -->
      <el-aside width="auto">
        <div class="logo"></div>
        <!-- collapse属性的true或者false控制菜单折叠与展开 -->
        <!-- router属性用于开启路由模式，下面会将index里面的值作为跳转的路径 -->
        <el-menu
          router
          :collapse="isCollapse"
          background-color="#F9F9F9"
          default-active="2"
          class="el-menu-admin"
          @open="handleOpen"
          @close="handleClose">
          <!-- <el-submenu index="1"> -->
          <!-- 这里需要index改为一个路径 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/users">
              <i class="el-icon-menu"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- 头部部分 -->
        <el-header>
          <div class="myicon myicon-menu toggle-btn" @click="toggle"></div>
          <div class="system-title">电商后台管理系统</div>
          <div>
            <span class="welcome">您好，{{username}}</span>
            <!-- 退出事件绑定 -->
            <el-button type="warning" round @click="logout">退出</el-button>
          </div>
        </el-header>
        <!-- 中间内容主体部分，这里放一个坑，将来存放路由匹配的组件 -->
        <el-main>
          <!-- mode属性表示切换模式，只有两个值，一个为in-out(需要的先进来，不要的后出去),一个为out-in(不要的先出去，需要的后进来) -->
          <transition
             mode="out-in"
             enter-active-class="animated fadeIn"
             leave-active-class="animated fadeOut"
          >
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
// 引入Home
// import { getUserList } from '@/api/index.js'
export default {
  data () {
    return {
      isCollapse: false,
      username: ''
    }
  },
  mounted () {
    // 组件一挂载就从本地获取userName，将它赋值给data中的变量，展示到页面（在这之前，先去login页面存userName到本地）
    // getUserList({query: '', pagenum: 1, pagesize: 1})
    //   .then(res => console.log(res))
    let name = localStorage.getItem('username')
    this.username = name
  },
  methods: {
    // 切换菜单的折叠与展开
    toggle () {
      this.isCollapse = !this.isCollapse
    },
    // 2.2 退出方法
    logout () {
      // a 先清除本地的token
      // b 跳转到登录页
      localStorage.removeItem('mytoken')
      this.$router.push({name: 'login'})
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #F9F9F9;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #409EFF;
  }
  .logo {
    height:60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: white;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292CF;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome, {
    color: white;
  }
}
</style>
