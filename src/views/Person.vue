<template>

  <el-form label-width="80px" size="small">
      <el-form-item label="用户名">
        <el-input v-model="form.username" ></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input type="textarea" v-model="form.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">确 定</el-button>
      </el-form-item>
    </el-form>

</template>

<script>
import request from "@/utils/request";
/*一定要有*/
import form from "element-ui/packages/form";

export default {
  name: "Person",
  data() {
    return {

      form: {},
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  //获取用户信息
  created() {
    console.log(this.user.username)
   request.get("/username/" + this.user.username).then(res=>{

      console.log("------------res.data----------------"+res.data)
      if(res.data==200)
      {
        this.form=res;
      }
    })
  },

  methods:{

    /*点击确定，前端向后端发送请求保存数据*/
    save()
    {
      request.post("/user",this.form).then(res=>{

        // res 返回 true/false

        if(res.data)
        {
          /*  如果返回 true*/

          this.$message.success("保存成功")



        }
        else{
          /*如果返回 fasle*/

          this.$message.error("保存失败")
        }
      })


    }

  }
}
</script>

<style scoped>

</style>
