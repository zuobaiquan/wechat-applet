<template>
  <div class="app-container">
    <el-button @click="handleAdd(1,-1)" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">添加</el-button>
    <br /><br />
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{(currentPage-1)*10+scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="标题" align="center">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="概要" align="center">
        <template slot-scope="scope">
          {{scope.row.summary}}
        </template>
      </el-table-column>
      <el-table-column width="200" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleAdd(-1,scope.row.id)" size="small" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="delArticle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标题" label-width="120px">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item label="概要" label-width="120px">
          <el-input v-model="form.summary" auto-complete="off"></el-input>
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
      :page-sizes="[1, 10, 20, 30]"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="totalNum">
    </el-pagination>
  </div>
</template>
<script>
import { getInfoArticle,editInfoArticle,addInfoArticle,deleteInfoArticle } from '@/api/index'
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      dialogTitle:'添加文章',
      form: {
        title: '',
        summary:'',
        id:-1
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
      getInfoArticle({'page':this.currentPage-1,'size':10}).then(response => {
        this.list = response.data.content;
        this.totalNum=response.data.totalElements
        this.list = this.list.map(v => {
          this.$set(v, 'edit', false)
          v.originalName = v.name
          return v
        })
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
       this.currentPage=val
       this.fetchData();
    },
    delArticle(id){
      deleteInfoArticle(id).then(response => {
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
        this.dialogTitle='添加文章'
        this.form.title=''
        this.form.summary=''
        this.dialogFormVisible = true
      }
      if(flag==-1){
        this.form.id=id
        this.dialogTitle='修改文章'
        this.list.forEach((item,index)=>{
          if(item.id==id){
            this.form.title=item.title
            this.form.summary=item.summary
            this.dialogFormVisible = true
            return ;
          }
        })
      }
    },
    handelErrorForm(){
      if(this.form.title==""){
        this.$message({
          message: '标题不能为空',
          type: 'warning'
        })
        return false
      }
      if(this.form.summary==""){
        this.$message({
          message: '概要不能为空',
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
          addInfoArticle({
            'title':this.form.title,
            'summary':this.form.summary
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
          editInfoArticle({
            'title':this.form.title,
            'summary':this.form.summary,
            'id':this.form.id
          }).then(response => {
            if(response.status==200){
              this.dialogFormVisible=false
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.fetchData()
            }else{
              this.$message({
                message: '修改失败',
                type: 'warning'
              })
            }
          })
        }
      }else{
        console.log("表单提交失败");
      }
    }
  }
}
</script>
<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
