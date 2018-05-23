<template>
  <div class="app-container">
    <el-button @click="handleAdd(1,-1)" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">添加</el-button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      编号：<el-input style="width: 120px;" class="filter-item" placeholder="请输入" v-model="searchSn"></el-input>
      &nbsp;&nbsp;&nbsp;&nbsp;
      分区&nbsp;&nbsp;<el-select clearable style="width: 120px" class="filter-item" v-model="searchSelect2" placeholder="选择分区">
      <el-option v-for="item in selectOptions2" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
      </el-select>
      &nbsp;&nbsp;&nbsp;&nbsp;
      状态&nbsp;&nbsp;<el-select clearable style="width: 120px" class="filter-item" v-model="searchStatus" placeholder="选择分区">
      <el-option v-for="item in selectOptionsStatus" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
      </el-select>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <br /><br />
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="100">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="分区" align="center">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="编号" align="center">
        <template slot-scope="scope">
          {{scope.row.sn}}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{areaSelect(scope.row.status)}}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{scope.row.createTime |  parseTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleAdd(-1,scope.row.gardenArea.id)" type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="delIndex(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="菜地分区" label-width="120px">
          <el-select clearable style="width: 200px" class="filter-item" v-model="selectitem">
            <el-option v-for="item in selectOptions" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
          &nbsp;&nbsp;&nbsp;
          <el-input style="width: 200px;" class="filter-item" placeholder="请输入编号" v-model="sn">
          </el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-radio-group v-model="status">
            <el-radio :label="0">下架</el-radio>
            <el-radio :label="1">未售</el-radio>
            <el-radio :label="2">已售</el-radio>
            <el-radio :label="3">预售</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label-width="50px">
          <div style="line-height:30px;margin-right:30px;">
            （下架：小程序无法查看到该菜地；未售：已上架，但还未被购买；已售：已被购买；预售：已被锁定，3分钟后变为未售状态）
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRes()">确 定</el-button>
      </div>
    </el-dialog>
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
import { getVegetableList,getAreaList,addGardenItem,deleteGardenItem,editGardenItem } from '@/api/vegetable'
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      dialogTitle:'添加菜地',
      selectitem:'',
      sn:'',
      selectOptions:[],
      selectOptions2:[],
      status:1,
      gardenId:-1,
      currentPage: 1,
      totalNum:1,
      searchSn:'',
      searchSelect:null,
      searchSelect2:-1,
      searchStatus:-1,
      selectOptionsStatus:[
        {'id':-1,'name':'请选择'},
        {'id':0,'name':'下架'},
        {'id':1,'name':'待售'},
        {'id':2,'name':'已售'},
        {'id':3,'name':'预售'}
      ],
      searchObj:{
        type:-1,
        status:-1,
        sn:'',
        gardenArea:''
      }
    }
  },
  created() {
    getAreaList({'page':0,'size':100}).then(response => {
      this.selectOptions = response.data.content;
      this.selectOptions2 = response.data.content;
      this.selectOptions2.unshift({
        'id':-1,
        'name':'请选择'
      })
    })
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getVegetableList({'page':this.currentPage-1,'size':5},this.searchObj).then(response => {
        this.list = response.data.content;
        this.totalNum=response.data.totalElements
        this.listLoading = false
      })
    },
    handleFilter(){
      if(this.searchSn==''&&this.searchSelect2==-1&&this.searchStatus!==-1){
        this.searchObj.type=0
        this.searchObj.status=this.searchStatus
      }
      if(this.searchSn!=''&&this.searchSelect2==-1&&this.searchStatus==-1){
        this.searchObj.type=1
        this.searchObj.sn=this.searchSn
      }
      if(this.searchSn==''&&this.searchSelect2!==-1&&this.searchStatus==-1){
        this.searchObj.type=2
        this.searchObj.gardenArea=this.searchSelect2
      }
      if(this.searchSn!==''&&this.searchSelect2==-1&&this.searchStatus!==-1){
        this.searchObj.type=3
        this.searchObj.status=this.searchStatus
        this.searchObj.sn=this.searchSn
      }
      if(this.searchSn!==''&&this.searchSelect2!==-1&&this.searchStatus==-1){
        this.searchObj.type=4
        this.searchObj.gardenArea=this.searchSelect2
        this.searchObj.sn=this.searchSn
      }
      if(this.searchSn==''&&this.searchSelect2!==-1&&this.searchStatus!==-1){
        this.searchObj.type=5
        this.searchObj.gardenArea=this.searchSelect2
        this.searchObj.status=this.searchStatus
      }
      if(this.searchSn!==''&&this.searchSelect2!==-1&&this.searchStatus!==-1){
        this.searchObj.type=6
        this.searchObj.gardenArea=this.searchSelect2
        this.searchObj.status=this.searchStatus
        this.searchObj.sn=this.searchSn
      }
      this.fetchData()
    },
    handleCurrentChange(val) {
       this.currentPage=val
       this.fetchData();
    },
    handleAdd(flag,id){
      if(flag==1){
        this.selectitem=null
        this.dialogTitle='添加菜地'
        this.status=1
        this.sn=''
        this.gardenId=-1
        this.dialogFormVisible = true
      }
      if(flag==-1){
        this.dialogTitle='修改菜地'
        this.list.forEach((item,index)=>{
          if(item.gardenArea.id==id){
            this.gardenId=item.id
            this.selectitem=id
            this.status=item.status
            this.sn=item.sn
            this.dialogFormVisible = true
            return ;
          }
        })
      }
    },
    areaSelect(id){
      switch (id){
        case  0:return '下架';
        case  1:return '待售';
        case  2:return '已售';
        case  3:return '预售';
      }
    },
    delIndex(id){
      deleteGardenItem(id).then(response => {
        if(response.status==200){
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.fetchData()
        }else{
          this.$message({
            message: '删除失败',
            type: 'warning'
          })
        }
      })
    },
    handelErrorForm(){
      if(!this.selectitem){
        this.$message({
          message: '请选择菜地分区',
          type: 'warning'
        })
        return false
      }
      if(this.sn==""){
        this.$message({
          message: '编号不能为空',
          type: 'warning'
        })
        return false
      }
      else{
        return true
      }
    },
    submitRes(){
      if(this.handelErrorForm()){
        var tempName="";
        this.selectOptions.forEach((item,index)=>{
          if(item.id==this.selectitem){
            tempName=item.name
          }
        })
        if(this.gardenId==-1){
          addGardenItem({
            'gardenArea':{
              'id':this.selectitem
            },
            'name':tempName,
            'sn':this.sn,
            'status':this.status
          }).then(response => {
            if(response.status==200){
              this.dialogFormVisible=false
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.fetchData();
            }else{
              this.$message({
                message: '添加失败',
                type: 'warning'
              })
            }
          })
        }else{
          editGardenItem({
            'id':this.gardenId,
            'gardenArea':{
              'id':this.selectitem
            },
            'name':tempName,
            'sn':this.sn,
            'status':this.status
          }).then(response => {
            if(response.status==200){
              this.dialogFormVisible=false
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.fetchData();
            }else{
              this.$message({
                message: '修改失败',
                type: 'warning'
              })
            }
          })
        }
      }else{
        console.log("表单提交失败");
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
