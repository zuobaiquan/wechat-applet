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
      <el-table-column label="卡类型" align="center">
        <template slot-scope="scope">
          {{scope.row.graderId==1?'菜地卡':(scope.row.chickenId==1?'选鸡卡':'--')}}
        </template>
      </el-table-column>
      <el-table-column label="价格" align="center">
        <template slot-scope="scope">
          {{scope.row.price || '-- '}}
        </template>
      </el-table-column>
      <el-table-column label="库存" align="center">
        <template slot-scope="scope">
          {{scope.row.count || '--'}}
        </template>
      </el-table-column>
      <el-table-column label="单次限购" align="center">
        <template slot-scope="scope">
          {{scope.row.limitBuyCount || '--'}}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{'--'}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleAdd(-1,scope.row.id)" type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="delsetCard(scope.row.id)">删除</el-button>
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
import { getCardList,delsetCard } from '@/api/card'
export default {
  data() {
    return {
      list: null,
      listLoading: true,
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
      getCardList({'page':this.currentPage-1,'size':10}).then(response => {
        this.list = response.data.content;
        this.totalNum=response.data.totalElements
        this.listLoading = false
      })
    },
    delsetCard(id){
      delsetCard(id).then(response => {
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
      this.$router.push({ path: `cardedit/${id}/${flag}`})
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
