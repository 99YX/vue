<template>

  <div style="height:100%">
    <!--设置高度撑满 -->
    <el-container style="min-height: 100vh">
      <!--侧边栏设置高度撑满  折叠的时候需要动态绑定宽度 字符串要用单引号“ '' ”包住
       加上了冒号是为了动态绑定数据，等号后面可以写变量。
如果不使用冒号，等号后面就可以写字符串等原始类型数据。这是就无法进行动态绑定数据了-->
      <!--    box-shadow:  2px 0 6px rgb(238, 241, 246)：阴影效果  -->
      <el-aside :width="sideWidth + 'px'" style="box-shadow:  2px 0 6px rgb(238,241,246);">
        <!--设置高度撑满 background-color 设置侧边栏高度 超出部分使用overflow-x-->
        <!--   text-color:文字颜色   active-text-color:选中设置颜色   -->
        <!--   :collapse-transition="false" 关闭收缩动画     -->

        <!--  侧边栏上方，编写系统名-->
        <!--   1、absolute：绝对定位，相对最近父元素，原有空间不保留会被其他元素挤占。宽度为文本宽度，且宽度不会影响父元素宽度

              2、relative：相对定位，相对自身原来位置，原有空间保留，不会被挤占。宽度为父元素宽度，且宽度会撑大/缩小父元素宽度     -->
        <div style="height: 60px; line-height: 60px; text-align: center">
          <img src="../assets/logo.png" alt="" style="width: 20px; position: relative; top: 5px; right: 5px">
          <b style="color: royalblue" v-show="logoTextShow">后台管理系统</b>
        </div>

                   <!--        overflow-x: hidden               -->
        <el-menu :default-openeds="['1', '3']" style="min-height: 100%;overflow-x: hidden "

                 background-color="rgb(48, 65, 86)"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 :collapse-transition="false"
                 :collapse="isCollapse"
        >
          <!-- 想要点击菜单时，该菜单显示不同的颜色效果
                 text-color="#fff"
                 active-text-color="#409EFF" -->

                  <!--       :collapse-transition="false" 侧边栏收缩动画  收缩按钮见111行  -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>
              <!-- 新增目的是隐藏文字-->
              <span slot="title">导航一</span>


            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>


              <!-- 新增目的是隐藏文字-->
              <span slot="title">导航二</span>


            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>


              <!-- 新增目的是隐藏文字-->
              <span slot="title">导航三</span>

            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- 头部 文字居中(因为div高度是60所以line-height: 60px;) 有下边框线 -->
               <!--    border-bottom:120px solid #ccc;头部下边框线    -->
        <el-header style=" font-size: 12px;border-bottom:1px solid #ccc;line-height: 60px; display: flex">
          <!--   设置一个收缩按钮关闭动画            -->
          <div style="flex: 1; font-size: 20px">
            <!-- 动态绑定class-->
            <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
          </div>
          <!-- 鼠标停靠，展示效果-->
          <el-dropdown style="width: 70px;cursor: pointer ">
            <!--设置下拉效果-->
            <span>王小虎</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </el-header>

        <el-main>
          <!-- 面包屑-->
          <div style="margin-bottom: 30px">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <!--       suffix-icon:图标  placeholder：提示 class：引入gloable.css样式  -->
          <div style="margin: 10px 0">
                  <!--     动态绑定自己的姓名，支持模糊搜索     -->
            <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search" v-model="username"></el-input>
            <el-input style="width: 200px" placeholder="请输入邮箱" suffix-icon="el-icon-message" class="ml-5"></el-input>
            <el-input style="width: 200px" placeholder="请输入地址" suffix-icon="el-icon-position" class="ml-5"></el-input>
            <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
                     <!--    @click="load" 点击事件触发函数，分页查询        -->
          </div>
          <!--  按钮  -->
          <div style="margin: 10px 0">
            <el-button type="primary">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
            <el-button type="danger">批量删除 <i class="el-icon-remove-outline"></i></el-button>
            <el-button type="primary">导入 <i class="el-icon-bottom"></i></el-button>
            <el-button type="primary">导出 <i class="el-icon-top"></i></el-button>
          </div>

          <!-- 表格设置边框 :<el-table  border  stripe" > </el-table>-->
          <el-table :data="tableData" border stripe :header-cell-class-name="headerBg">
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="username" label="用户名" width="140"></el-table-column>
            <el-table-column prop="nickname" label="昵称" width="120"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="phone" label="电话"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                <!--                style="margin-left: 10px" "margin-top: 10px" 自己加的代码-->
                <el-button type="success" style="margin-left: 10px">编辑 <i class="el-icon-edit"></i></el-button>
                <el-button type="danger" style="margin-top: 10px">删除 <i class="el-icon-remove-outline"></i></el-button>
              </template>
            </el-table-column>

          </el-table>
          <!--           分页   -->
          <div style="padding: 10px 0">
            <span class="demonstration">完整功能</span>
             <!--     page-sizes接受一个整型数组，
                   数组元素为展示的选择每页显示个数的选项
             ，[100, 200, 300, 400]
             表示四个选项，每页显示 100 个，200 个，300 个或者 400 个       -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[2, 5, 10, 20]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
             <!--      toatal：是从前端传过来的数据通过动态绑定        -->
            </el-pagination>
