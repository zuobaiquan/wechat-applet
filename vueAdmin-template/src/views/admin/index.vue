<template>
  <div class="app-container">
    <el-button @click="handleAdd(1,-1)" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">添加</el-button>
    <br /><br />
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="100">
        <template slot-scope="scope">
          {{(currentPage-1)*5+scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          {{scope.row.account}}
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          {{scope.row.realName}}
        </template>
      </el-table-column>
      <el-table-column label="联系方式" align="center">
        <template slot-scope="scope">
          {{scope.row.phone}}
        </template>
      </el-table-column>
      <el-table-column label="部门职位" align="center">
        <template slot-scope="scope">
          {{scope.row.department}}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{scope.row.userType}}
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
        <el-form-item label="banner标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <label class="el-form-item__label" style="width: 120px;">banner标题</label>
        <el-upload class="upload-demo" drag :before-upload="handleImagebeforeUpload" :on-success="handleImageScucess" :action="baseURL" :data="uploadData">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-upload>
      </div>
      <div v-if="form.coverUrl">
        <img :src="form.coverUrl" alt="" width="100%" height="100%">
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
import { getAdminList } from '@/api/admin'
import { Message, MessageBox } from 'element-ui'
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      dialogTitle:'新增banner',
      form: {
        title: '',
        coverUrl:'',
        id:-1
      },
      formLabelWidth: '120px',
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
      getAdminList({'page':this.currentPage-1,'size':5}).then(response => {
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
        this.dialogTitle='新增banner'
        this.form.title=''
        this.form.coverUrl=''
        this.dialogFormVisible = true
      }
      if(flag==-1){
        this.form.id=id
        this.dialogTitle='编辑banner'
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
        Message({
          message: "图片标题不能为空",
          type: 'error',
          duration: 5 * 1000
        })
        return false
      }
      if(this.form.coverUrl==""){
        Message({
          message: "图片不能为空",
          type: 'error',
          duration: 5 * 1000
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
              Message({
                message: "添加成功",
                type: 'success',
                duration: 5 * 1000
              })
              this.fetchData();
            }else{
              Message({
                message: "添加失败",
                type: 'error',
                duration: 5 * 1000
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
