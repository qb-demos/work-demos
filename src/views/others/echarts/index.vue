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
    <div class="chart-wrap">
      <div
        id="chart-dom-3"
        class="chart-item"
        style="height: 200px"></div>
      <el-button
        type="primary"
        class="refresh-btn"
        @click="onRefresh('line2')">
        刷新
      </el-button>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { xData, yData } from './mock'
import { lineOptions, barOptions, line2Options } from './options'
import { xData as xData2, timeData, result } from './binzhou'

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
  } else if (type === 'bar') {
    initBarChart()
  } else {
    initLine2Chart()
  }
}
// 折线图2【随时间变化不断更新】
const activeTimeIndex = ref(0)
const yDataList = computed(() => result[timeData[activeTimeIndex.value]].flow)
let chartInstanceLine2 = null
function initLine2Chart() {
  if (chartInstanceLine2) {
    chartInstanceLine2.dispose()
  }
  const chartDom = document.getElementById('chart-dom-3')
  chartInstanceLine2 = echarts.init(chartDom)
  let option

  option = line2Options(xData2, yDataList.value)
  option && chartInstanceLine2.setOption(option)
  updateLine2Chart()
}
function updateLine2Chart() {
  setTimeout(() => {
    if (activeTimeIndex.value + 1 >= timeData.length) {
      activeTimeIndex.value = 0
    } else {
      activeTimeIndex.value++
    }
    const activeTime = timeData[activeTimeIndex.value]
    console.log('%c activeTime: ', 'background-color: pink', activeTime)
    console.log('%c yDataList.value: ', 'background-color: pink', yDataList.value)
    chartInstanceLine2.setOption({
      xAxis: {
        data: xData2,
      },
      series: yDataList.value.map((v) => ({
        name: v.name,
        data: v.data,
        type: 'line',
        smooth: true,
        symbol: 'none',
      })),
    })
    updateLine2Chart()
  }, 500)
}

onMounted(() => {
  initLineChart()
  initBarChart()
  initLine2Chart()
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
