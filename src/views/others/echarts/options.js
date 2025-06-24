export const lineOptions = (xData, yData) => {
  return {
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
      seriesIndex: 0, // 只影响 series 第一个项【折线图】
      pieces: [
        { lte: 5, color: '#a1f18d' },
        { gt: 5, lte: 10, color: '#3dba3d' },
        { gt: 10, lte: 20, color: '#6acef2' },
        { gt: 20, lte: 50, color: '#0000ff' },
        { gt: 50, lte: 100, color: '#fa00fa' },
        { gt: 100, color: '#800040' },
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
}

export const barOptions = (xData, yData) => {
  return {
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
      seriesIndex: 0, // 只影响 series 第一个项【折线图】
      pieces: [
        { lte: 5, color: '#a1f18d' },
        { gt: 5, lte: 10, color: '#3dba3d' },
        { gt: 10, lte: 20, color: '#6acef2' },
        { gt: 20, lte: 50, color: '#0000ff' },
        { gt: 50, lte: 100, color: '#fa00fa' },
        { gt: 100, color: '#800040' },
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
      {
        name: '',
        type: 'bar',
        data: yData,
        itemStyle: {
          borderRadius: [5, 5, 0, 0],
          color: 'rgba(0, 0, 0, 0.3)',
        },
      },
    ],
  }
}
