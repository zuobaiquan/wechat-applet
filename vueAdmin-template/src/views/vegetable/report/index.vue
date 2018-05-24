<template>
  <div class="app-container">
    <el-form :model="formData">
      <el-form-item label="菜地分区：" label-width="150px">
        {{formData.gardenItem.gardenArea.name}}
      </el-form-item>
      <el-form-item label="有效期：" label-width="150px">
        <span>{{formData.startTime |  parseTime('{y}-{m}-{d}')}}</span>-<span>{{formData.endTime |  parseTime('{y}-{m}-{d}')}}</span>
      </el-form-item>
      <el-form-item label="用户昵称：" label-width="150px">
        {{formData.user.nickName }}
      </el-form-item>
      <el-form-item label="手机号：" label-width="150px">
        {{formData.address.phone || formData.user.phone || '--' }}
      </el-form-item>
      <el-form-item label="默认收货信息：" label-width="150px">
        {{formData.address.address }}
      </el-form-item>
      <el-form-item label="菜地主图：" label-width="150px">
        <img :src="formData.gardenItem.gardenArea.garden.coverUrl" alt="" style="max-width:200px;max-height:200px;" width="80%" height="80%">
      </el-form-item>
      <el-form-item label="管家汇报：" label-width="150px">
        <el-button type="primary" @click="addNewReport()" size="small" icon="el-icon-edit">添加汇报</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="添加汇报" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="汇报内容：" label-width="120px">
          <el-input type="textarea" :autosize="{ minRows:4, maxRows:6}" v-model="form.content" auto-complete="off"></el-input>
        </el-form-item>
        <div>
          <label class="el-form-item__label" style="width: 120px;">汇报图片</label>
          <el-upload class="upload-demo" drag :before-upload="handleImagebeforeUpload" :on-success="handleImageScucess" :action="baseURL" :data="uploadData">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-upload>
        </div>
        <div v-if="form.coverUrl" style="margin-left:120px;">
          <img :src="form.coverUrl" alt="" style="max-height:200px;max-height:200px;" width="80%" height="80%">
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRes()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addReport } from '@/api/vegetable'
export default {
  data() {
    return {
      formData:this.$route.query,
      form: {
        content: '',
        coverUrl:'',
        billId:-1
      },
      baseURL:process.env.BASE_API+'/api/oss',
      uploadData:{
        key:''
      },
      dialogFormVisible:false
    }
  },
  created() {
    console.log(this.formData);
  },
  methods: {
    addNewReport(){
      this.dialogFormVisible= true
    },
    submitRes(){
      addReport({
        'billId':this.$route.params.billid,
        'content':this.form.content,
        'medias':[{
          'type':0,
          'url':this.form.coverUrl
          }
        ],
        'content':this.form.content
      }).then(response => {
        if(response.status==200){
          this.dialogFormVisible=false
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.$router.push({ name: 'sale'})
        }else{
          this.$message({
            message: '添加失败',
            type: 'warning'
          })
        }
      })
    },
    handleImagebeforeUpload(file){
      let name=file.name;
      let houzhui = name.substring(name.lastIndexOf('.') + 1);
      this.uploadData.key=Date.parse(new Date())+'.'+houzhui;
    },
    handleImageScucess(response, file, fileList){
      this.form.coverUrl=response.data
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.app-container{
  .el-form-item__label{
    font-size: 16px;
  }
}
</style>
