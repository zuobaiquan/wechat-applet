<template>
  <div class="app-container">
    <el-button @click="handleAdd(1,-1,'game')" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">添加</el-button>
    <br /><br />
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='id'>
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          {{scope.row.title|| '--'}}
        </template>
      </el-table-column>
      <el-table-column label="地址" align="center">
        <template slot-scope="scope">
          {{scope.row.address|| '--'}}
        </template>
      </el-table-column>
      <el-table-column label="日期" align="center">
        <template slot-scope="scope">
          {{scope.row.timeText|| '--'}}
        </template>
      </el-table-column>
      <el-table-column label="价钱" align="center">
        <template slot-scope="scope">
          {{scope.row.price|| '--'}}
        </template>
      </el-table-column>
      <el-table-column label="联络" align="center">
        <template slot-scope="scope">
          {{scope.row.contact|| '--'}}
        </template>
      </el-table-column>
      <el-table-column label="项目内容" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.content || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="街舞风格" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.danceStyle?scope.row.danceStyle.name:'--' || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button @click="handleAdd(-1,scope.row.id,'game')" type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="delActivity(scope.row.id)">删除</el-button>
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
import { getActivityList,deleteActivity } from '@/api/activity'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      baseURL:process.env.BASE_API+'/api/oss',
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
      getActivityList({"page":this.currentPage-1,"size":10},'game').then(response => {
        this.list = response.data.data.content
        this.totalNum=response.data.data.totalElements
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
       this.currentPage=val
       this.fetchData();
    },
    handleAdd(flag,id,type){
      this.$router.push({ path: `activityedit/${id}/${flag}/${type}`})
    },
    delActivity(id){
      deleteActivity({'id':id}).then(response => {
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
    }
  }
}
</script>