<!--  :current-page="currentPage4"  -->
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>


import request from "@/utils/request";

export default {
  name: 'HomeView',
  data() {

    return {
      tableData:[] ,
      total:0,
      pageNum: 1,
      pageSize: 2,
      username: '',
      /*收缩按钮*/
      collapseBtnClass: 'el-icon-s-fold',
      /*收缩按钮是否关闭 默认是展开的*/
      isCollapse: false,
      //文字默认展示
      logoTextShow: true,
      //给表格设置一个动态选择器
      headerBg: 'headerBg',
      sideWidth:''

    }
  },
  /*  <!--  >npm i axios -S 安装axios依赖-->*/
  created() {


    this. load()
    // //请求后端数据 res=>res.json()将获取到的数据转变成json
    //
    // /*http://localhost:8083/User/page?pageNum=1&pageSize=3*/
    // /*+ "&username=" + this.username*/
    // fetch("http://localhost:8083/User/page?pageNum="+this.pageNum+"&pageSize=" + this.pageSize)
    //     .then(res => res.json()).then(res => {
    //   console.log(res)
    //   this.tableData = res.data
    //   this.total = res.total
    //
    // })

},




  components: {},
  methods: {
    collapse() {
      // 如果点击，则取反 折叠
      this.isCollapse = !this.isCollapse
      // 如果收缩，设置宽度是64px
      if (this.isCollapse) {
        //为什么是64：收缩的时候宽度是64
        this.sideWidth = 64
        //如果折叠换一个图标
        this.collapseBtnClass = 'el-icon-s-unfold'
        //不展示文字
        this.logoTextShow = false
      } else {   // 展开
        this.sideWidth = 200
        //如果不折叠使用原来图标
        this.collapseBtnClass = 'el-icon-s-fold'
        this.logoTextShow = true
      }
    },
      //鼠标点击后从新请求地址
    load()
    {


      /*axios封装get请求*/
      request.get("http://localhost:8083/User/page", {params:
      {
              /*前端通过动态绑定获取参数，传给后端*/
             pageNum:this.pageNum,
             pageSize:this.pageSize,
             username:this.username

      }
      }).then(res=>{


        console.log(res),
            /*将从后台获取到的数据传给前端展示*/
            this.tableData=res.records
            /*获取总条数*/
            this.total=res.total
      })

      //请求后端数据 res=>res.json()将获取到的数据转变成json

      /*http://localhost:8083/User/page?pageNum=1&pageSize=3*/
      /*+ "&username=" + this.username*/
      /*fetch("http://localhost:8083/User/page?pageNum="+this.pageNum+"&pageSize=" + this.pageSize+"&username=" + this.username)
          .then(res => res.json()).then(res => {
        console.log(res)
        this.tableData = res.data
        this.total = res.total

      })*/

    },
    /*获取当前的条数*/
    handleSizeChange(pageSize) {
      console.log(pageSize)
     this.pageSize = pageSize
     this.load()
    },
    /*获取当前的页码,因为函数需要参数，但是没有传，这个时候就会把鼠标点击的内容传入*/
    handleCurrentChange(pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      this.load()
    }
  }
}
</script>

<style>
/*表格颜色*/
.headerBg {
  background: #eee !important;
}
</style>
