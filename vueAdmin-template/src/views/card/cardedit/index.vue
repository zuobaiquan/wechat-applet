<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="卡类型：" label-width="120px">
        <el-select clearable style="width: 200px" class="filter-item" v-model="selectitem">
          <el-option v-for="item in selectOptions" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form :model="form">
        <el-form-item label="库存：" label-width="120px">
          <el-input style="width:200px;" v-model="form.count" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item label="单次限购：" label-width="120px">
          <el-input style="width:200px;" v-model="form.limitBuyCount" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item label="卡价格：" label-width="120px">
          <el-input style="width:200px;" v-model="form.price" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item label="卡片介绍：" label-width="120px">
          <el-input type="textarea" :autosize="{ minRows:4, maxRows:6}" v-model="form.cardIntro" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div style="display:inline-block;">
        <label class="el-form-item__label" style="width: 120px;">卡封面：</label>
        <el-upload class="upload-demo" :show-file-list="false" drag :on-success="handleImageScucess" :action="baseURL">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
      <div v-if="form.coverUrl" style="margin-left:20px;display:inline-block">
        <img @click="handlePictureCardPreview(form.coverUrl)" :src="form.coverUrl" alt="" style="max-width:400px;max-height:320px;cursor:pointer;vertical-align: middle;">
      </div>
      <br /><br />
      <div style="display:inline-block;">
        <label class="el-form-item__label" style="width: 120px;">卡小封面：</label>
        <el-upload class="upload-demo" :show-file-list="false" drag :on-success="handleImageScucess2" :action="baseURL">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
      <div v-if="form.smallCoverUrl" style="margin-left:120px;display:inline-block">
        <img @click="handlePictureCardPreview(form.smallCoverUrl)" :src="form.smallCoverUrl" alt="" style="max-width:400px;max-height:320px;cursor:pointer;vertical-align: middle;">
      </div>
      <br /><br />
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
import { getCardbyId,addCard,editCard } from '@/api/card'
export default {
  data() {
    return {
      selectitem:'',
      selectOptions:[
        {'id':1,'name':'菜地卡'},
        {'id':2,'name':'选鸡卡'}
      ],
      form: {
        count: '',
        limitBuyCount:'',
        price:'',
        cardIntro:'',
        coverUrl:'',
        smallCoverUrl:'',
        id:-1
      },
      dialogVisible2:false,
      dialogImageUrl:'',
      baseURL:process.env.BASE_API+'/api/oss',
      editid:this.$route.params.id,
      flag:this.$route.params.flag
    }
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
      getCardbyId(this.editid).then(response => {
        this.form = response.data.content[0];
        this.selectitem=this.form.chickenId || this.form.graderId
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file;
      this.dialogVisible2 = true;
    },
    handleImageScucess(response, file, fileList){
      this.form.coverUrl=response.data
    },
    handleImageScucess2(response, file, fileList){
      this.form.smallCoverUrl=response.data
    },
    handelErrorForm(){
      if(this.selectitem==""){
        this.$message({
          message: '卡类型不能为空',
          type: 'warning'
        })
        return false
      }
      if(this.form.count==""){
        this.$message({
          message: '库存不能为空',
          type: 'warning'
        })
        return false
      }
      if(!/^\+?[1-9]\d*$/.test(this.form.count)){
        this.$message({
          message: '库存格式应该为正整数',
          type: 'warning'
        })
        return false
      }
      if(this.form.limitBuyCount==""){
        this.$message({
          message: '单次限购不能为空',
          type: 'warning'
        })
        return false
      }
      if(!/^\+?[1-9]\d*$/.test(this.form.limitBuyCount)){
        this.$message({
          message: '单次限购格式应该为正整数',
          type: 'warning'
        })
        return false
      }
      if(this.form.limitBuyCount>this.form.count){
        this.$message({
          message: '单次限购数量不能超过库存数',
          type: 'warning'
        })
        return false
      }
      if(this.form.price==""){
        this.$message({
          message: '卡价格不能为空',
          type: 'warning'
        })
        return false
      }
      if(!/(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{1,2}$)/.test(this.form.price)){
        this.$message({
          message: '卡价格格式不正确',
          type: 'warning'
        })
        return false
      }
      if(this.form.cardIntro==""){
        this.$message({
          message: '卡片介绍不能为空',
          type: 'warning'
        })
        return false
      }
      if(this.form.coverUrl==""){
        this.$message({
          message: '卡封面不能为空',
          type: 'warning'
        })
        return false
      }
      if(this.form.smallCoverUrl==""){
        this.$message({
          message: '卡小封面不能为空',
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
        var postData={}
        this.selectitem==1?postData={
          'graderId':1,
          'count':this.form.count,
          'limitBuyCount':this.form.limitBuyCount,
          'price':this.form.price,
          'cardIntro':this.form.cardIntro,
          'coverUrl':this.form.coverUrl,
          'smallCoverUrl':this.form.smallCoverUrl
        }:postData={
          'chickenId':1,
          'count':this.form.count,
          'limitBuyCount':this.form.limitBuyCount,
          'price':this.form.price,
          'cardIntro':this.form.cardIntro,
          'coverUrl':this.form.coverUrl,
          'smallCoverUrl':this.form.smallCoverUrl
        }
        if(this.flag==-1){
          postData.id=this.editid
          editCard(postData).then(response => {
            if(response.status==200){
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.$router.push({ name: 'Cardsetting'})
            }else{
              this.$message({
                message: '修改失败',
                type: 'warning'
              })
            }
          })
        }else{
          addCard(postData).then(response => {
            if(response.status==200){
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.$router.push({ name: 'Cardsetting'})
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
