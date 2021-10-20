<template>
  <div>
    <el-table
      class="test"
      :data="tableData"
      :lazy="true"
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      border
      row-key="id"
      style="width: 100%"
    >
      <el-table-column label="拖拽" width="100">
        <template slot-scope="scope">
          <span v-if="false">{{ scope.row }}</span>
          <span class="el-icon-rank rank"></span>
        </template>
      </el-table-column>
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
      <el-button type="primary" size="small" @click="chengeData"
        >hasChildren = false</el-button
      >
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs'

export default {
  name: 'TreeTable',
  components: {},
  props: {},
  data () {
    return {
      tableData: [],
      cols: [],
      sortable: null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.init()
  },
  mounted () {
    this.initSort()
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
    initSort () {
      const el = document.querySelectorAll('.test > .el-table__body-wrapper > table > tbody')[0]
      // const sortable = new Sortable(el, options);
      // 根据具体需求配置options配置项
      this.sortable = new Sortable(el, {
        handle: '.rank',
        // 监听拖动结束事件
        onEnd: (evt) => {
          console.log('%c this.tableData: ', 'background-color: pink', this.tableData.map(v => v.id))
          const tableData = this.tableData
          const item = tableData.splice(evt.oldIndex, 1)
          tableData.splice(evt.newIndex, 0, item[0])
          this.tableData = tableData
          console.log('%c this.tableData: ', 'background-color: pink', this.tableData.map(v => v.id))
        }
      })
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
      // for (const item of tableData) {
      //   item.hasChildren = false
      // }
      tableData[0].hasChildren = !tableData[0].hasChildren
      this.tableData = tableData
      console.log('%c this.tableData[0]: ', 'background-color: pink', JSON.parse(JSON.stringify(this.tableData[0])))
    }
  }
}
</script>

<style scoped lang="less">
</style>
