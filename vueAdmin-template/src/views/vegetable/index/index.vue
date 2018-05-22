<template>
  <div class="app-container">
    <el-button @click="handleAdd(1,-1)" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">添加</el-button>
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
          （下架：小程序无法查看到该菜地；未售：已上架，但还未被购买；已售：已被购买；预售：已被锁定，3分钟后变为未售状态）
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRes()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { getVegetableList,getAreaList,addGardenItem,deleteGardenItem } from '@/api/vegetable'
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
      status:1
    }
  },
  created() {
    getAreaList({'page':0,'size':100}).then(response => {
      this.selectOptions = response.data.content;
    })
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getVegetableList({'page':0,'size':5},1).then(response => {
        this.list = response.data.content;
        this.listLoading = false
      })
    },
    handleAdd(flag,id){
      if(flag==1){
        this.selectitem=null
        this.dialogTitle='添加菜地'
        this.status=1
        this.sn=''
        this.dialogFormVisible = true
      }
      if(flag==-1){
        this.dialogTitle='修改菜地'
        this.list.forEach((item,index)=>{
          if(item.gardenArea.id==id){
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
        case  1:return '未售';
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
    submitRes(){
      var tempName="";
      this.selectOptions.forEach((item,index)=>{
        if(item.id==this.selectitem){
          tempName=item.name
        }
      })
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
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
