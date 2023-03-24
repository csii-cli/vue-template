<template>
  <div
    class="d-table"
    :class="itemCenter ? 'color-table' : ''"
    v-if="componentJson && Object.keys(componentJson).length"
  >
    <!-- table - title -->
    <!--  <div
      class="table-title"
      :class="componentJson.tableConfig.border ? 'title-border' : ''"
      v-if="componentJson.tableConfig.title"
    >
      <span class="title">{{componentJson.tableConfig.title}}</span>
    </div>-->
    <!--    :title="componentJson.tableConfig.title"-->
    <!--    v-if="hideTips(componentJson)"-->
    <!-- <div class="right" v-if="componentJson.tableConfig.queryConfig">
      <template v-if="componentJson.tableConfig.queryConfig.slotName">
        <slot :name="componentJson.tableConfig.queryConfig.slotName"></slot>
      </template>
      <template v-else>
        <el-input
          type="text"
          class="tip"
          v-if="componentJson.tableConfig.queryConfig.placeholder"
          :placeholder="componentJson.tableConfig.queryConfig.placeholder"
          v-model="queryInfo"
        />
      </template>
      <span class="btn" v-if="componentJson.tableConfig.queryConfig.placeholder">
        <el-button
          :type="componentJson.tableConfig.queryConfig.queryBtnType || 'primary'"
          :size="componentJson.tableConfig.queryConfig.queryBtnSize || 'mini'"
          @click.native.prevent="handleActionClickEvent(componentJson.tableConfig.queryConfig.changeEventName, queryInfo)"
        >{{componentJson.tableConfig.queryConfig.queryBtnText}}</el-button>
      </span>
    </div>-->
    <!-- table 开始-->
    <!-- :stripe="componentJson.tableConfig.stripe || false"  :border="componentJson.tableConfig.border"-->
    <el-table
      v-loading="componentJson.loading || false"
      element-loading-text="加载中..."
      element-loading-custom-class="ui-isPartLoading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(248,248,248,0.8)"
      :data="componentJson.tableData"
      :empty-text="componentJson.emptyText || '暂无数据'"
      :stripe="true"
      ref="tableClear"
      :show-header="componentJson.tableConfig.showHeader"
      :cell-class-name="addCellClass"
      :header-cell-style="setHeadClass"
      :row-key="componentJson.tableConfig.rowKey"
      :tree-props="componentJson.tableConfig.treeProp"
      :indent="3"
      :cell-style="componentJson.tableConfig.cellStyle"
      @row-click="
        (row, column, cell, event) => {
          handleRowClick(componentJson.tableConfig.RowEventName, row, column, cell, event)
        }
      "
      @cell-click="
        (row, column, cell, event) => {
          handleCellClick(componentJson.tableConfig.cellEventName, row, column, cell, event)
        }
      "
      @selection-change="
        (select) => {
          changeEvent(componentJson.tableConfig.changeEventName, select)
        }
      "
      style="width: 100%"
    >
      <!-- 是否展示行号, 参数为数组,支持selector和index-->
      <template v-if="componentJson.tableConfig.type.length != 0">
        <template v-for="type in componentJson.tableConfig.type">
          <el-table-column
            v-if="type == 'radio'"
            :key="type"
            :type="type"
            label="选择"
            align="center"
            :resizable="false"
            :width="componentJson.tableConfig.width || '60px'"
          >
            <template slot-scope="scope">
              <el-radio
                v-model="tableRadio"
                :label="scope.row"
                :style="!checkRadio(scope.row) ? { display: 'none' } : ''"
                @change.native="
                  () => {
                    handleRadioClick(componentJson.tableConfig.radioEventName, scope.row)
                  }
                "
              >
                <i></i>
              </el-radio>
            </template>
          </el-table-column>
          <el-table-column
            v-if="type == 'selection'"
            :key="type"
            :type="type"
            align="center"
            :resizable="false"
            :selectable="checkSelectable"
            :width="componentJson.tableConfig.width || '40'"
            :style="checkSelectable ? { display: 'none' } : ''"
          ></el-table-column>
          <el-table-column
            v-if="type == 'index' && componentJson.tableConfig.showIndex == true"
            :key="type"
            label="序号"
            :type="type"
            :resizable="false"
            align="center"
            :width="componentJson.tableConfig.width || '50px'"
          ></el-table-column>
          <!--          <el-table-column-->
          <!--            v-if="type=='index'"-->
          <!--            :key="type"-->
          <!--            label="序号"-->
          <!--            :type="type"-->
          <!--            :resizable="false"-->
          <!--            align="center"-->
          <!--            :width="componentJson.tableConfig.width || '60px'"-->
          <!--          ></el-table-column>-->
        </template>
      </template>
      <!-- 表头数据 -->
      <template v-for="(head, index) in componentJson.tableHeadData">
        <el-table-column
          :key="index"
          :prop="head.prop"
          :label="head.label"
          :align="head.align || 'center'"
          :resizable="false"
          :formatter="head.formatter"
          :sortable="head.sortable || false"
          :header-align="'center'"
          v-if="head.clickEventName"
          :show-overflow-tooltip="head.showOverflowTooltip"
        >
          <!-- :width="head.width || null" -->
          <!-- class="ui-font-pointer-blue" -->
          <template slot-scope="scope">
            <div
              class="ui-font-pointer-theme"
              @click="clickTableLink(scope.row, head.clickEventName)"
            >
              {{ scope.row[head.prop] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="index"
          :prop="head.prop"
          :label="head.label"
          :align="head.align || 'center'"
          :resizable="false"
          :class-name="checkClassName(head.type, head.label)"
          :formatter="head.formatter"
          :sortable="head.sortable || false"
          :header-align="'center'"
          :show-overflow-tooltip="head.showOverflowTooltip"
        ></el-table-column>
      </template>
      <!-- 自定义表单数据   :width="head.width || (head.type === 'amount' ? '150px' : null)" -->
      <template v-for="colConfig in componentJson.tableConfig.colConfigs">
        <slot :name="colConfig.slot"></slot>
      </template>
      <!-- 默认的按钮  fixed="right"-->
      <el-table-column
        :resizable="false"
        v-if="componentJson.tableConfig.operateData && componentJson.tableConfig.operationFixed"
        :align="'center'"
        :fixed="componentJson.tableConfig.operationFixed || 'right'"
        :label="componentJson.tableConfig.label || '操作'"
        :width="componentJson.tableConfig.operateWidth"
      >
        <template slot-scope="scope">
          <el-button
            v-for="(item, index) in componentJson.tableConfig.operateData"
            :key="index"
            class="ui-font-pointer-theme operation-btn"
            v-if="scope.row.show == undefined || scope.row.show || item.show"
            :type="item.optDataBtnType"
            :size="item.optDataBtnSize"
            :disabled="item.optDataBtnDisabled || false"
            @click.native.prevent="handleClickEvent(item.changeEventName, scope.$index, scope.row)"
            >{{ item.optDataBtnText || scope.row.changeBtnText }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        :resizable="false"
        v-else-if="componentJson.tableConfig.operateData"
        :align="'center'"
        :label="componentJson.tableConfig.label || '操作'"
        :width="componentJson.tableConfig.operateWidth"
      >
        <template slot-scope="scope">
          <el-button
            v-for="(item, index) in componentJson.tableConfig.operateData"
            :key="index"
            :class="item.class"
            class="ui-font-pointer-theme operation-btn"
            v-if="scope.row.show == undefined || scope.row.show || item.show"
            :type="item.optDataBtnType"
            :size="item.optDataBtnSize"
            :disabled="item.optDataBtnDisabled || false"
            @click.native.prevent="handleClickEvent(item.changeEventName, scope.$index, scope.row)"
            >{{ item.optDataBtnText || scope.row.changeBtnText }}</el-button
          >
        </template>
      </el-table-column>

      <slot
        :name="componentJson.tableConfig.newSlot.id"
        v-if="componentJson.tableConfig.newSlot"
      ></slot>
    </el-table>
    <div class="user-define">
      <slot :name="componentJson.tableConfig.slotName"></slot>
    </div>
    <!-- 分页   -->
    <el-pagination
      v-if="componentJson.pagingSetting"
      @current-change="
        (page) => {
          changeEvent(componentJson.pagingSetting.changeEventName, page, componentJson)
        }
      "
      @size-change="
        (page) => {
          changeSize(componentJson.pagingSetting.changeSize, page, componentJson)
        }
      "
      :current-page.sync="componentJson.pagingSetting.currentPage"
      :page-size="componentJson.pagingSetting.pagesize"
      :page-sizes="componentJson.pagingSetting.pagesizes"
      layout="total,slot, ->, prev, pager, next,sizes, jumper"
      :total="componentJson.pagingSetting.total"
    >
      <span class="el-pagination__total">第{{ tridPage }}/{{ tridPages }}页</span>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'd-table',
  props: {
    componentJson: {
      type: Object,
      default: () => {
        return {}
      }
    },
    itemCenter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      queryInfo: '',
      tableRadio: '',
      data: {},
      dateList: ['stdduedate', 'stdissdate'] // 日期字段统一添加宽度
    }
  },
  computed: {
    tridPage() {
      return this.componentJson.pagingSetting.currentPage
    },
    tridPages() {
      return Math.ceil(
        this.componentJson.pagingSetting.total / this.componentJson.pagingSetting.pagesize
      )
    },
    checkClassName(item, item1) {
      return (item, item1) => {
        if (item && item === 'special') {
          return ''
        }
        if (((item && item === 'amount') || item1.indexOf('金额') != -1) && !this.itemCenter) {
          return 'all-amount-text'
        } else {
          return ''
        }
      }
    },
    hideTips() {
      return (item) => {
        if (item.tableConfig.tips && item.tableConfig.tips.length > 0) {
          return true
        } else {
          return false
        }
      }
    }
  },
  methods: {
    toPrint() {
      this.$refs.printTipCom.getPrintDom()
    },
    toClear() {
      this.$refs.tableClear.clearSelection()
    },
    checkSelectable(row) {
      if (row.selectable !== undefined) {
        return row.selectable
      } else {
        return true
      }
    },
    checkRadio(row) {
      if (row.checkRadio !== undefined) {
        return row.checkRadio
      } else {
        return true
      }
    },
    clearRadio(row) {
      this.tableRadio = null
    },
    // 处理查询操作 点击事件
    handleActionClickEvent(eventName, queryInfo) {
      if (!eventName) return
      this.$emit(eventName, queryInfo)
      this.queryInfo = ''
    },
    // 处理table点击事件
    handleClickEvent(eventName, index, row) {
      if (!eventName) return
      const params = {
        index: index,
        data: row
      }
      this.$emit(eventName, params)
    },
    // 处理单元格的点击事件
    handleCellClick(changeEventName, row, column, cell, event) {
      if (!changeEventName) return
      this.$emit(changeEventName, row, column, cell, event)
    },
    // 处理单选的点击事件
    handleRadioClick(changeEventName, row) {
      if (!changeEventName) return
      this.$emit(changeEventName, row)
    },
    // 单行点击事件
    handleRowClick(changeEventName, row) {
      if (!changeEventName) return
      this.$emit(changeEventName, row)
    },
    // 深度遍历table数据
    _deepCopyList(list) {
      const that = this
      const reset = list instanceof Array ? [] : {}
      for (const i in list) {
        reset[i] = typeof list[i] === 'object' ? that._deepCopyList(list[i]) : list[i]
      }
      return reset
    },
    changeEvent(eventName, item) {
      if (!eventName) return
      item ? this.$emit(eventName, item) : this.$emit(eventName)
    },
    changeSize(eventName, item) {
      if (!eventName) return
      item ? this.$emit(eventName, item) : this.$emit(eventName)
    },
    setHeadClass({ row, rowIndex }) {
      // console.log(row, rowIndex)
      if (rowIndex === 0) {
        // return 'background: #EFEFEF'
      }
    },
    // 列点击事件回调
    clickTableLink(data, clickEventName) {
      this.$emit(clickEventName, data)
    },
    downloadLink(data) {
      this.$emit(data.event)
    },
    addCellClass({ row, column, rowIndex, columnIndex }) {
      const typeLen = this.componentJson.tableConfig.type.length
      for (let i = 0; i < this.componentJson.tableHeadData.length; i++) {
        if (this.componentJson.tableHeadData[i].cellClass) {
          if (columnIndex == i + typeLen) {
            return this.componentJson.tableHeadData[i].cellClass
          }
        }
      }
    }
  }
}
</script>
<style>
.d-table .el-checkbox__input.is-disabled {
  display: none !important;
}
/* ykj 2020-4-20 17:17:24添加表格斑马条纹样式 */
.el-table--striped .el-table__body tr.el-table__row--striped td {
  /* background: rgba(247, 251, 255, 1); */
  background: white;
}
.el-table--striped .el-table__body tr td {
  background: rgba(247, 251, 255, 1);
}
</style>

<style lang="scss" scoped>
@import '@/assets/style/css/m-table.scss';
.color-table {
  ::v-deep .el-table th > .cell {
    color: #606266 !important;
  }
}
</style>
