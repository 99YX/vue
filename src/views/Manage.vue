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
        <!--  2、relative：相对定位，相对自身原来位置，原有空间保留，不会被挤占。宽度为父元素宽度，且宽度会撑大/缩小父元素宽度-->



        <!--    引用侧边栏组件       -->
        <Aside :isCollapse="isCollapse" :logoTextShow="logoTextShow" style="padding-bottom: 20px"></Aside>


      </el-aside>

      <el-container>
        <!-- 头部 文字居中(因为div高度是60所以line-height: 60px;) 有下边框线 -->
               <!--    border-bottom:120px solid #ccc;头部下边框线    -->
        <el-header style=" border-bottom:1px solid #ccc">

          <Header :collapseBtnClass="collapseBtnClass"  ></Header>

        </el-header>

        <el-main>

          <router-view/>

        </el-main>


      </el-container>
    </el-container>
  </div>
</template>

<script>


import request from "@/utils/request";
import Aside from "@/components/Aside.vue";
import Header from "@/components/Header.vue";

export default {
  name: 'HomeView',
  data() {

    return {
      tableData:[] ,
      total:0,
      pageNum: 1,
      pageSize: 2,
      username: '',
      nickname:'',
      email:'',
      address:'',
      dialogFormVisible:false,
      form:{},
      visible:false,
      /*收缩按钮*/
      collapseBtnClass: 'el-icon-s-fold',
      /*收缩按钮是否关闭 默认是展开的*/
      isCollapse: false,
      //文字默认展示
      logoTextShow: true,
      //给表格设置一个动态选择器
      headerBg: 'headerBg',
      sideWidth:'',
      /*数组：:目的是将复选框的数据存入数组中*/
      multipleSelection:[]

    }
  },
//   /*  <!--  >npm i axios -S 安装axios依赖-->*/
//   created() {
//
//
//     this. load()
//     // //请求后端数据 res=>res.json()将获取到的数据转变成json
//     //
//     // /*http://localhost:8083/User/page?pageNum=1&pageSize=3*/
//     // /*+ "&username=" + this.username*/
//     // fetch("http://localhost:8083/User/page?pageNum="+this.pageNum+"&pageSize=" + this.pageSize)
//     //     .then(res => res.json()).then(res => {
//     //   console.log(res)
//     //   this.tableData = res.data
//     //   this.total = res.total
//     //
//     // })
//
// },



 /*导入组件*/
  components: {Aside,Header},
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
     request.get("/page", {params:
      {
              /*前端通过动态绑定获取参数，传给后端*/
             pageNum:this.pageNum,
             pageSize:this.pageSize,
             username:this.username,
             email:this.email,
             address:this.address

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
    /*重置信息*/
    reset()
    {
           /*信息重置为空*/
          this.email='',
          this.address='',
          this.username='',

              /*调用load查询*/
         this.load()

    },
    /*点击新增时候触发此方法*/
    handleAdd(){

      //dialogFormVisible默认是false
      this.dialogFormVisible=true

    },
    /*点击确定，前端向后端发送请求保存数据*/
    save()
    {
       request.post("/user",this.form).then(res=>{

           // res 返回 true/false

          if(res)
          {
                 /*  如果返回 true*/

            this.$message.success("保存成功")
            //清空信息
            this.form=''


            /*关闭对话框 dialogFormVisible默认是false*/

            this.dialogFormVisible=false

            this.load()




          }
          else{
            /*如果返回 fasle*/

            this.$message.error("保存失败")
        }
      })


    },

    /*编辑数据,传入参数*/
    handleEdit(row)
    {
      /*打印数据*/
      console.log(row)
      /*将row中的数据赋予对话框*/
      this.form=row
      //打开对话框
      this.dialogFormVisible=true

      /*查询*/
      this.load()

    },
    /*点击取消事件*/
    cancel(){


          this.dialogFormVisible = false,
          this.form=''

    },
   /*删除数据 传入id*/
    handleDelet(rowId)
    {
      /*打印数据*/
      console.log(rowId)



       request.delete("/"+rowId).then(res=>{
        // res 返回 true/false

        if(res)
        {
          /!*  如果返回 true*!/

          this.$message.success("删除成功")

          this.load()







        }
        else{
          /!*如果返回 fasle*!/

          this.$message.error("删除失败")
          this.load()
        }
      })






    },
    /*批量删除事件*/
    handleSelectionChange(val){
      /*点击复选框传过来的数据*/
      console.log(val)
      /*将复选框的数据传入定义好的数组中*/

      this.multipleSelection=val

    },
    /*点击批量删除*/
    deleteBatch(){
      /*因为这个时候获取的数据的对象，而接口需要的是list数据 所以数据要处理*/
      let ids=this.multipleSelection.map(v=>v.id)
      /*请求后端批量删除的接口*/

      /*delete不支持传入对象 所以使用post*/
     request.post("/batch/delete", ids).then(res=>{
        console.log(res)
        if(res)
        {


          this.$message.success("删除成功")

          this.load()







        }
        else{


          this.$message.error("删除失败")
          this.load()
        }
      })






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
