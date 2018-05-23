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
        <el-button type="primary" size="small" icon="el-icon-edit">添加汇报</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getSaleList,getAreaList } from '@/api/vegetable'
export default {
  data() {
    return {
      formData:this.$route.params
    }
  },
  created() {
    console.log(this.$route.params);
  },
  methods: {

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
