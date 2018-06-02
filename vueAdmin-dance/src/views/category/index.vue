<template>
  <div class="app-container">
    <el-button @click="handleAdd(1,-1)" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">添加</el-button>
    <br /><br />
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="分类名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center">
        <template slot-scope="scope">
          {{scope.row.toHome || '0'}}
        </template>
      </el-table-column>
      <el-table-column width="200" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleAdd(-1,scope.row.id)" size="small" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="delCategory(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" label-width="120px">
          <el-input v-model="form.toHome" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRes()">确 定</el-button>
      </div>
    </el-dialog>
    <el-pagination
      v-if="totalNum/10>1"
      background
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 10, 20, 30]"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="totalNum">
    </el-pagination>
  </div>
</template>
<script>
import { getCategoryList,editCategory,addCategory,deleteCategory } from '@/api/category'
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      form: {
        id:-1,
        name: '',
        toHome:''
      },
      currentPage: 1,
      totalNum:1
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getCategoryList({'page':this.currentPage-1,'size':10}).then(response => {
        this.list = response.data.data.content;
        this.totalNum=response.data.data.totalElements
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
       this.currentPage=val
       this.fetchData();
    },
    delCategory(id){
      deleteCategory({'id':id}).then(response => {
        if(response.status==200){
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.fetchData()
        }else{
          this.$message({
            message: '删除失败',
            type: 'warning'
          })
        }
      })
    },
    handleAdd(flag,id){
      if(flag==1){
        this.form.id=-1
        this.dialogTitle='添加分类'
        this.dialogFormVisible=true
      }
      if(flag==-1){
        this.form.id=id
        this.dialogTitle='修改分类'
        this.list.forEach((item,index)=>{
          if(item.id==id){
            this.form.name=item.name
            this.form.toHome=item.toHome
            this.dialogFormVisible = true
            return ;
          }
        })
      }


    },
    handelErrorForm(){
      if(this.form.name==""){
        this.$message({
          message: '分类名称不能为空',
          type: 'warning'
        })
        return false
      }
      if(this.form.toHome==""){
        this.$message({
          message: '排序不能为空',
          type: 'warning'
        })
        return false
      }
      if(!(/^(0|([1-9]\d*))$/).test(this.form.toHome)){
        this.$message({
          message: '排序格式不正确',
          type: 'warning'
        })
        return false
      }else{
        return true
      }
    },
    submitRes(){
      if(this.handelErrorForm()){
        if(this.form.id==-1){
          addCategory({
            'name':this.form.name,
            'toHome':this.form.toHome
          }).then(response => {
            if(response.status==200){
              this.dialogFormVisible=false
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.fetchData();
            }else{
              this.$message({
                message: '添加失败',
                type: 'warning'
              })
            }
          })
        }else{
          editCategory({
            'name':this.form.name,
            'toHome':this.form.toHome,
            'id':this.form.id
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
      }else{
        console.log("表单提交错误");
      }

    }
  }
}
</script>
