<template>
<!-- 引入到路由 -->
  <div class="login">
    <!-- 1.1 给el-form添加rules属性，表示校验规则 -->
    <!-- 2.1 js校验先给el-form组件添加ref属性 -->
    <el-form :model="loginForm" class="container" :rules='myrules' ref="loginForm" @keydown.native.enter="submitLogin('loginForm')">
      <el-form-item>
        <div class="avatar">
          <img src="../assets/avatar.jpg" alt="">
        </div>
      </el-form-item>
      <!-- 1.2 给el-form-item加上prop属性，表示需要校验的字段 -->
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" prefix-icon="myicon myicon-user"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" prefix-icon="myicon myicon-key" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- 2.2 点击的时候将ref的值作为参数传递到函数submitLogin中去，注意加上引号 -->
        <el-button type="primary" class="login-btn" @click="submitLogin('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// 3.1 引入axios
// import axios from 'axios'
// 4.2 引入接口
import { postLogin } from '@/api/index.js'
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 自己书写验证校验
      myrules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitLogin (refval) {
      // 这里需要做js校验
      // 2.3 发请求之前，先利用validate()方法对表单进行校验,validate方法在element-ui中已封装好
      this.$refs[refval].validate(isPass => {
        // 参数isPass是一个布尔值，为true表示校验通过，则可以进行下一步发请求，为false表示校验失败
        if (isPass) {
          // console.log('登录了')
          // 3.2 调用接口发请求
          // axios.post('http://localhost:8888/api/private/v1/login', {username: this.loginForm.username, password: this.loginForm.password})
          //   .then(res => {
          //     console.log(res)
          //     if (res.data.meta.status === 200) {
          //       // 3.3 跳转到首页(先要创建首页组件，配置首页的路由规则)
          //       this.$router.push({name: 'home'})
          //     } else {
          //       // 弹出错误提示信息
          //       this.$message.error(res.data.meta.msg)
          //     }
          //   })
          // 4.3 调用接口
          postLogin({username: this.loginForm.username, password: this.loginForm.password})
            .then(res => {
              // console.log(res)
              if (res.meta.status === 200) {
                // 将服务器返回的token保存到本地
                localStorage.setItem('mytoken', res.data.token)
                // 将服务器返回的userName保存到本地，给首页头部展示用
                localStorage.setItem('username', res.data.username)
                // 成功跳转到首页
                this.$router.push({name: 'home'})
              } else {
                // 失败就弹出错误提示信息
                this.$message.error(res.meta.msg)
              }
            })
        } else {
          this.$message.warning('请正确填写表单')
          console.log('js校验不通过，请正确填写表单')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid rgb(121, 82, 82);
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
