<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容详情">
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
import { getInfoArticlebyId,editInfoArticle,addInfoArticle } from '@/api/index'
import Tinymce from '@/components/Tinymce'
export default {
  data() {
    return {
      form: {
        title:'',
        text:''
      },
      infoid:this.$route.params.infoid,
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
      this.$route.meta.title='信息添加'
    }
  },
  methods: {
    fetchData() {
      getInfoArticlebyId({'page':0,'size':1},this.infoid).then(response => {
        this.form = response.data.content[0];
      })
    },
    // handleImagebeforeUpload(file){
    //   let name=file.name;
    //   let houzhui = name.substring(name.lastIndexOf('.') + 1);
    //   this.uploadData.key=Date.parse(new Date())+'.'+houzhui;
    // },
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
        if(this.flag==-1){
          editInfoArticle({
            'title':this.form.title,
            'text':this.form.text,
            'id':this.infoid
          }).then(response => {
            if(response.status==200){
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.$router.push({ name: 'Info'})
            }else{
              this.$message({
                message: '修改失败',
                type: 'warning'
              })
            }
          })
        }else{
          addInfoArticle({
            'title':this.form.title,
            'text':this.form.text
          }).then(response => {
            if(response.status==200){
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.$router.push({ name: 'Info'})
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
