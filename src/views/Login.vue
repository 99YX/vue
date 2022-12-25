<template>
                 <!-- 先写一个div用来包裹-->
    <div class="wrapper">

      <div style="margin: 200px auto; background-color: #fff; width: 350px; height: 300px; padding: 20px; border-radius: 10px">


        <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>登 录</b></div>

      <!--    表单校验    -->
        <el-form :model="user"  :rules="rules" ref="userForm">
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
    return {
      user: {

      },



      /*表单验证   <el-form :model="user"  ref="rules"> */
      rules: {
        /*通过prop属性*/
        username: [
            /*trigger: 'blur' 鼠标失去焦点会校验*/
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 1, max: 5, message: '用户名在 1 到 5 个字符', trigger: 'blur'}
        ],
        password: [
          /*trigger: 'blur' 鼠标失去焦点会校验*/
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 1, max: 6, message: '密码在 1 到 6 个字符', trigger: 'blur'}
        ]
      }
    }

    },
    methods:{
      /*前台向后台发送请求*/
       login(){

         this.$refs['userForm'].validate((valid) => {
           /*表单校验*/
           if (valid) {
             request.post("/login",this.user).then(res=>{

               console.log("-------状态码--------"+res.code)
               /*如果后台传回来的数据是true则跳到/,如果是false则账号或者密码错误*/

               if(res.code === '200')
               {
                 this.$message.success('登录成功!')
                 //将后端传回来的数据保存到浏览器
                 localStorage.setItem("user",JSON.stringify(res.data))
                 //跳转到后台
                 this.$router.push("/")


               }
               else
               {
                 /*有问题*/
                /* this.$message.error(res.msg)*/
                 this.$message.error('账号或者密码错误!')
               }

             })

           } else {

             return false

           }
         });



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
