<template>
  <div class="app-container">
    用户ID：<el-input @keyup.enter.native="handleFilter"
    style="width: 120px;" class="filter-item"
    placeholder="请输入" v-model="listInput.title">
    </el-input>
    &nbsp;&nbsp;&nbsp;
    昵称：<el-input @keyup.enter.native="handleFilter"
    style="width: 120px;" class="filter-item"
    placeholder="请输入" v-model="listInput.title">
      </el-input>
      &nbsp;&nbsp;&nbsp;
      分区&nbsp;<el-select clearable style="width: 120px" class="filter-item" v-model="listInput.selectitem" placeholder="选择分区">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      &nbsp;&nbsp;&nbsp;
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <br />    <br />
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='id' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="昵称">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column label="菜地" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.pageviews}}
        </template>
      </el-table-column>
      <el-table-column label="注册时间" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.pageviews}}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      currentPage: 4,
      listInput:{
        title:'',
        selectitem:''
      },
      importanceOptions:['全部','A','B','C']
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
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    handleFilter(){

    },
    handleSizeChange() {
        //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange() {
        //console.log(`当前页: ${val}`);
    }
  }
}
</script>
