<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="活动名称" prop="title" style="width:50%">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="活动地址" prop="address" style="width:50%">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="活动联络" prop="contact" style="width:50%">
        <el-input v-model="form.contact"></el-input>
      </el-form-item>
      <el-form-item label="活动日期" label-width="120px" prop="time">
        <div class="block" style="display:inline-block;">
           {{form.time}}
           <el-date-picker
             v-model="form.time"
             type="daterange"
             range-separator="至 "
             start-placeholder="开始日期"
             end-placeholder="结束日期">
           </el-date-picker>
         </div>
         <el-input style="width:150px;" v-model="form.timeText" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="街舞风格" label-width="120px" prop="danceStyle.id">
        <el-select clearable class="filter-item" v-model="form.danceStyle.id" placeholder="请选择">
          <el-option v-for="item in selectOptions" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动价格" label-width="120px" prop="price" style="width:50%">
        <el-input v-model="form.price" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="活动内容" prop="content" style="width:50%">
          <el-input type="textarea" :autosize="{ minRows:4, maxRows:6}" v-model="form.content" auto-complete="off"></el-input>
      </el-form-item>
      <div style="display:inline-block;">
        <label class="el-form-item__label" style="width: 120px;">活动封面</label>
        <el-upload :show-file-list="false" class="upload-demo" drag :on-success="handleImageScucess" :action="baseURL">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
      <div v-if="form.coverUrl" style="margin-left:20px;display:inline-block">
        <img @click="handlePictureCardPreview(form)" :src="form.coverUrl" alt="" style="max-width:400px;max-height:400px;cursor:pointer;vertical-align: middle;" width="80%" height="80%">
      </div>
      <br /><br />
      <div style="display:inline-block;">
        <label class="el-form-item__label" style="width: 120px;">活动内容图片</label>
        <el-upload :show-file-list="false" class="upload-demo" drag :on-success="handleImageScucess2" :action="baseURL">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
      <div v-if="form.coverUrl" style="margin-left:20px;display:inline-block">
        <img @click="handlePictureCardPreview(form)" :src="form.contentImageUrl" alt="" style="max-width:400px;max-height:400px;cursor:pointer;vertical-align: middle;" width="80%" height="80%">
      </div>
      <br /><br />
      <el-form-item label="">
          <el-button type="primary" @click="submitRes('form')">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addActivity,editActivity,deleteActivity} from '@/api/activity'
import { getCategoryList} from '@/api/category'
export default {
  data() {
    var checkContact = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('活动联络不能为空'));
      }
      if(!/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value)){
        return callback(new Error('活动联络格式不正确'));
      }else{
        callback();
      }
    };
    // var checkPrice = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('活动价格不能为空'));
    //   }
    //   if(!/(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{1,2}$)/.test(value)){
    //     return callback(new Error('活动价格格式不正确'));
    //   }else{
    //     callback();
    //   }
    // };
    return {
      selectOptions:[],
      form: {
        title:'',
        address:'',
        time:'',
        timeText:'',
        contact:'',
        content:'',
        contentImageUrl:'',
        coverUrl:'',
        danceStyle:{
          id:''
        },
        endTime:'',
        startTime:'',
        type: "activity",
        price:''
      },
      rules: {
        title: [
          { required: true, message: '活动名称不能为空', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '活动地址不能为空', trigger: 'blur' }
        ],
        contact: [
          { required: true,validator: checkContact, trigger: 'blur' }
        ],
        time: [
          { required: true, message: '活动日期不能为空', trigger: 'blur' }
        ],
        danceStyle:{
          id: [
              { required: true, message: '请选择街舞风格', trigger: 'change' }
          ]
        },
        price: [
          { required: true, message: '活动价格不能为空', trigger: 'blur'  }
        ],
        content: [
          { required: true, message: '活动内容不能为空', trigger: 'blur' }
        ]
      },
      baseURL:process.env.BASE_API+'/api/oss',
      edit:this.$route.params.id,
      flag:this.$route.params.flag
    }
  },
  created() {
    if(this.flag==-1){
      this.fetchData()
    }else{
      this.$route.meta.title='活动添加'
    }
    getCategoryList({'page':0,'size':100}).then(response => {
      this.selectOptions = response.data.data.content
    })
  },
  methods: {
    handleImageScucess(response, file, fileList){
      this.form.coverUrl=response.data
    },
    handleImageScucess2(response, file, fileList){
      this.form.contentImageUrl=response.data
    },
    handelErrorForm(){
      if(this.form.time.length==0||this.form.timeText==''){
        this.$message({
          message: '活动日期不能为空',
          type: 'warning'
        })
        return false
      }
      if(this.form.coverUrl==''){
        this.$message({
          message: '请上传活动封面',
          type: 'warning'
        })
        return false
      }
      if(this.form.contentImageUrl==''){
        this.$message({
          message: '请上传活动内容图片',
          type: 'warning'
        })
        return false
      }
      else{
        return true
      }
    },
    submitRes(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.handelErrorForm()) {
          console.log('submit!');
          console.log(this.form);
          addActivity({
            'title':this.form.title,
            'address':this.form.address,
            'contact':this.form.contact,
            'content':this.form.content,
            'coverUrl':this.form.coverUrl,
            'startTime':this.form.time[0],
            'endTime':this.form.time[1],
            'timeText':this.form.timeText,
            'contentImageUrl':this.form.contentImageUrl,
            'price':this.form.price,
            "danceStyle": {
              "id": this.form.danceStyle.id
            },
            'type':'activity'
          }).then(response => {
            if(response.status==200){
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.$router.push({ name: 'activityIndex'})
            }else{
              this.$message({
                message: '添加失败',
                type: 'warning'
              })
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>
