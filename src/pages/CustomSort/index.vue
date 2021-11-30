<template>
  <div class="wrap">
    <div class="page-title">
      el-table 自定义多列排序 + 双击表头快速添加筛选条件
    </div>
    <el-table
      :data="tableData"
      style="width: 700px; margin: 15px"
      border
      :header-cell-style="handleHeadStyle"
    >
      <el-table-column
        v-for="col in cols"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        align="center"
      >
        <template slot="header" slot-scope="scope">
          <span v-if="false">{{ scope.row }}</span>
          <span class="custom-rank-header">
            <span
              style="cursor: pointer"
              @dblclick="handleDbClickHeader(col)"
              >{{ col.label }}</span
            >
            <span
              v-show="tableSort.length > 1 && scope.column.rank !== undefined"
              class="sort-rank"
              >{{
                scope.column.rank !== undefined
                  ? scope.column.rank + 1
                  : undefined
              }}</span
            >
            <span v-show="col.sortable" class="sort-icon">
              <span
                :class="[scope.column.order === 'ascending' ? 'active' : '']"
                class="el-icon-caret-top"
                @click="handleSortChange(scope.column, col.prop, 'ascending')"
              ></span>
              <span
                :class="[scope.column.order === 'descending' ? 'active' : '']"
                class="el-icon-caret-bottom"
                @click="handleSortChange(scope.column, col.prop, 'descending')"
              ></span>
            </span>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 15px">
      <el-form label-width="100px" label-position="left">
        <el-form-item label="defaultSort: ">
          <div>{{ defaultSort }}</div>
        </el-form-item>
        <el-form-item label="tableSort: ">
          <div v-for="item in tableSort" :key="item.prop">{{ item }}</div>
        </el-form-item>
        <el-form-item label="filter: ">
          <div v-for="item in filter" :key="item.prop">{{ item }}</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomSort',
  components: {},
  props: {},
  data () {
    return {
      cols: [],
      tableData: [],
      defaultSort: { prop: 'createTime', order: 'descending', rank: 0 },
      tableSort: [],
      filter: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.init()
  },
  mounted () { },
  methods: {
    init () {
      this.cols = [
        { prop: 'date', label: '日期' },
        { prop: 'name', label: '姓名' },
        { prop: 'address', label: '地址' },
        { prop: 'createTime', label: '创建时间', sortable: true },
        { prop: 'updateTime', label: '更新时间', sortable: true }
      ]

      this.tableData = [
        { date: '2016-05-02', name: '王小虎', address: '金沙江路 1518 弄', createTime: '1970-01-02', updateTime: '1970-01-02' },
        { date: '2016-05-04', name: '王小虎', address: '金沙江路 1517 弄', createTime: '1970-01-03', updateTime: '1970-01-03' },
        { date: '2016-05-01', name: '王小虎', address: '金沙江路 1519 弄', createTime: '1970-01-04', updateTime: '1970-01-04' },
        { date: '2016-05-03', name: '王小虎', address: '金沙江路 1516 弄', createTime: '1970-01-05', updateTime: '1970-01-05' }
      ]

      // 默认排序
      this.tableSort = [this.defaultSort]
    },
    handleDbClickHeader (col) {
      const filter = this.filter
      filter.push({ prop: col.prop, value: '' })
      this.filter = filter
    },
    handleSortChange (column, prop, order) {
      column.order = column.order === order ? undefined : order

      const tableSort = this.tableSort
      const index = tableSort.findIndex(v => v.prop === prop)
      if (index > -1) {
        tableSort.splice(index, 1)
        if (column.order !== undefined) {
          const sortObj = { prop, order, rank: -1 }
          tableSort.push(sortObj)
        }
      } else {
        const sortObj = { prop, order, rank: tableSort.length }
        tableSort.push(sortObj)
      }
      for (let index = 0; index < tableSort.length; index++) {
        const ele = tableSort[index]
        ele.rank = index
      }
      this.tableSort = tableSort
      // 请求数据
      this.$notify.success('请求数据')
      // this.getTableData()
    },
    handleHeadStyle ({ row, column, rowIndex, columnIndex }) {
      // 先清空，不然取消排序时数字仍然显示
      column.rank = undefined
      const index = this.tableSort.findIndex(v => v.prop === column.property)
      if (index > -1) {
        column.order = this.tableSort[index].order
        column.rank = this.tableSort[index].rank
      }
      return { background: '#EEF3FD' }
    }
  }
}
</script>

<style lang='less' scoped>
.sort-icon {
  display: inline-block;
  vertical-align: middle;
  margin-left: 3px;
  > span {
    display: block;
    // background-color: pink;
    position: relative;
    cursor: pointer;
    &.active {
      color: #409eff;
    }
    &:first-child {
      bottom: -2.5px;
    }
    &:last-child {
      top: -2.5px;
    }
  }
}
.custom-rank-header {
  display: inline-block;
  .sort-rank {
    display: inline-block;
    width: 16px;
    height: 16px;
    text-align: center;
    line-height: 16px;
    vertical-align: middle;
    position: relative;
    top: -1px;
    border-radius: 4px;
    color: #fff;
    background-color: #f56c6c;
    margin-left: 5px;
  }
}
</style>
