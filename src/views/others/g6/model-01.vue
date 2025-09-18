<template>
  <div class="g6-tree-container">
    <div
      id="container"
      ref="chartContainer"
      class="chart-content"></div>
  </div>
</template>

<script setup>
import { TreeNode01, GREY_COLOR } from './g6-tree-chart.js'
import { ExtensionCategory, Graph, GraphEvent, register, treeToGraphData } from '@antv/g6'
import mockData from './mock01.json'

const chartContainer = ref()
let chartInstance = null

// 初始化图表
const initChart = () => {
  if (chartContainer.value) {
    // 注册自定义节点
    register(ExtensionCategory.NODE, 'tree-node-01', TreeNode01)

    const data = mockData
    const graph = new Graph({
      container: 'container',
      data: treeToGraphData(data, {
        getNodeData: (datum) => {
          if (!datum.style) datum.style = {}
          datum.style.collapsed = false
          if (!datum.children) return datum
          const { children, ...restDatum } = datum
          return { ...restDatum, children: children.map((child) => child.id) }
        },
      }),
      node: {
        type: 'tree-node-01',
        style: {
          size: [202, 60],
          ports: [{ placement: 'left' }, { placement: 'right' }],
          radius: 4,
        },
      },
      edge: {
        type: 'cubic-horizontal',
        style: {
          stroke: GREY_COLOR,
        },
      },
      layout: {
        type: 'indented',
        direction: 'LR',
        dropCap: false,
        indent: 300,
        getHeight: () => 60,
        preLayout: false,
      },
      behaviors: ['zoom-canvas', 'drag-canvas'],
    })

    graph.once(GraphEvent.AFTER_RENDER, () => {
      graph.fitView()
    })

    graph.render()
  } else {
    console.error('容器元素未找到')
  }
}

onMounted(() => {
  nextTick(() => {
    initChart()
  })
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>

<style lang="scss" scoped>
.g6-tree-container {
  height: 70vh;

  .chart-content {
    height: 100%;
    overflow: hidden;
    background: #ffffff;
  }
}
</style>
