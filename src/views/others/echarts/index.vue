<template>
  <div class="page-wrap">
    <div class="chart-wrap">
      <div
        id="chart-dom-1"
        class="chart-item"></div>
      <el-button
        type="primary"
        class="refresh-btn"
        @click="onRefresh('line')">
        刷新
      </el-button>
    </div>
    <div class="chart-wrap">
      <div
        id="chart-dom-2"
        class="chart-item"></div>
      <el-button
        type="primary"
        class="refresh-btn"
        @click="onRefresh('bar')">
        刷新
      </el-button>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { xData, yData } from './mock'
import { lineOptions, barOptions } from './options'

let chartInstanceLine = null
function initLineChart() {
  if (chartInstanceLine) {
    chartInstanceLine.dispose()
  }
  const chartDom = document.getElementById('chart-dom-1')
  chartInstanceLine = echarts.init(chartDom)
  let option

  option = lineOptions(xData, yData)
  option && chartInstanceLine.setOption(option)
}
let chartInstanceBar = null
function initBarChart() {
  if (chartInstanceBar) {
    chartInstanceBar.dispose()
  }
  const chartDom = document.getElementById('chart-dom-2')
  chartInstanceBar = echarts.init(chartDom)
  let option

  option = barOptions(xData, yData)
  option && chartInstanceBar.setOption(option)
}
function onRefresh(type) {
  if (type === 'line') {
    initLineChart()
  } else {
    initBarChart()
  }
}

onMounted(() => {
  initLineChart()
  initBarChart()
})
onBeforeUnmount(() => {})
</script>

<style lang="scss" scoped>
.page-wrap {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  padding-top: 60px;

  .chart-wrap {
    position: relative;
    width: 100%;
    height: 100px;

    .chart-item {
      width: 100%;
      height: 100%;
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
