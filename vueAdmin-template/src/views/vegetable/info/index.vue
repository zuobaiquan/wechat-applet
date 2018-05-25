<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="菜地价格">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="航拍图">
          <el-upload class="upload-demo" drag :on-success="handleImageScucess" :action="baseURL">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
          <div v-if="form.coverUrl" style="display:inline-block">
            <img :src="form.coverUrl" alt="" style="max-width:300px;max-height:250px;" width="80%" height="80%">
          </div>
      </el-form-item>
      <el-form-item label="产品介绍">
        <Tinymce :height='300' :width="800" id="tinymce" ref="editor" v-model="form.text"></Tinymce>
          <!-- <el-input type="textarea" :autosize="{ minRows:4, maxRows:6}" v-model="form.text" auto-complete="off"></el-input> -->
      </el-form-item>
      <el-form-item label="">
          <el-button type="primary" @click="submitRes()">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { editInfo,getInfo } from '@/api/vegetable'
import Tinymce from '@/components/Tinymce'
export default {
  data() {
    return {
      form: {
        price: '',
        text:'',
        coverUrl:'',
        title:''
      },
      baseURL:process.env.BASE_API+'/api/oss',
    }
  },
  components:{
    Tinymce
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getInfo({'page':0,'size':1}).then(response => {
        this.form = response.data.content[0];
        this.listLoading = false
      })
    },
    // handleImagebeforeUpload(file){
    //   let name=file.name;
    //   let houzhui = name.substring(name.lastIndexOf('.') + 1);
    //   this.uploadData.key=Date.parse(new Date())+'.'+houzhui;
    // },
    handleImageScucess(response, file, fileList){
      this.form.coverUrl=response.data
    },
    submitRes(){
      if(this.form.price==""){
        this.$message({
          message: '菜地价格不能为空',
          type: 'warning'
        })
        return false
      }
      if(!/(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{1,2}$)/.test(this.form.price)){
        this.$message({
          message: '菜地价格格式不正确',
          type: 'warning'
        })
        return false
      }
      if(this.form.text==""){
        this.$message({
          message: '产品介绍不能为空',
          type: 'warning'
        })
        return false
      }
      if(this.form.coverUrl==""){
        this.$message({
          message: '航拍图不能为空',
          type: 'warning'
        })
        return false
      }
      editInfo({
        'id':this.form.id,
        'coverUrl':this.form.coverUrl,
        'text':this.form.text,
        'price':this.form.price,
        'title':this.form.title
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
.line{
  text-align: center;
}
.el-upload-list {
    margin-left: 0 !important;
}
</style>
