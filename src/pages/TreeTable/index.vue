<template>
  <div>
    <el-table
      :data="tableData"
      :lazy="true"
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      border
      row-key="id"
      style="width: 100%"
    >
      <el-table-column
        v-for="col in cols"
        :prop="col.name"
        :key="col.name"
        :label="col.label"
        :width="col.width"
        :align="col.align"
      >
        <template slot-scope="scope">
          <span>{{ scope.row[col.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-button type="primary" size="small" @click="chengeData">hasChildren = false</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TreeTable',
  components: {},
  props: {},
  data () {
    return {
      tableData: [],
      cols: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.init()
  },
  methods: {
    init () {
      this.cols = [
        { prop: 'name', label: '名字', width: '150px', align: 'center' },
        { prop: 'date', label: '日期', width: '150px', align: 'center' },
        { prop: 'address', label: '地址', align: 'center' }
      ]
      this.tableData = [
        {
          date: '2016-05-02',
          id: '1',
          name: '王小虎1',
          address: '上海市普陀区金沙江路 1518 弄',
          hasChildren: true
        }, {
          date: '2016-05-04',
          id: '12',
          name: '王小虎2',
          address: '上海市普陀区金沙江路 1517 弄',
          hasChildren: false
        }, {
          date: '2016-05-01',
          id: '13',
          name: '王小虎3',
          address: '上海市普陀区金沙江路 1519 弄',
          hasChildren: false
        }, {
          date: '2016-05-03',
          id: '14',
          name: '王小虎4',
          address: '上海市普陀区金沙江路 1516 弄',
          hasChildren: false
        }
      ]
    },
    load (tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: '31',
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: '32',
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }
        ])
      }, 1000)
    },
    chengeData () {
      const tableData = this.tableData
      for (const item of tableData) {
        item.hasChildren = false
      }
      this.tableData = tableData
    }
  }
}
</script>

<style scoped lang="less">
</style>
