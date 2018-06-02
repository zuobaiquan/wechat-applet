<template>
  <div class="app-container" v-if="hasData">
    <el-form :model="formData">
      <el-form-item label="菜地分区：" label-width="150px">
        {{formData.gardenItem.gardenArea.name}}&nbsp;&nbsp;&nbsp;{{formData.gardenItem.sn}}
      </el-form-item>
      <el-form-item label="有效期：" label-width="150px">
        <span>{{formData.startTime |  parseTime('{y}-{m}-{d}')}}</span>&nbsp;~&nbsp;<span>{{formData.endTime |  parseTime('{y}-{m}-{d}')}}</span>
        &nbsp;&nbsp;({{compareTime(formData.endTime)}})
      </el-form-item>
      <el-form-item label="用户昵称：" label-width="150px">
        {{formData.user.nickName }}
      </el-form-item>
      <el-form-item label="手机号：" label-width="150px">
        {{formData.user? formData.user.phone :'' || formData.address? formData.address.phone:'--' }}
      </el-form-item>
      <el-form-item label="默认收货信息：" label-width="150px">
        {{formData.address ? formData.address.province+formData.address.city+formData.address.area+formData.address.address :'--' }}
        <p>{{formData.address ? formData.address.name+" "+formData.address.phone:'--' }}</p>
      </el-form-item>
      <el-form-item label="菜地主图：" label-width="150px">
        <el-upload class="upload-demo" drag :on-success="handleImageScucess2" :action="baseURL">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <img :src="formData.coverUrl" @click="handlePictureCardPreview(formData.coverUrl,0)"  alt="" style="vertical-align: middle;max-width:300px;max-height:250px;cursor:pointer;" width="80%" height="80%">
      </el-form-item>
      <el-form-item label="管家汇报：" label-width="150px">
        <el-button type="primary" @click="editNewReport(-1,-1)" size="small" icon="el-icon-edit">添加汇报</el-button>
      </el-form-item>
      <el-form-item label="" label-width="150px">
        <div v-if="reportList.length!==0" style="margin-bottom:5px;" v-for="(item,index) in reportList">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{item.createTime | parseTime}}</span>
              <el-button @click="editNewReport(item.id,index)" style="padding: 5px;margin-left:40px;" type="text">编辑</el-button>
              <el-button @click="deleteReport(item.id,index)" style="padding: 5px;margin-left:20px;" type="text">删除</el-button>
            </div>
            <div slot="header" class="clearfix">
              <span style="line-height:22px;display: inline-block;">{{item.content}}</span>
            </div>
            <div v-for="o in item.medias" class="text item" style="display:inline-block">
              <img @click="handlePictureCardPreview(o)" :src="o.url" alt="" style="max-width:200px;max-height:150px;cursor:pointer" width="80%" height="80%">
            </div>
          </el-card>
        </div>
        <div v-if="reportList.length!==0">
          <el-pagination v-if="totalNum/10>1"
            background
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 10, 20, 30]"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="totalNum">
          </el-pagination>
        </div>
        <div v-if="reportList.length==0" @click="editNewReport(-1,-1)" style="display:inline-block;cursor:pointer">
          暂无汇报信息，可点击添加
        </div>
      </el-form-item>
    </el-form>
    <el-dialog :title="editFlag?'编辑汇报':'添加汇报'" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="汇报内容：" label-width="120px">
          <el-input type="textarea" :autosize="{ minRows:4, maxRows:6}" v-model="form.content" auto-complete="off"></el-input>
        </el-form-item>
        <div class="huibao-list">
          <label class="el-form-item__label" style="width: 120px;">汇报图片</label>
          <el-upload
            :action="baseURL"
            list-type="picture-card"
            :before-upload="handleImagebeforeUpload"
            :on-preview="handlePictureCardPreview"
            :on-success="handleImageScucess"
            :file-list="addMedia"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-upload>
        </div>
        <div v-if="form.coverUrl" style="margin-left:120px;">
          <img @click="handlePictureCardPreview(form)" :src="form.coverUrl" alt="" title="点击查看大图" style="max-height:200px;max-height:200px;" width="80%" height="80%">
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRes()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible2">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import { addReport,getSalebyId,getReportbyId,deleteReport,editReport,editInfoBill } from '@/api/vegetable'
export default {
  data() {
    return {
      formData:{

      },
      form: {
        content: '',
        coverUrl:'',
        billId:-1
      },
      baseURL:process.env.BASE_API+'/api/oss',
      hasData:false,
      dialogFormVisible:false,
      billId:this.$route.params.billid,
      reportList:[],
      addMedia:[],
      editFlag:false,
      dialogVisible2:false,
      dialogImageUrl:'',
      currentPage: 1,
      totalNum:1
    }
  },
  created() {
    getSalebyId(this.billId).then(response => {
      this.formData=response.data.content[0]
      this.hasData=true
    })
    this.getReportlist()
  },
  methods: {
    getReportlist(){
      getReportbyId({'page':this.currentPage-1,'size':10},this.billId).then(response => {
        this.reportList=response.data.content
        this.totalNum=response.data.totalElements
      })
    },
    handleCurrentChange(val) {
       this.currentPage=val
       this.getReportlist();
    },
    uploadImg(){
      this.$router.push({ name: 'vegetableInfo'})
    },
    editNewReport(id,index){
      this.dialogFormVisible= true
      this.form.reportid=id
      if(index!==-1){
        this.editFlag=true
        this.form.content=this.reportList[index].content
        this.addMedia=[]
        this.reportList[index].medias.map((item,index)=>{
          this.addMedia.push(
            {'id':item.id,'url':item.url}
          )
        })
        //this.addMedia=this.reportList[index].medias
      }else{
        this.addMedia=[]
        this.form.content=''
        this.editFlag=false
      }
    },
    deleteReport(id,index){
      deleteReport(id).then(response => {
        if(response.status==200){
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.reportList.splice(index,1)
        }else{
          this.$message({
            message: '删除失败',
            type: 'warning'
          })
        }
      })
    },
    handlePictureCardPreview(file,type=1) {
      if(type==1){
        this.dialogImageUrl = file.url || file.coverUrl;
      }
      else{
        this.dialogImageUrl = file
      }
      this.dialogVisible2 = true;
    },
    compareTime(date){
      var comdate = new Date(date);
      var d2=new Date();//取今天的日期
      var d1 = new Date(Date.parse(comdate));
      if(d1>d2){
        return '未过期'
      }else{
        return '已过期'
      }
    },
    handelErrorForm(){
      if(this.form.content==""){
        this.$message({
          message: '汇报内容不能为空',
          type: 'warning'
        })
        return false
      }
      if(this.addMedia.length==0){
        this.$message({
          message: '汇报图片至少一张',
          type: 'warning'
        })
        return false
      }else{
        return true
      }
    },
    submitRes(){
      if(this.handelErrorForm()){
        if(this.editFlag){
          editReport({
            'id':this.form.reportid,
            'content':this.form.content,
            'medias':this.addMedia,
            'content':this.form.content
          }).then(response => {
            if(response.status==200){
              this.dialogFormVisible=false
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.dialogFormVisible= false
              this.getReportlist()
            }else{
              this.$message({
                message: '修改失败',
                type: 'warning'
              })
            }
          })
        }else{
          addReport({
            'billId':this.billId,
            'content':this.form.content,
            'medias':this.addMedia,
            'content':this.form.content
          }).then(response => {
            if(response.status==200){
              this.dialogFormVisible=false
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.dialogFormVisible= false
              this.getReportlist()
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

    },
    handleImagebeforeUpload(file){
      if(this.addMedia.length>=9){
        this.$message({
          message: '照片数量限制9张',
          type: 'warning'
        })
        return ;
      }
    },
    handleImageScucess(response, file, fileList){
      this.addMedia.push({'type':0,'url':response.data})
    },
    handleImageScucess2(response, file, fileList){
      editInfoBill({
        'id':this.billId,
        'coverUrl':response.data
      }).then(response2 => {
        if(response2.status==200){
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.formData.coverUrl=response.data
        }else{
          this.$message({
            message: '修改失败',
            type: 'warning'
          })
        }
      })
    },
    handleRemove(file, fileList){
      if(this.editFlag){
        this.addMedia.map((item,index)=>{
          if(item.url==file.url){
            this.addMedia.splice(index,1)
          }
        })
      }else{
        this.addMedia.map((item,index)=>{
          if(item.url==file.response.data){
            this.addMedia.splice(index,1)
          }
        })
      }
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
