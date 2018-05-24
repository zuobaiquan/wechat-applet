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
      <el-table-column align="center" label='菜地id' width="100">
        <template slot-scope="scope">
          {{scope.row.gardenItem.gardenArea.garden.id}}
        </template>
      </el-table-column>
      <el-table-column label="分区" align="center">
        <template slot-scope="scope">
          {{scope.row.gardenItem.gardenArea.name}}
        </template>
      </el-table-column>
      <el-table-column label="编号" align="center">
        <template slot-scope="scope">
          {{scope.row.gardenItem.sn}}
        </template>
      </el-table-column>
      <el-table-column label="有效期" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.startTime |  parseTime('{y}-{m}-{d}')}}</span>-<span>{{scope.row.endTime |  parseTime('{y}-{m}-{d}')}} </span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{compareTime(scope.row.endTime) }}
        </template>
      </el-table-column>
      <el-table-column label="用户昵称" align="center">
        <template slot-scope="scope">
          {{scope.row.user.nickName}}
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">
          {{scope.row.user? scope.row.user.phone :'' || scope.row.address? scope.row.address.phone:'--' }}
        </template>
      </el-table-column>
      <el-table-column label="默认收货地址" align="center">
        <template slot-scope="scope">
          {{scope.row.address ? scope.row.address.address :'--'}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleReport(scope.row)" type="primary" size="small" icon="el-icon-edit">管家汇报</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 5, 10, 15]"
      :page-size="5"
      layout="total, prev, pager, next, jumper"
      :total="totalNum">
    </el-pagination>
  </div>
</template>
<script>
import { getSaleList,getAreaList } from '@/api/vegetable'
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
        {'id':1,'name':'买卡'}
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
    getAreaList({'page':0,'size':100}).then(response => {
      this.selectOptions = response.data.content;
    })

  },
  methods: {
    fetchData() {
      this.listLoading = true
      getSaleList({'page':this.currentPage-1,'size':5}).then(response => {
        this.list = response.data.content
        console.log(this.list);
        this.totalNum=response.data.totalElements
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
       this.currentPage=val
       this.fetchData();
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
    handleReport(data){
      this.$router.push({ name: 'report',params: {'billid': 1}, query:  data })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
