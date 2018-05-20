<template>
  <div class="app-container">
    <el-button @click="handleAdd()" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">添加</el-button>
    <br /><br />
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="100">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="banner描叙" align="center">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="banner图片" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.url" alt="" style="max-height:150px;max-width:150px;">
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="handleAdd()" type="primary" size="small" icon="el-icon-edit">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增banner" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="banner标题" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <label class="el-form-item__label" style="width: 120px;">banner标题</label>
        <el-upload class="upload-demo" drag :action="baseURL" :data="uploadData">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </el-upload>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getBannerList } from '@/api/index'
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      baseURL:process.env.BASE_API+'/api/oss',
      uploadData:{
        key:'dddd'
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getBannerList({'page':0,'size':5}).then(response => {
        this.list = response.data.content;
        this.listLoading = false
      })
    },
    handleAdd(){
      this.dialogFormVisible = true
    },
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.upload-container {
  width: 100%;
  position: relative;
  overflow: hidden;
  .image-uploader {
    margin-left: 120px;
    float: left;
  }
  .el-upload-list{
    margin-left: 120px;
  }
  .image-preview {
    width: 200px;
    height: 200px;
    position: relative;
    border: 1px dashed #d9d9d9;
    float: left;
    margin-left: 50px;
    .image-preview-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .image-preview-action {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, .5);
      transition: opacity .3s;
      cursor: pointer;
      text-align: center;
      line-height: 200px;
      .el-icon-delete {
          font-size: 36px;
      }
    }
    &:hover {
      .image-preview-action {
        opacity: 1;
      }
    }
  }
}
</style>
