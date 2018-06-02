<template>
  <div class="app-container">
    状态&nbsp;&nbsp;<el-select clearable style="width: 120px" class="filter-item" v-model="searchStatus" placeholder="请选择">
    <el-option v-for="item in selectOptionsStatus" :key="item.id" :label="item.name" :value="item.id">
    </el-option>
    </el-select>
    &nbsp;&nbsp;&nbsp;&nbsp;
    分区&nbsp;&nbsp;<el-select clearable style="width: 120px" class="filter-item" v-model="searchSelect" placeholder="请选择">
    <el-option v-for="item in selectOptions" :key="item.id" :label="item.name" :value="item.name">
    </el-option>
    </el-select>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    <br /><br />
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='billId' width="100">
        <template slot-scope="scope">
          {{scope.row.id}}
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
          <span>{{scope.row.startTime |  parseTime('{y}-{m}-{d}')}}</span>&nbsp;~&nbsp;<span>{{scope.row.endTime |  parseTime('{y}-{m}-{d}')}} </span>
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
          {{scope.row.address ? scope.row.address.province+scope.row.address.city+scope.row.address.area+scope.row.address.address :'--'}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleReport(scope.row)" type="primary" size="small" icon="el-icon-edit">管家汇报</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="totalNum/10>1"
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
import { getSaleList,getAreaList } from '@/api/vegetable'
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      selectitem:'',
      sn:'',
      selectOptions:[
        {'id':0,'name':'买菜地'},
        {'id':1,'name':'买卡'}
      ],
      currentPage: 1,
      totalNum:1,
      searchSelect:'',
      searchStatus:'',
      selectOptionsStatus:[
        {'id':0,'name':'过期'},
        {'id':1,'name':'未过期'}
      ],
      searchObj:{
        type:-1,
        searchStatus:'',
        searchSelect:'',
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
      getSaleList({'page':this.currentPage-1,'size':10},this.searchObj).then(response => {
        this.list = response.data.content
        this.totalNum=response.data.totalElements
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
       this.currentPage=val
       this.fetchData();
    },
    handleFilter(){
      console.log(111,this.searchSelect);
      if(this.searchSelect!=''&&this.searchStatus==''){
        this.searchObj.type=1
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
      this.$router.push({ name: 'report',params: {'billid': data.id}})
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
