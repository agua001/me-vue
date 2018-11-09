<template>
<!-- 登录组件 -->
  <div class="login">
    <!-- model属性表示表单数据对象 -->
    <el-form :model="loginForm" class="container">
      <div class="avatar">
        <!-- 引入登录表单图像，尝试是否能用@ -->
        <img src="@/assets/avatar.jpg" alt="">
      </div>
      <el-form-item>
        <!-- 通过prefix-icon在input首部添加图标 ，跟icon.scss一致-->
        <el-input v-model="loginForm.userName" prefix-icon="myicon myicon-user"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="loginForm.password" prefix-icon="myicon myicon-key" type='password'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  // 导出表单数据
  export default {
    data() {
      return {
        loginForm: {
          userName: '',
          password: ''
        }
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
        border: 10px solid #fff;
        box-shadow: 0 1px 5px #ccc;
        overflow: hidden;
      }
      .login-btn {
        width: 100%;
      }
    }
  }
</style>
