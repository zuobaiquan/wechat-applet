<template>
  <div class="app-container">
    <el-button @click="handleAdd(1,-1)" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">添加</el-button>
    &nbsp;&nbsp;&nbsp;&nbsp;
    用户名：<el-input style="width: 200px;" class="filter-item" placeholder="请输入" v-model="searchAccount"></el-input>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="fetchData">搜索</el-button>
    <br /><br />
    <br /><br />
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="100">
        <template slot-scope="scope">
          {{(currentPage-1)*5+scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          {{scope.row.account || '--' }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          {{scope.row.realName || '--'}}
        </template>
      </el-table-column>
      <el-table-column label="联系方式" align="center">
        <template slot-scope="scope">
          {{scope.row.phone || '--' }}
        </template>
      </el-table-column>
      <el-table-column label="部门职位" align="center">
        <template slot-scope="scope">
          {{scope.row.department}}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{scope.row.status==1?'停用':(scope.row.status==2?'删除':'正常')}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="handleAdd(-1,scope.row.id)" type="primary" size="small" icon="el-icon-edit">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="form.account" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item label="姓名" label-width="120px">
          <el-input v-model="form.realName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item label="联系方式" label-width="120px">
          <el-input v-model="form.phone" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item label="部门职位" label-width="120px">
          <el-input v-model="form.department" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRes()">确 定</el-button>
      </div>
    </el-dialog>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 5, 10, 15]"
      :page-size="5"
      layout="total, prev, pager, next, jumper"
      :total="totalNum">
    </el-pagination>
  </div>
</template>
<script>
import { getAdminList,addAdmin,editAdmin,deleteAdmin } from '@/api/admin'
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      dialogTitle:'添加管理员',
      form: {
        account: '',
        realName:'',
        phone:null,
        department:'',
        id:-1
      },
      currentPage: 1,
      totalNum:1,
      searchAccount:''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getAdminList({'page':this.currentPage-1,'size':5},this.searchAccount).then(response => {
        this.list = response.data.content;
        this.totalNum=response.data.totalElements
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
       this.currentPage=val
       this.fetchData();
    },
    handleAdd(flag,id){
      if(flag==1){
        this.form.id=-1
        this.dialogTitle='添加管理员'
        this.form.account=''
        this.form.realName=''
        this.form.phone=null
        this.form.department=''
        this.dialogFormVisible = true
      }
      if(flag==-1){
        this.form.id=id
        this.dialogTitle='修改管理员'
        this.list.forEach((item,index)=>{
          if(item.id==id){
            this.form.account=item.account
            this.form.realName=item.realName
            this.form.phone=item.phone
            this.form.department=item.department
            this.dialogFormVisible = true
            return ;
          }
        })
      }
    },
    handelErrorForm(){
      if(this.form.account==""){
        this.$message({
          message: '用户名不能为空',
          type: 'warning'
        })
        return false
      }
      if(this.form.realName==""){
        this.$message({
          message: '姓名不能为空',
          type: 'warning'
        })
        return false
      }
      if(this.form.phone==""){
        this.$message({
          message: '手机号码不能为空',
          type: 'warning'
        })
        return false
      }
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.form.phone)) {
        this.$message({
          message: '手机号码格式不正确',
          type: 'warning'
        })
        return false
      }
      if(this.form.department==""){
        this.$message({
          message: '部门不能为空',
          type: 'warning'
        })
        return false
      }
      else{
        return true
      }
    },
    submitRes(){
      if(this.handelErrorForm()){
        if(this.form.id==-1){
          addAdmin({
            'account':this.form.account,
            'realName':this.form.realName,
            'phone':this.form.phone,
            'department':this.form.department
          }).then(response => {
            if(response.status==200){
              this.dialogFormVisible=false
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.fetchData();
            }else{
              this.$message({
                message: '修改失败',
                type: 'warning'
              })
            }
          })
        }
        else{
          editAdmin({
            'account':this.form.account,
            'realName':this.form.realName,
            'phone':this.form.phone,
            'department':this.form.department,
            'id':this.form.id
          }).then(response => {
            if(response.status==200){
              this.dialogFormVisible=false
              Message({
                message: "修改成功",
                type: 'success',
                duration: 5 * 1000
              })
              this.fetchData();
            }else{
              Message({
                message: "修改失败",
                type: 'error',
                duration: 5 * 1000
              })
            }
          })
        }
      }
      else{
        console.log("表单提交失败");
      }
    }
  }
}
</script>
