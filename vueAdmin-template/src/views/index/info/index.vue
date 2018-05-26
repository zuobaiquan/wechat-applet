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
      <el-table-column label="标题" align="center">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <!-- <el-table-column label="内容详情" align="center">
        <template slot-scope="scope">
          <span v-html="scope.row.text"></span>
        </template>
      </el-table-column> -->
      <el-table-column width="200" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleAdd(-1,scope.row.id)" size="small" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="delArticle(scope.row.id)">删除</el-button>
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
import { getInfoArticle,deleteInfoArticle } from '@/api/index'
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
      getInfoArticle({'page':this.currentPage-1,'size':10}).then(response => {
        this.list = response.data.content;
        this.totalNum=response.data.totalElements
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
       this.currentPage=val
       this.fetchData();
    },
    delArticle(id){
      deleteInfoArticle(id).then(response => {
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
    handleAdd(flag,id){
      this.$router.push({ path: `infoedit/${id}/${flag}`})
    }
  }
}
</script>
<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
