<template>
  <div class="g6-tree-container">
    <div
      id="container"
      ref="chartContainer"
      class="chart-content"></div>
  </div>
</template>

<script setup>
import { registerCustomNodes, GREY_COLOR } from './custom-node.js'
import { Graph, GraphEvent, treeToGraphData } from '@antv/g6'
import mockData from './mock01.json'

const chartContainer = ref()
let chartInstance = null

// 初始化图表
const initChart = () => {
  if (chartContainer.value) {
    // 注册自定义节点
    registerCustomNodes()

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
        type: 'custom-node-html-01',
        style: {
          size: [200, 60],
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
        indent: 240,
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
  }
}
</style>
