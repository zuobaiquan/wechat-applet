<template>
  <div class="app-container">
    <el-button @click="handleAdd(1,-1)" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">添加</el-button>
    <br /><br />
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{(currentPage-1)*5+scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="banner描叙" align="center">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="banner图片" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.coverUrl" alt="" style="max-height:150px;max-width:150px;">
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
        <el-form-item label="banner标题" label-width="120px">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <label class="el-form-item__label" style="width: 120px;">banner图片</label>
        <el-upload class="upload-demo" drag :before-upload="handleImagebeforeUpload" :on-success="handleImageScucess" :action="baseURL" :data="uploadData">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-upload>
      </div>
      <div v-if="form.coverUrl" style="margin-left:120px;">
        <img :src="form.coverUrl" alt="" style="max-height:200px;max-height:200px;" width="80%" height="80%">
      </div>
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
import { getBannerList,addNewBanner,editNewBanner,deleteBanner } from '@/api/index'
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      dialogTitle:'添加banner',
      form: {
        title: '',
        coverUrl:'',
        id:-1
      },
      baseURL:process.env.BASE_API+'/api/oss',
      uploadData:{
        key:''
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
      getBannerList({'page':this.currentPage-1,'size':5}).then(response => {
        this.list = response.data.content;
        this.totalNum=response.data.totalElements
        this.listLoading = false
      })
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
.upload-container {
  width: 100%;
  position: relative;
  overflow: hidden;
  .image-uploader {
    margin-left: 120px;
    float: left;
  }
  .image-preview {
    width: 200px;
    height: 200px;
    position: relative;
    border: 1px dashed #d9d9d9;
    float: left;
    margin-left: 50px;
    .image-preview-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .image-preview-action {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, .5);
      transition: opacity .3s;
      cursor: pointer;
      text-align: center;
      line-height: 200px;
      .el-icon-delete {
          font-size: 36px;
      }
    }
    &:hover {
      .image-preview-action {
        opacity: 1;
      }
    }
  }
}
</style>
