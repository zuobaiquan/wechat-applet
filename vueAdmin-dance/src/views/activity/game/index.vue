<template>
  <div class="app-container">
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
      <el-table-column label="项目" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.content || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="街舞风格" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.danceStyle?scope.row.danceStyle.name:'--' || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small">查看</el-button>
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
import { getActivityList } from '@/api/activity'

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
      getActivityList({"page":this.currentPage-1,"size":10},'game').then(response => {
        this.list = response.data.data.content
        this.totalNum=response.data.data.totalElements
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
       this.currentPage=val
       this.fetchData();
    }
  }
}
</script>
