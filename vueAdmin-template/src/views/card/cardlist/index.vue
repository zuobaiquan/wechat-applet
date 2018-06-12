<template>
  <div class="app-container">
    <!-- <el-button @click="handleAdd(1,-1)" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">添加</el-button>
    <br /><br /> -->
    卡号：<el-input style="width: 120px;" class="filter-item" placeholder="请输入" v-model="searchObj.cardNo"></el-input>
    &nbsp;&nbsp;&nbsp;&nbsp;
    卡类型&nbsp;&nbsp;<el-select clearable style="width: 120px" class="filter-item" v-model="searchObj.cardType" placeholder="选择卡类型">
    <el-option v-for="item in selectOptions" :key="item.id" :label="item.name" :value="item.id">
    </el-option>
    </el-select>
    &nbsp;&nbsp;&nbsp;&nbsp;
    状态&nbsp;&nbsp;<el-select clearable style="width: 120px" class="filter-item" v-model="searchObj.status" placeholder="选择状态">
    <el-option v-for="item in selectOptionsStatus" :key="item.id" :label="item.name" :value="item.id">
    </el-option>
    </el-select>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    <br /><br />
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{(currentPage-1)*10+scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="卡类型" align="center">
        <template slot-scope="scope">
          {{scope.row.card?(scope.row.card.graderId==1?'菜地卡':(scope.row.card.chickenId==1?'选鸡卡':'--')):'--'}}
        </template>
      </el-table-column>
      <el-table-column label="卡号" align="center">
        <template slot-scope="scope">
          {{scope.row.cardNo || '--'}}
        </template>
      </el-table-column>
      <el-table-column label="密码" align="center">
        <template slot-scope="scope">
          {{scope.row.password || '--'}}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{scope.row.status==0?'未出售':(scope.row.status==1?'已出售':'已使用') || '--'}}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{scope.row.createTime | parseTime}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleAdd(-1,scope.row.id)" type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="delBanner(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标题" label-width="120px">
          <el-input v-model="form.title" auto-complete="off"></el-input>
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
import { getCardRecordList } from '@/api/card'
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      dialogTitle:'添加',
      form: {
        title: '',
        coverUrl:'',
        id:-1
      },
      selectOptionsStatus:[
        {'id':0,'name':'未售'},
        {'id':1,'name':'已售'},
        {'id':2,'name':'已使用'}
      ],
      selectOptions:[
        {'id':1,'name':'菜地卡'},
        {'id':2,'name':'选鸡卡'}
      ],
      currentPage: 1,
      totalNum:1,
      searchObj:{
        type:-1,
        status:'',
        cardNo:'',
        cardType:''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getCardRecordList({'page':this.currentPage-1,'size':10},this.searchObj).then(response => {
        this.list = response.data.content;
        this.totalNum=response.data.totalElements
        this.listLoading = false
      })
    },
    handleFilter(){
      if(this.searchObj.cardNo!==''&&this.searchObj.cardType==''&&this.searchObj.status==''){
        this.searchObj.type=0
      }
      if(this.searchObj.cardNo==''&&this.searchObj.cardType!==''&&this.searchObj.status==''){
        this.searchObj.type=1
      }
      if(this.searchObj.cardNo==''&&this.searchObj.cardType==''&&this.searchObj.status!==''){
        this.searchObj.type=2
      }
      if(this.searchObj.cardNo!==''&&this.searchObj.cardType!==''&&this.searchObj.status==''){
        this.searchObj.type=3
      }
      if(this.searchObj.cardNo!==''&&this.searchObj.cardType==''&&this.searchObj.status!==''){
        this.searchObj.type=4
      }
      if(this.searchObj.cardNo==''&&this.searchObj.cardType!==''&&this.searchObj.status!==''){
        this.searchObj.type=5
      }
      if(this.searchObj.cardNo!==''&&this.searchObj.cardType!==''&&this.searchObj.status!==''){
        this.searchObj.type=6
      }
      this.fetchData()
    },
    delBanner(id){
      deleteBanner(id).then(response => {
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
    handleCurrentChange(val) {
       this.currentPage=val
       this.fetchData();
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.coverUrl;
      this.dialogVisible2 = true;
    },
    handleAdd(flag,id){
      if(flag==1){
        this.form.id=-1
        this.dialogTitle='添加banner'
        this.form.title=''
        this.form.coverUrl=''
        this.dialogFormVisible = true
      }
      if(flag==-1){
        this.form.id=id
        this.dialogTitle='修改banner'
        this.list.forEach((item,index)=>{
          if(item.id==id){
            this.form.title=item.title
            this.form.coverUrl=item.coverUrl
            this.dialogFormVisible = true
            return ;
          }
        })
      }
    },
    handleImagebeforeUpload(file){
      let name=file.name;
      let houzhui = name.substring(name.lastIndexOf('.') + 1);
      this.uploadData.key=Date.parse(new Date())+'.'+houzhui;
    },
    handleImageScucess(response, file, fileList){
      this.form.coverUrl=response.data
    },
    handelErrorForm(){
      if(this.form.title==""){
        this.$message({
          message: '图片标题不能为空',
          type: 'warning'
        })
        return false
      }
      if(this.form.coverUrl==""){
        this.$message({
          message: '图片不能为空',
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
          addNewBanner({'coverUrl':this.form.coverUrl,'title':this.form.title}).then(response => {
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
          editNewBanner({
            'coverUrl':this.form.coverUrl,
            'title':this.form.title,
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
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
