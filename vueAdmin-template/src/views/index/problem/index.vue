<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="问题" align="center">
        <template slot-scope="scope">
          {{scope.row.question}}
        </template>
      </el-table-column>
      <el-table-column label="回答" width="420" align="center">
        <template slot-scope="scope">
          {{scope.row.answer}}
        </template>
      </el-table-column>
      <el-table-column label="分类" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.category.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center">
        <template slot-scope="scope">
          {{scope.row.updateTime | parseTime }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="handleAdd()" type="primary" size="small" icon="el-icon-edit">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {getProblemList } from '@/api/index'
export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getProblemList({'page':0,'size':5}).then(response => {
        this.list = response.data.content;
        this.listLoading = false
      })
    },
    handleAdd(){

    }
  }
}
</script>
