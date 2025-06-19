<template>
  <div class="page-wrap">
    <div class="chart-wrap">
      <div
        id="chart-dom-1"
        class="chart-item"></div>
      <el-button
        type="primary"
        class="refresh-btn"
        @click="onRefresh">
        刷新
      </el-button>
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
    grid: {
      left: '0',
      right: '0',
      bottom: '0',
      top: '0',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xData,
      axisLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
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
          width: 0,
        },
        areaStyle: {
          origin: 'start',
        },
      },
    ],
  }

  option && chartInstance.setOption(option)
}
function onRefresh() {
  initChart()
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
    position: relative;
    width: 100%;
    height: 100%;

    .chart-item {
      width: 100%;
      height: 200px;
      background-color: var(--el-color-info-light-9);
    }

    .refresh-btn {
      position: absolute;
      top: 5px;
      right: 5px;
      z-index: 100;
    }
  }
}
</style>
