<template>
  <div class="app-container">
    <el-form>
      <el-form-item label="头像：" label-width="80px">
        <img style="width:100px;height:100px;border-radius:50%" :src="userInfo.avatar" alt="">
      </el-form-item>
      <el-form-item label="昵称：" label-width="80px">
        {{userInfo.nickName || '--'}}
      </el-form-item>
      <el-form-item label="电话：" label-width="80px">
        {{userInfo.phone || '--'}}
      </el-form-item>
      <el-form-item label="介绍：" label-width="80px">
        {{userInfo.intro || '--' }}
      </el-form-item>
      <el-form-item label="作品：" label-width="80px">
        <template v-if="workList.length>0">
          <el-row>
            <el-col :span="8" v-for="(item, index) in workList" :key="index" style="margin-bottom:10px;">
              <el-card :body-style="{ padding: '0px;' }">
                <img v-if="item.videoCoverUrl" @click="handlePictureCardPreview(item.videoCoverUrl)" :src="item.videoCoverUrl" style="width:100%;height:150px;" class="image">
                <div v-if="item.videoUrl">
                  <video :src="item.videoUrl" width="320" height="240" controls="controls">
                  Your browser does not support the video tag.
                  </video>
                </div>
                <div style="text-align:center">
                  {{item.musicName}}
                </div>
              </el-card>
            </el-col>
          </el-row>
        </template>
        <template v-if="workList.length==0">暂无作品信息
        </template>
      </el-form-item>
      <el-form-item label="海报：" label-width="80px">
        <el-row v-if="posterList.length>0">
          <el-col :span="8" v-for="(item, index) in posterList" :key="index" style="margin-bottom:10px;">
            <el-card :body-style="{ padding: '0px;' }">
              <img v-if="item.imageUrl" @click="handlePictureCardPreview(item.imageUrl)" :src="item.imageUrl" style="width:100%;height:150px;" class="image">
              <div style="text-align:center">
                {{item.musicName}}
              </div>
            </el-card>
          </el-col>
        </el-row>
        <span v-if="posterList.length==0">暂无海报信息</span>
      </el-form-item>
      <el-form-item label="" label-width="80px">
        <el-button @click="backTolist()">返回列表</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import { getUserWorks,getUserInfo } from '@/api/user'
export default {
  data() {
    return {
      posterList:[],
      workList:[],
      userInfo:[],
      uid:this.$route.params.uid,
      type:this.$route.params.type,
      dialogVisible:false,
      dialogImageUrl:''
    }
  },
  created(){
    getUserInfo({'id':this.uid}).then(response => {
      this.userInfo=response.data.data
    })
    getUserWorks({'uid':this.uid,type:'works'}).then(response => {
      this.workList=response.data.data
    })
    getUserWorks({'uid':this.uid,type:'poster'}).then(response => {
      this.posterList=response.data.data
    })
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file
      this.dialogVisible = true
    },
    backTolist(){
      this.$router.push({ name: this.type=='teacher'?'Teacher':'Stuednt'})
    }
  }
}
</script>
