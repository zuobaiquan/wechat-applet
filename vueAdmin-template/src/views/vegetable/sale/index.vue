<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='菜地id' width="100">
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

      <el-table-column label="有效期" align="center">
        <template slot-scope="scope">
          {{scope.row.createTime |  parseTime }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{scope.row.createTime |  parseTime }}
        </template>
      </el-table-column>
      <el-table-column label="用户昵称" align="center">
        <template slot-scope="scope">
          {{scope.row.createTime |  parseTime }}
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">
          {{scope.row.createTime |  parseTime }}
        </template>
      </el-table-column>
      <el-table-column label="默认收货地址" align="center">
        <template slot-scope="scope">
          {{scope.row.createTime |  parseTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleAdd(-1,scope.row.gardenArea.id)" type="primary" size="small" icon="el-icon-edit">管家汇报</el-button>
          <!--<el-button type="danger" icon="el-icon-delete" size="small" @click="delIndex(scope.row.id)">删除</el-button> -->
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
import { getSaleList,getAreaList,deleteGardenItem  } from '@/api/vegetable'
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
      getSaleList({'page':0,'size':5}).then(response => {
        this.list = response.data.content;
        this.listLoading = false
      })
    },
    handleAdd(flag,id){

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
