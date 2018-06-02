<template>
  <div class="app-container">
    <el-button @click="handleAdd()" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">添加</el-button>
    <br /><br />
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
            {{(currentPage-1)*10+scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column min-width="300px" label="分类名称">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.name"></el-input>
            <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
          </template>
          <span v-else>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" label="操作" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">确定</el-button>
          <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="delCategory(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="form.name" auto-complete="off"></el-input>
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
import { getCategoryList,editCategory,addCategory,deleteCategory } from '@/api/index'
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      form: {
        name: ''
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
    delCategory(id){
      deleteCategory(id).then(response => {
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
    handleAdd(){
      this.dialogFormVisible=true
      this.form.name=''
    },
    submitRes(){
      if(this.form.name==""){
        this.$message({
          message: '分类名称不能为空',
          type: 'warning'
        })
        return false
      }
      addCategory({
        'name':this.form.name
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
    },
    cancelEdit(row) {
      row.name = row.originalName
      row.edit = false
      this.$message({
        message: '已取消修改',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      if(row.name==""){
        this.$message({
          message: '分类名称不能为空',
          type: 'warning'
        })
        return false
      }
      row.edit = false
      row.originalName = row.name
      editCategory({
        'name':row.name,
        'id':row.id
      }).then(response => {
        if(response.status==200){
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }else{
          this.$message({
            message: '修改失败',
            type: 'warning'
          })
        }
      })
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
