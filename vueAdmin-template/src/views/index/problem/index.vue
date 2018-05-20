<template>
  <div class="app-container">
    <el-button @click="handleAdd(1,-1)" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">添加</el-button>
    &nbsp;&nbsp;&nbsp;
    <el-select clearable  @change='handleIndexSelect' class="filter-item" v-model="selectIndexitem" placeholder="选择分类">
      <el-option v-for="item in selectOptions" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
    </el-select>
    <br /><br />
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="问题" align="center">
        <template slot-scope="scope">
          {{scope.row.question}}
        </template>
      </el-table-column>
      <el-table-column label="回答" width="420" align="center">
        <template slot-scope="scope">
          {{scope.row.answer}}
        </template>
      </el-table-column>
      <el-table-column label="分类" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.category.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center">
        <template slot-scope="scope">
          {{scope.row.updateTime | parseTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button @click="handleAdd(-1,scope.row.id)" type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="delProblem(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="问题" label-width="120px">
          <el-input v-model="form.question" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item label="回答" label-width="120px">
          <el-input type="textarea" :autosize="{ minRows:4, maxRows:6}" v-model="form.answer" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item label="选择分类" label-width="120px">
          <el-select clearable @change='handleSelect' style="width: 200px" class="filter-item" v-model="selectitem">
            <el-option v-for="item in selectOptions" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
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
import { getProblemList,getCategoryList,addProblem,editProblem,deleteProblem } from '@/api/index'
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      dialogTitle:'添加问题',
      form: {
        question: '',
        answer:'',
        id:-1,
        categoryId:-1
      },
      selectitem:'',
      selectIndexitem:'',
      selectOptions:[],
      currentPage: 1,
      totalNum:1,
      type:false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getCategoryList({'page':0,'size':100}).then(response => {
        this.selectOptions = response.data.content;
      })
      getProblemList({'page':this.currentPage-1,'size':5},this.type,this.selectIndexitem).then(response => {
        this.list = response.data.content;
        this.totalNum=response.data.totalElements
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
       this.currentPage=val
       this.fetchData();
    },
    handleIndexSelect(){
      this.type=true
      this.fetchData();
    },
    handleSelect(){
      this.form.categoryId=this.selectitem;
    },
    delProblem(id){
      deleteProblem(id).then(response => {
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
        this.dialogTitle='添加问题'
        this.form.question=''
        this.form.answer=''
        this.selectitem=''
        this.dialogFormVisible = true
      }
      if(flag==-1){
        this.form.id=id
        this.dialogTitle='修改问题'
        this.list.forEach((item,index)=>{
          if(item.id==id){
            this.form.question=item.question
            this.form.answer=item.answer
            this.form.categoryId=this.selectitem=item.category.id
            this.dialogFormVisible = true
            return ;
          }
        })
      }
    },
    handelErrorForm(){
      if(this.form.question==""){
        this.$message({
          message: '问题不能为空',
          type: 'warning'
        })
        return false
      }
      if(this.form.answer==""){
        this.$message({
          message: '回答不能为空',
          type: 'warning'
        })
        return false
      }
      if(this.form.categoryId==-1){
        this.$message({
          message: '请选择分类',
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
          addProblem({
            'question':this.form.question,
            'answer':this.form.answer,
            'category':{
              'id':this.form.categoryId
            }
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
        }
        else{
          editProblem({
            'question':this.form.question,
            'answer':this.form.answer,
            'category':{
              'id':this.form.categoryId
            },
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
      }
      else{
        console.log("表单提交失败");
      }
    }
  }
}
</script>
