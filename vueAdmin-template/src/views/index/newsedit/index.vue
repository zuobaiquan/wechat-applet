<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="动态标题：">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <div style="display:inline-block;">
        <label class="el-form-item__label" style="width: 120px;">动态封面</label>
        <el-upload class="upload-demo" drag :show-file-list="false" :on-success="handleImageScucess" :action="baseURL">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
      <div v-if="form.coverUrl" style="margin-left:20px;display:inline-block">
        <img @click="handlePictureCardPreview(form.coverUrl)" :src="form.coverUrl" alt="" style="max-width:400px;max-height:320px;cursor:pointer;vertical-align: middle;">
      </div>
      <br /><br />
      <el-form-item label="内容详情：">
        <Tinymce :height='550' :width="800" id="tinymce" ref="editor" v-model="form.text"></Tinymce>
          <!-- <el-input type="textarea" :autosize="{ minRows:4, maxRows:6}" v-model="form.text" auto-complete="off"></el-input> -->
      </el-form-item>
      <el-form-item label="">
          <el-button type="primary" @click="submitRes()">确 定</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogVisible2">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import { getInfoArticlebyId,editInfoArticle,addInfoArticle } from '@/api/index'
import Tinymce from '@/components/Tinymce'
export default {
  data() {
    return {
      form: {
        title:'',
        text:'',
        coverUrl:''
      },
      dialogVisible2:false,
      dialogImageUrl:'',
      baseURL:process.env.BASE_API+'/api/oss',
      newsid:this.$route.params.newsid,
      flag:this.$route.params.flag
    }
  },
  components:{
    Tinymce
  },
  created() {
    if(this.flag==-1){
      this.fetchData()
    }else{
      this.$route.meta.title='添加动态'
    }
  },
  methods: {
    fetchData() {
      getInfoArticlebyId({'page':0,'size':1},this.newsid).then(response => {
        this.form = response.data.content[0];
      })
    },
    handleImageScucess(response, file, fileList){
      this.form.coverUrl=response.data
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file;
      this.dialogVisible2 = true;
    },
    handelErrorForm(){
      if(this.form.title==""){
        this.$message({
          message: '动态标题不能为空',
          type: 'warning'
        })
        return false
      }
      if(this.form.coverUrl==""){
        this.$message({
          message: '动态封面不能为空',
          type: 'warning'
        })
        return false
      }
      if(this.form.text==""){
        this.$message({
          message: '内容详情不能为空',
          type: 'warning'
        })
        return false
      }else{
        return true
      }
    },
    submitRes(){
      if(this.handelErrorForm()){
        if(this.flag==-1){
          editInfoArticle({
            'title':this.form.title,
            'text':this.form.text,
            'coverUrl':this.form.coverUrl,
            'id':this.newsid
          }).then(response => {
            if(response.status==200){
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.$router.push({ name: 'News'})
            }else{
              this.$message({
                message: '修改失败',
                type: 'warning'
              })
            }
          })
        }else{
          addInfoArticle({
            'type':1,
            'title':this.form.title,
            'text':this.form.text,
            'coverUrl':this.form.coverUrl
          }).then(response => {
            if(response.status==200){
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.$router.push({ name: 'News'})
            }else{
              this.$message({
                message: '添加失败',
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
