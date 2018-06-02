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
          {{scope.row.availableBill? scope.row.availableBill.join("、"):'--'}}
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
      v-if="totalNum/10>1"
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
          {{userAddress}}
          <p style="line-height:22px;">{{userInfo}}</p>
        </el-form-item>
        <el-form-item label="注册时间：" :label-width="formLabelWidth">
            {{form.createTime | parseTime }}
        </el-form-item>
        <el-table v-if="userBill.length"
          :data="userBill"
          :height="userBill.length>2?250:'auto'"
          border
          style="width: 100%">
          <el-table-column
            prop="id" width="50"
            label="id">
          </el-table-column>
          <el-table-column
            prop="fenqu"
            label="分区">
          </el-table-column>
          <el-table-column
            prop="sn"
            label="菜地编号">
          </el-table-column>
          <el-table-column
            prop="yxq"
            label="有效期">
          </el-table-column>
          <el-table-column
            prop="time"
            label="下单时间">
          </el-table-column>
          <el-table-column
            prop="feiyong"
            label="费用">
          </el-table-column>
          <el-table-column
            label="操作" width="50">
            <template slot-scope="scope">
              <el-button @click="caidiDetail(scope.$index)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-form-item v-if="!userBill.length" label="" :label-width="formLabelWidth">
            暂无菜地购买信息
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
import { getUserList,getAddress,getUserBill } from '@/api/user'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      listInput:{
        title : '',
        selectitem : ''
      },
      importanceOptions:['A','B','C'],
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
        nickName:'',
        withBill:1
      },
      userBill:[],
      userAddress:"--",
      userInfo:"--"
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
    getYear(date){
      return new Date(date).getFullYear()
    },
    parseTime(time, cFormat) {
      if (arguments.length === 0) {
        return null
      }
      if ((time + '').length === 10) {
        time = +time * 1000
      }
      const format = '{y}-{m}-{d}'
      let date = new Date(time)
      const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate()
      }
      const time_str = format.replace(/{(y|m|d)+}/g, (result, key) => {
        let value = formatObj[key]
        if (result.length > 0 && value < 10) {
          value = '0' + value
        }
        return value || 0
      })
      return time_str
    },
    caidiDetail(index){
      this.$router.push({ name: 'report',params: {'billid': this.userBill[index].id}})
    },
    handleClick(index){
      this.dialogFormVisible = true
      this.form=this.list[index]
      getAddress(this.form.id).then(response => {
        let tempData=response.data.content[0]
        if(tempData){
          this.userAddress=tempData.province+tempData.city+tempData.area+tempData.address
          this.userInfo=tempData.name+" "+tempData.phone
        }else{
          this.userAddress="--"
          this.userInfo="--"
        }

      })
      getUserBill(this.form.id).then(response => {
        this.userBill=[]
        response.data.content.map((item,index)=>{
          this.userBill.push(
            {
              'id':item.id,
              'fenqu':item.gardenItem.gardenArea.name,
              'sn':item.gardenItem.sn,
              'time':this.parseTime(item.startTime),
              'yxq':this.parseTime(item.startTime)+ '~'+ this.parseTime(item.endTime),
              'feiyong':item.gardenItem.gardenArea.garden.price*(this.getYear(item.endTime)-this.getYear(item.startTime))
            }
          )
        })
      })
    }
  }
}
</script>
