<template>
  <div class="page-wrap">
    <div class="chart-wrap">
      <div
        id="chart-dom-1"
        class="chart-item"
        style="height: 200px"></div>
      <div
        id="chart-dom-2"
        class="chart-item"
        style="height: 200px"></div>
    </div>

    <div>当前时间：{{ activeTime }}</div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { line2Options } from './options'
import { xData as xData2, timeData, result } from './binzhou'

// 折线图2【随时间变化不断更新】
const activeTimeIndex = ref(0)
const yDataList = computed(() => result[timeData[activeTimeIndex.value]].flow)
const activeTime = computed(() => timeData[activeTimeIndex.value])
let chartInstanceLine1 = null
let chartInstanceLine2 = null
function initLine2Chart() {
  if (chartInstanceLine1) {
    chartInstanceLine1.dispose()
  }
  if (chartInstanceLine2) {
    chartInstanceLine2.dispose()
  }
  const chartDom = document.getElementById('chart-dom-1')
  chartInstanceLine1 = echarts.init(chartDom)
  const chartDom2 = document.getElementById('chart-dom-2')
  chartInstanceLine2 = echarts.init(chartDom2)

  let option1 = null
  let option2 = null
  const yDataList1 = yDataList.value.slice(0, 1)
  const yDataList2 = yDataList.value.slice(1, 5)
  option1 = line2Options(xData2, yDataList1)
  option1 && chartInstanceLine1.setOption(option1)
  option2 = line2Options(xData2, yDataList2)
  option2 && chartInstanceLine2.setOption(option2)
  updateLine2Chart()
}
function updateLine2Chart() {
  setTimeout(() => {
    if (activeTimeIndex.value + 1 >= timeData.length) {
      activeTimeIndex.value = 0
    } else {
      activeTimeIndex.value++
    }
    const yDataList1 = yDataList.value.slice(0, 1)
    const yDataList2 = yDataList.value.slice(1, 5)
    chartInstanceLine1.setOption({
      xAxis: {
        data: xData2,
      },
      series: yDataList1.map((v) => ({
        name: v.name,
        data: v.data,
        type: 'line',
        smooth: true,
        symbol: 'none',
      })),
    })
    chartInstanceLine2.setOption({
      xAxis: {
        data: xData2,
      },
      series: yDataList2.map((v) => ({
        name: v.name,
        data: v.data,
        type: 'line',
        smooth: true,
        symbol: 'none',
      })),
    })
    updateLine2Chart()
  }, 200)
}

onMounted(() => {
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
    display: flex;
    align-items: center;
    width: 100%;

    .chart-item {
      width: 50%;
      height: 100%;
      background-color: var(--el-color-info-light-9);

      &.half {
        width: 50%;
      }
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
