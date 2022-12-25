<template>
  <div style="line-height: 60px; display: flex">

    <div style="flex: 1">
      <span :class="collapseBtnClass" style="cursor: pointer; font-size: 18px" @click="collapse"></span>

      <el-breadcrumb separator="/" style="display: inline-block; margin-left: 10px">
        <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-dropdown style="width: 150px; cursor: pointer; text-align: right">

      <div style="display: inline-block">
        <img :src="user.avatarUrl" alt=""
             style="width: 30px; border-radius: 50%; position: relative; top: 10px; right: 5px">
        <span>{{ user.nickname }}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      </div>

      <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
        <el-dropdown-item style="font-size: 14px; padding: 5px 0">
          <router-link to="/password">修改密码</router-link>
        </el-dropdown-item>
        <el-dropdown-item style="font-size: 14px; padding: 5px 0">
          <router-link to="/person">个人信息</router-link>
        </el-dropdown-item>
        <el-dropdown-item style="font-size: 14px; padding: 5px 0">
          <router-link to="/login" >退出</router-link>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<!--
<template>

  <div style="line-height: 60px; display: flex">
    &lt;!&ndash;!&#45;&#45;   设置一个收缩按钮关闭动画            &ndash;&gt;
    <div style="flex: 1">

      &lt;!&ndash; 动态绑定class&ndash;&gt;
      <span :class="collapseBtnClass" style="cursor: pointer; font-size: 18px" @click="collapse">
      </span>


    <el-breadcrumb separator="/" style="display: inline-block; margin-left: 10px">
      <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>


    </el-breadcrumb>



  <el-dropdown style="width: 70px;cursor: pointer;margin-left: 750px" >


    &lt;!&ndash;设置下拉效果&ndash;&gt;
    <span>王小虎</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>

    <el-dropdown-menu >
      <el-dropdown-item>个人信息</el-dropdown-item>
      <el-dropdown-item  >

      &lt;!&ndash;  跳转登录页面     &ndash;&gt;

        <router-link to="/login" >退出</router-link>



      </el-dropdown-item>

    </el-dropdown-menu>
  </el-dropdown>

</div>

  </div>


</template>
-->

<script>

export default {
  name: "Header",

  data(){
    return{
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  props: {
    collapseBtnClass: String,



  },
  computed: {
    currentPathName() {
      return this.$store.state.currentPathName;　　//需要监听的数据
    }
  },
  watch: {
    currentPathName(newVal, oldVal) {
      console.log(newVal)
    }
  },
  methods: {
    collapse() {
      // this.$parent.$parent.$parent.$parent.collapse()  // 通过4个 $parent 找到父组件，从而调用其折叠方法
      this.$emit("asideCollapse")
    },
    logout() {
      this.$store.commit("logout")
      this.$message.success("退出成功")
    }
  }



}







</script>

<style scoped>

</style>
