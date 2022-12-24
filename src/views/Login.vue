<template>
                 <!-- 先写一个div用来包裹-->
    <div class="wrapper">

      <div style="margin: 200px auto; background-color: #fff; width: 350px; height: 300px; padding: 20px; border-radius: 10px">


        <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>登 录</b></div>

      <!--    表单校验    -->
        <el-form :model="user"  ref="userForm">
          <el-form-item prop="username">
            <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password v-model="user.password" ></el-input>
          </el-form-item>
          <el-form-item style="margin: 10px 0; text-align: right">

            <el-button type="primary" size="small"  autocomplete="off" @click="login">登录</el-button>

            <el-button type="warning" size="small"  autocomplete="off">注册</el-button>

          </el-form-item>

        </el-form>




    </div>


    </div>

  </template>




<script>
import request from "@/utils/request";

export default {
  name: "Login",
  data(){
    return{
      user:{


      }
    }

    },
    methods:{
      /*前台向后台发送请求*/
    login(){

       request.post("/login",this.user).then(res=>{

         console.log(res)
         /*如果后台传回来的数据是true则跳到/,如果是false则账号或者密码错误*/
         if(!res)
         {
           this.$message.error("账号或者密码错误")

         }
         else
         {
           //跳转到后台
           this.$router.push("/")
         }

       })




    }


    }

}
</script>

<style scoped>
.wrapper {
  /*100vh：代表视图的高度：100%*/
  height: 100vh;
  /*渐变的背景色 to bottom right：从左上角到右下角渐变*/
  background-image: linear-gradient(to bottom right, #FC466B , #3F5EFB);

  /*溢出部分隐藏*/
  overflow: hidden;
}
</style>
