<template>
  <div class="app-container">
      状态&nbsp;&nbsp;<el-select clearable style="width: 120px" class="filter-item" v-model="searchStatus" placeholder="请选择">
      <el-option v-for="item in selectOptionsStatus" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
      </el-select>
      &nbsp;&nbsp;&nbsp;&nbsp;
      类型&nbsp;&nbsp;<el-select clearable style="width: 120px" class="filter-item" v-model="searchSelect" placeholder="请选择">
      <el-option v-for="item in selectOptions" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
      </el-select>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <br /><br />
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="100">
        <template slot-scope="scope">
          {{(currentPage-1)*10+scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="订单号" align="center">
        <template slot-scope="scope">
          {{scope.row.orderSn}}
        </template>
      </el-table-column>
      <el-table-column label="购买类型" align="center">
        <template slot-scope="scope">
          买菜地
        </template>
      </el-table-column>
      <el-table-column label="费用" align="center">
        <template slot-scope="scope">
          {{scope.row.money}}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{payStatus(scope.row.payStatus)}}
        </template>
      </el-table-column>
      <el-table-column label="下单时间" align="center">
        <template slot-scope="scope">
          {{scope.row.createTime |  parseTime }}
        </template>
      </el-table-column>
      <el-table-column label="用户昵称" align="center">
        <template slot-scope="scope">
          {{scope.row.creator.nickName}}
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">
          {{scope.row.phone || '--'}}
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
  </div>
</template>
<script>
import { getRecordList } from '@/api/record'
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      selectitem:'',
      sn:'',
      selectOptions:[
        {'id':-1,'name':'全部'},
        {'id':0,'name':'买菜地'},
        // {'id':1,'name':'买卡'}
      ],
      currentPage: 1,
      totalNum:1,
      searchSelect:-1,
      searchStatus:-1,
      selectOptionsStatus:[
        {'id':-1,'name':'全部'},
        {'id':0,'name':'未付款'},
        {'id':1,'name':'付款中'},
        {'id':2,'name':'已付款'},
        {'id':3,'name':'已退款'}
      ],
      searchObj:{
        type:-1,
        searchStatus:-1,
        searchSelect:-1,
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getRecordList({'page':this.currentPage-1,'size':10},this.searchObj).then(response => {
        this.list = response.data.content;
        this.totalNum=response.data.totalElements
        this.listLoading = false
      })
    },
    handleFilter(){
      if(this.searchSelect==-1&&this.searchStatus!==-1){
        this.searchObj.type=0
        this.searchObj.searchStatus=this.searchStatus
      }
      if(this.searchSelect!=-1&&this.searchStatus==-1){
        this.searchObj.type=1
        this.searchObj.searchSelect=this.searchSelect
      }
      if(this.searchSelect!=-1&&this.searchStatus!=-1){
        this.searchObj.type=2
        this.searchObj.searchStatus=this.searchStatus
        this.searchObj.searchSelect=this.searchSelect
      }
      this.fetchData()
    },
    handleCurrentChange(val) {
       this.currentPage=val
       this.fetchData();
    },
    payStatus(id){
      switch (id){
        case  0:return '未付款';
        case  1:return '付款中';
        case  2:return '已付款';
        case  3:return '已退款';
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
