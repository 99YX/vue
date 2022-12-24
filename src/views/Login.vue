<template>
    <div class="wrapper">
      <div style="margin: 200px auto; background-color: #fff; width: 350px; height: 300px; padding: 20px; border-radius: 10px">
        <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>登 录</b></div>
        <el-form ref="userForm">
          <el-form-item prop="username">
            <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password ></el-input>
          </el-form-item>
          <el-form-item style="margin: 10px 0; text-align: right">
            <el-button type="primary" size="small"  autocomplete="off" >登录</el-button>
            <el-button type="warning" size="small"  autocomplete="off">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </template>




<script>
export default {
  name: "Login"
}
</script>

<style scoped>
.wrapper {
  height: 100vh;
  background-image: linear-gradient(to bottom right, #FC466B , #3F5EFB);
  overflow: hidden;
}
</style>
