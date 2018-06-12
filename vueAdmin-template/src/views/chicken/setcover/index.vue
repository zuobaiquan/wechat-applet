<template>
  <div class="app-container edit-ads">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="买鸡封面">
        <el-upload class="upload-demo" :show-file-list="false" drag :on-success="handleImageScucess" :action="baseURL">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <div v-if="form.chickenBannerUrl" style="margin-left:20px;display:inline-block;">
          <img @click="handlePictureCardPreview(form.chickenBannerUrl)" :src="form.chickenBannerUrl" alt="" style="max-width:400px;max-height:320px;cursor:pointer;vertical-align: middle;">
        </div>
      </el-form-item>
      <el-form-item label="">
          <el-button type="primary" @click="submitRes()">确 定</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import { getConfigCover,editConfigCover } from '@/api/chicken'
export default {
  data() {
    return {
      form: {
        id:'',
        chickenBannerUrl:''
      },
      baseURL:process.env.BASE_API+'/api/oss',
      dialogVisible:false,
      dialogImageUrl:''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getConfigCover({'page':0,'size':5}).then(response => {
        this.form = response.data.content[0];
      })
    },
    handleImageScucess(response, file, fileList){
      this.form.chickenBannerUrl=response.data
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file;
      this.dialogVisible = true;
    },
    submitRes(){
      if(this.form.chickenBannerUrl==""){
        this.$message({
          message: '请上传图片',
          type: 'warning'
        })
        return false
      }else{
        editConfigCover({
          'id':this.form.id,
          'chickenBannerUrl':this.form.chickenBannerUrl
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
}
</script>
