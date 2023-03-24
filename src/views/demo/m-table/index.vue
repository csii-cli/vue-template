<template>
  <div class="content">
    <m-table
      class="tabScro"
      :componentJson="tableJson"
      @pageChangeEvent="pageChangeEvent"
      @pageSizeChange="pageSizeChange"
      @pageChange="handlePageChange"
    >
    </m-table>
  </div>
</template>
<script>
export default {
  name: 'm1-table',
  data() {
    return {
      tableJson: {
        tableConfig: {
          showHeader: false,
          border: true,
          type: [],
          colConfigs: []
        },
        // 表头字段
        tableHeadData: [
          { label: '出票日', prop: 'drawBillDt' },
          { label: '到期日', prop: 'mtrDt' }
        ],
        // 表格数据
        tableData: [
          {
            drawBillDt: '234234',
            mtrDt: '23243'
          }
        ],
        pagingSetting: {
          currentPage: 1,
          pagesize: 10,
          total: 0,
          pageNumber: 0,
          changeEventName: 'pageChangeEvent',
          changeSize: 'pageSizeChange'
        }
      }
    }
  },
  methods: {
    pageChangeEvent() {},
    pageSizeChange() {},
    handlePageChange() {}
  }
}
</script>
<style lang="scss" scoped>
table {
  tr {
    td {
      font-size: 14px;
    }
  }
}
.table1 {
  td {
    width: 120px;
    font-size: 14px;
  }
}
.table2 {
  tr {
    td {
      font-size: 14px;
    }
  }
}
.test {
  width: 120px;
}
</style>
