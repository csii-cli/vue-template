<template>
  <div>
    <!-- 分页   -->
    <el-pagination
      @current-change="changeEvent()"
      @size-change="changeSize()"
      :current-page.sync="setting.currentPage"
      :page-size.sync="setting.pagesize"
      :page-sizes="setting.pagesizes"
      layout="total,slot, ->, prev, pager, next,sizes, jumper"
      :total="setting.total"
    >
      <span class="el-pagination__total">第{{ setting.tridPage }}/{{ setting.tridPages }}页</span>
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    setting: {
      type: Object,
      require: true
    }
  },
  data() {
    return {}
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pagination.pageSize = val
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pagination.currentPage = val
    },
    jump() {
      this.pagination.currentPage =
        this.jumpModel > this.totalPage ? this.totalPage : this.jumpModel
      this.jumpModel = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: space-between;
}
.page-size {
  width: 91px;
  padding: 1px 0;
  margin: 0 20px;
}
.pagination-jump {
  font-size: 14px;
  .input {
    width: 50px;
    text-align: center;
  }
}
.el-pagination {
  width: 80%;
  margin: 0 auto;
}
</style>
