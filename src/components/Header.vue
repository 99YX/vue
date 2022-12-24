<template>

  <div style="line-height: 60px; display: flex">
    <!--!--   设置一个收缩按钮关闭动画            -->
    <div style="flex: 1">


      <!-- 动态绑定class-->
      <span :class="collapseBtnClass" style="cursor: pointer; font-size: 18px" @click="collapse">



      </span>





    <el-breadcrumb separator="/" style="display: inline-block; margin-left: 10px">
      <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
    </el-breadcrumb>


  <el-dropdown style="width: 70px;cursor: pointer;margin-left: 850px" >
    <!--设置下拉效果-->
    <span>王小虎</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>

    <el-dropdown-menu >
      <el-dropdown-item>个人信息</el-dropdown-item>
      <el-dropdown-item>退出</el-dropdown-item>
      <el-dropdown-item>删除</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>

</div>

  </div>


</template>

<script>
import store from "@/store";
export default {
  name: "Header",


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
