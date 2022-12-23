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
        <!--    引用侧边栏组件       -->
        <Aside></Aside>


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
            <el-input style="width: 200px" placeholder="请输入邮箱" suffix-icon="el-icon-message" class="ml-5" v-model="email"></el-input>
            <el-input style="width: 200px" placeholder="请输入地址" suffix-icon="el-icon-position" class="ml-5" v-model="address"></el-input>
            <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
                     <!--    @click="load" 点击事件触发函数，分页查询   " @click="reset" 重置信息      -->
            <el-button class="ml-5" type="danger" @click="reset">重置</el-button>
          </div>
          <!--  按钮  -->
          <div style="margin: 10px 0">
            <el-button type="primary" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
            <el-popconfirm
                class="ml-5"
                confirm-button-text='确定'
                cancel-button-text='我再想想'
                icon="el-icon-info"
                icon-color="red"
                title="您确定批量删除吗？"
                @confirm="deleteBatch"
            >
              <!--           slot="reference" 必须要有 不然不会显示   -->
            <el-button type="danger"  slot="reference" >批量删除 <i class="el-icon-remove-outline"></i></el-button>

            </el-popconfirm>
            <el-button type="primary" class="ml-5">导入 <i class="el-icon-bottom" ></i></el-button>
            <el-button type="primary">导出 <i class="el-icon-top"></i></el-button>
          </div>


              <!--  点击新增弹出对话框    form对象在data种必须要有  width="30%" 控制整个表单的宽度   -->
          <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="30%" >
            <el-form label-width="80px" size="small">
              <el-form-item label="用户名">
                <el-input v-model="form.username" autocomplete="off"></el-input>
              </el-form-item>
<!--              <el-form-item label="角色">
                <el-select clearable v-model="form.role" placeholder="请选择角色" style="width: 100%">
                  <el-option v-for="item in roles" :key="item.name" :label="item.name" :value="item.flag"></el-option>
                </el-select>
              </el-form-item>-->
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
                <el-input v-model="form.address" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button  type="warning" @click="cancel">取 消</el-button>
              <el-button type="primary" @click="save">确 定</el-button>
            </div>
                        <!--     save：新增用户信息       -->
          </el-dialog>


          <!-- 表格设置边框 :<el-table  border  stripe" > </el-table>-->
          <!--      @selection-change="handleSelectionChange" 批量删除事件     -->
          <el-table :data="tableData" border stripe :header-cell-class-name="headerBg"   @selection-change="handleSelectionChange">
             <!--       多选框        -->
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="username" label="用户名" width="140"></el-table-column>
            <el-table-column prop="nickname" label="昵称" width="120"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="phone" label="电话"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                <!--                style="margin-left: 10px" "margin-top: 10px" 自己加的代码 scope.row:{tableData当中的id、username、address....}-->
                <el-button type="success" style="margin-left: 5px" @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
                     <!--    二次删除测试            -->
                <el-popconfirm
                    class="ml-5"
                    confirm-button-text='确定'
                    cancel-button-text='我再想想'
                    icon="el-icon-info"
                    icon-color="red"
                    title="您确定删除吗？"
                    @confirm="handleDelet(scope.row.id)"
                >
                       <!--      @confirm="handleDelet(scope.row.id)" 通过confirm触发事件            -->
                              <!--      style="margin-top: 10px"距离顶部10px            -->
                  <el-button type="danger" slot="reference" style="margin-top: 10px">删除 <i class="el-icon-remove-outline"></i></el-button>
                </el-popconfirm>
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
                :page-size="2"
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
import Aside from "@/components/Aside.vue";

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




  components: {Aside},
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
