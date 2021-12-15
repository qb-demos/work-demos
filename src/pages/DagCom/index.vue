<template>
  <div class="wrap">
    <div class="page-title">G6 / DAG 图</div>
    <div id="mountNode" class="mountNode"></div>
  </div>
</template>

<script>
import G6 from '@antv/g6'
import testData from './data.json'

export default {
  name: 'DagCom',
  components: {},
  props: {},
  data () {
    return {
      graph: null,
      colorDict: ['#434c59', '#39da11', '#5f6fff', '#ac21ed']
    }
  },
  computed: {
    dataCom () {
      return testData
    }
  },
  watch: {},
  created () { },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init () {
      const _this = this
      G6.registerNode(
        'sql',
        {
          drawShape (cfg, group) {
            const rect = group.addShape('rect', {
              attrs: {
                x: -25,
                y: -23,
                width: _this.getTextWidth(cfg.name) + 45,
                height: 30,
                radius: 4,
                stroke: '#eaedf6',
                fill: '#fff',
                lineWidth: 1
              },
              name: 'rect-shape'
            })
            group.addShape('rect', {
              attrs: {
                x: -15,
                y: -13,
                fill: _this.colorDict[cfg.category],
                width: 10,
                height: 10,
                radius: 2
              },
              name: 'text-shape'
            })
            if (cfg.name) {
              group.addShape('text', {
                attrs: {
                  text: cfg.name,
                  x: 5,
                  y: -1,
                  fill: '#111',
                  fontSize: 12
                },
                name: 'text-shape'
              })
            }
            return rect
          }
        },
        'single-node'
      )

      this.graph = new G6.Graph({
        container: 'mountNode', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
        // width: 1500, // Number，必须，图的宽度
        // height: 500, // Number，必须，图的高度
        fitView: true,
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node']
        },
        layout: {
          type: 'dagre',
          rankdir: 'LR', // 布局方向，从左至右
          nodeSep: -80,
          rankSep: 200,
          // align: 'DL', // 节点对齐方式
          controlPoints: true
        },
        defaultNode: {
          type: 'sql'
        },
        defaultEdge: {
          type: 'cubic-horizontal',
          size: 1,
          color: '#C2C6CC',
          style: {
            radius: 20
          }
        }
      })

      this.graph.data(this.dataCom)
      this.graph.render()
    },
    getTextWidth (str) {
      const dom = document.createElement('span')
      dom.style.display = 'inline-block'
      dom.style.fontSize = '12px'
      dom.textContent = str
      document.body.appendChild(dom)
      const width = dom.clientWidth
      document.body.removeChild(dom)
      return width
    }
  }
}
</script>

<style lang='less' scoped>
.wrap {
  height: 100%;
  background-color: #fafbfe;
  .mountNode {
    height: 100%;
    border: 1px solid #ccc;
  }
}
</style>
