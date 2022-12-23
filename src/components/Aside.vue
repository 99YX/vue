<template>

  <!--        overflow-x: hidden  router用来控制index里面路由-->
  <el-menu :default-openeds="['1', '3']" style="min-height: 100%;overflow-x: hidden "

           background-color="rgb(48, 65, 86)"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse-transition="false"
           :collapse="isCollapse"
           router

  >


    <!-- 想要点击菜单时，该菜单显示不同的颜色效果
           text-color="#fff"
           active-text-color="#409EFF" -->

    <!--       :collapse-transition="false" 侧边栏收缩动画  收缩按钮见111行  -->

    <div style="height: 60px; line-height: 60px; text-align: center">
      <img src="../assets/logo.png" alt="" style="width: 20px; position: relative; top: 5px; right: 5px">
      <b style="color: royalblue" v-show="logoTextShow">后台管理系统</b>
    </div>

    <el-menu-item  index="/home"  >

      <template slot="title">
        <i class="el-icon-house"></i>
        <span slot="title">主页</span>

      </template>

    </el-menu-item>

    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">系统管理</span>
      </template>
      <el-menu-item index="/user">
        <i class="el-icon-s-custom"></i>
        <span slot="title" >用户管理</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>

</template>

<script>
export default {
   name: "Aside",
  /*组件传值*/
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean
  },
}
</script>

<style scoped>

</style>
