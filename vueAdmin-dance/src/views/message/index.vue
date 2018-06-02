<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="消息标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="消息内容">
        <el-input type="textarea" :autosize="{ minRows:4, maxRows:6}" v-model="form.content" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="消息链接">
        <el-input v-model="form.linkUrl"></el-input>
      </el-form-item>
      <el-form-item label="消息封面">
          <el-upload class="upload-demo" :show-file-list="false" drag :on-success="handleImageScucess" :action="baseURL">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
      </el-form-item>
      <div v-if="form.coverUrl" style="margin-left:120px;">
        <img :src="form.coverUrl" alt="" style="max-width:200px;max-height:200px;" width="80%" height="80%">
      </div>
      <el-form-item label="">
          <el-button type="primary" @click="submitRes()">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addMessage } from '@/api/message'
export default {
  data() {
    return {
      form: {
        title: '',
        content:'',
        coverUrl:'',
        linkUrl:''
      },
      baseURL:process.env.BASE_API+'/api/oss'
    }
  },
  methods: {
    handleImageScucess(response, file, fileList){
      this.form.coverUrl=response.data
    },
    submitRes(){
      if(this.form.title==""){
        this.$message({
          message: '消息标题不能为空',
          type: 'warning'
        })
        return false
      }
      if(this.form.content==""){
        this.$message({
          message: '消息内容不能为空',
          type: 'warning'
        })
        return false
      }
      if(this.form.linkUrl==""){
        this.$message({
          message: '消息链接不能为空',
          type: 'warning'
        })
        return false
      }
      if(!(/^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i).test(this.form.linkUrl)){
        this.$message({
          message: '消息链接格式不正确',
          type: 'warning'
        })
        return false
      }
      if(this.form.coverUrl==""){
        this.$message({
          message: '消息封面不能为空',
          type: 'warning'
        })
        return false
      }
      addMessage({
        'title':this.form.title,
        'coverUrl':this.form.coverUrl,
        'linkUrl':this.form.linkUrl,
        'content':this.form.content,
        'type':'system'
        }).then(response => {
        if(response.status==200){
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.form.title=''
          this.form.content=''
          this.form.coverUrl=''
          this.form.linkUrl=''
        }else{
          this.$message({
            message: '添加失败',
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.line{
  text-align: center;
}
.el-upload-list {
    margin-left: 0 !important;
}
</style>
