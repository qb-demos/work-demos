<template>
  <div class="page-wrap">
    <div class="chart-wrap">
      <div
        class="chart-item"
        id="chart-dom-1"></div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { xData, yData } from './mock'

let chartInstance = null
function initChart() {
  if (chartInstance) {
    chartInstance.dispose()
  }
  const chartDom = document.getElementById('chart-dom-1')
  chartInstance = echarts.init(chartDom)
  let option

  option = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xData,
    },
    yAxis: {
      type: 'value',
    },
    visualMap: {
      show: false,
      dimension: 1,
      pieces: [
        { lte: 10, color: '#a1f18d' },
        { gt: 10, lte: 25, color: '#3dba3d' },
        { gt: 25, lte: 50, color: '#6acef2' },
        { gt: 50, lte: 100, color: '#0000ff' },
        { gt: 100, lte: 200, color: '#fa00fa' },
        { gt: 200, color: '#800040' },
      ],
    },
    series: [
      {
        data: yData,
        type: 'line',
        symbol: 'none',
        smooth: true,
        sampling: 'lttb',
        lineStyle: {
          width: 5,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(0,0,0,0.3)',
            },
            {
              offset: 1,
              color: 'rgba(0,0,0,0.3)',
            },
          ]),
        },
      },
    ],
  }

  option && chartInstance.setOption(option)
}

onMounted(() => {
  initChart()
})
onBeforeUnmount(() => {})
</script>

<style lang="scss" scoped>
.page-wrap {
  width: 100%;
  height: 100%;
  padding-top: 60px;

  .chart-wrap {
    width: 100%;
    height: 100%;

    .chart-item {
      width: 100%;
      height: 200px;
      background-color: var(--el-color-info-light-9);
    }
  }
}
</style>
