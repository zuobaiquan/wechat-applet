<template>
  <div class="app-container">
    <el-button @click="handleAdd(1,-1)" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">添加</el-button>
    <br /><br />
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{(currentPage-1)*10+scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="规则" align="center">
        <template slot-scope="scope">
          满{{scope.row.miniPrice}}减{{scope.row.money}}
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          {{scope.row.remark || '--'}}
        </template>
      </el-table-column>
      <el-table-column label="有效天数" align="center">
        <template slot-scope="scope">
          {{scope.row.availableDay || '--'}}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">

        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{scope.row.createTime | parseTime}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleAdd(-1,scope.row.id)" type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteCoupon(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="券类型：" label-width="120px">
          满减
        </el-form-item>
        <el-form-item label="备注：" label-width="120px">
          <el-input v-model="form.remark" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="满：" label-width="120px">
          <el-input v-model="form.miniPrice" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="减：" label-width="120px">
          <el-input v-model="form.money" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="有效天数：" label-width="120px">
          <el-input v-model="form.availableDay" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRes()">确 定</el-button>
      </div>
    </el-dialog>
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
import { getCouponList,addCoupon,editCoupon,deleteCoupon } from '@/api/coupon'
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      dialogTitle:'添加优惠券',
      form: {
        availableDay:'',
        remark:'',
        money:'',
        miniPrice: '',
        id:-1
      },
      currentPage: 1,
      totalNum:1
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getCouponList({'page':this.currentPage-1,'size':10}).then(response => {
        this.list = response.data.content;
        this.totalNum=response.data.totalElements
        this.listLoading = false
      })
    },
    deleteCoupon(id){
      deleteCoupon(id).then(response => {
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
    handleCurrentChange(val) {
       this.currentPage=val
       this.fetchData();
    },
    handleAdd(flag,id){
      if(flag==1){
        this.form.id=-1
        this.dialogTitle='添加优惠券'
        this.form.availableDay=''
        this.form.remark=''
        this.form.money=''
        this.form.miniPrice=''
        this.dialogFormVisible = true
      }
      if(flag==-1){
        this.form.id=id
        this.dialogTitle='编辑优惠券'
        this.list.forEach((item,index)=>{
          if(item.id==id){
            this.form.availableDay=item.availableDay
            this.form.remark=item.remark
            this.form.money=item.money
            this.form.miniPrice=item.miniPrice
            this.dialogFormVisible = true
            return ;
          }
        })
      }
    },
    handelErrorForm(){
      if(this.form.remark==""){
        this.$message({
          message: '图片标题不能为空',
          type: 'warning'
        })
        return false
      }
      if(this.form.miniPrice==""){
        this.$message({
          message: '券满金额不能为空',
          type: 'warning'
        })
        return false
      }
      if(!/(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{1,2}$)/.test(this.form.miniPrice)){
        this.$message({
          message: '券满金额格式不正确',
          type: 'warning'
        })
        return false
      }
      if(this.form.money==""){
        this.$message({
          message: '券减金额不能为空',
          type: 'warning'
        })
        return false
      }
      if(!/(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{1,2}$)/.test(this.form.money)){
        this.$message({
          message: '券减金额格式不正确',
          type: 'warning'
        })
        return false
      }
      if(this.form.availableDay==""){
        this.$message({
          message: '有效天数不能为空',
          type: 'warning'
        })
        return false
      }
      if(!/^\+?[1-9]\d*$/.test(this.form.availableDay)){
        this.$message({
          message: '有效天数格式不正确',
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
        if(this.form.id==-1){
          addCoupon({
            'availableDay':this.form.availableDay,
            'remark':this.form.remark,
            'money':this.form.money,
            'miniPrice':this.form.miniPrice
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
        else{
          editCoupon({
            'availableDay':this.form.availableDay,
            'remark':this.form.remark,
            'money':this.form.money,
            'miniPrice':this.form.miniPrice,
            'id':this.form.id
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
      }
      else{
        console.log("表单提交失败");
      }
    }
  }
}
</script>
