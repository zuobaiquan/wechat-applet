<template>
  <div class="app-container">
    用户ID：<el-input @keyup.enter.native="handleFilter"
    style="width: 120px;" class="filter-item"
    placeholder="请输入" v-model="searchObj.id">
    </el-input>
    &nbsp;&nbsp;&nbsp;
    昵称：<el-input @keyup.enter.native="handleFilter"
    style="width: 120px;" class="filter-item"
    placeholder="请输入" v-model="searchObj.nickName">
      </el-input>
      &nbsp;&nbsp;&nbsp;
      分区&nbsp;<el-select clearable style="width: 120px" class="filter-item" v-model="listInput.selectitem" placeholder="选择分区">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      &nbsp;&nbsp;&nbsp;
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <br /><br />
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='id'>
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="昵称" align="center">
        <template slot-scope="scope">
          {{scope.row.nickName|| '--'}}
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.phone || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="菜地" align="center">
        <template slot-scope="scope">
          {{scope.row.pageviews || '--'}}
        </template>
      </el-table-column>
      <el-table-column label="注册时间" align="center">
        <template slot-scope="scope">
          {{scope.row.createTime | parseTime }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.$index)" type="primary" size="small">查看</el-button>
        </template>
    </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 10, 20, 30]"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="totalNum">
    </el-pagination>

    <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="头像：" :label-width="formLabelWidth">
            <img style="width:100px;height:100px;border-radius:50%" :src="form.avatarUrl" alt="">
        </el-form-item>
        <el-form-item label="昵称：" :label-width="formLabelWidth">
            {{form.nickName}}
        </el-form-item>
        <el-form-item label="手机号：" :label-width="formLabelWidth">
            {{form.phone}}
        </el-form-item>
        <el-form-item label="默认收货信息：" :label-width="formLabelWidth">

        </el-form-item>
        <el-form-item label="注册时间：" :label-width="formLabelWidth">
            {{form.createTime | parseTime }}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList } from '@/api/user'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      listInput:{
        title : '',
        selectitem : ''
      },
      importanceOptions:['全部','A','B','C'],
      dialogFormVisible: false,
      form: {
        account: '',
        avatarUrl:'',
        department:'',
        nickName:'',
        phone:''
      },
      formLabelWidth: '150px',
      currentPage: 1,
      totalNum:1,
      searchObj:{
        type:-1,
        id:'',
        nickName:''
      },
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getUserList({"page":this.currentPage-1,"size":10},this.searchObj).then(response => {
        this.list = response.data.content
        this.totalNum=response.data.totalElements
        this.listLoading = false
      })
    },
    handleFilter(){
      if(this.searchObj.id!==''&&this.searchObj.nickName==''){
        this.searchObj.type=0
      }
      if(this.searchObj.id==''&&this.searchObj.nickName!==''){
        this.searchObj.type=1
      }
      if(this.searchObj.id!==''&&this.searchObj.nickName!==''){
        this.searchObj.type=2
      }
      this.fetchData()
    },
    handleCurrentChange(val) {
       this.currentPage=val
       this.fetchData();
    },
    handleClick(index){
      this.dialogFormVisible = true
      this.form=this.list[index]
    }
  }
}
</script>
