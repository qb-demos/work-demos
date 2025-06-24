import { rawData } from './binzhouMock'

let xData = []
let timeData = []
const result = {}
for (let j = 0; j < rawData.length; j++) {
  // x轴、时间，数据一致，只处理一次
  if (j == 0) {
    xData = rawData[j].dataList[0].infos.map((item) => item.station)
    timeData = rawData[j].dataList.map((item) => item.time)
  }
  const channel = rawData[j]
  for (let i = 0; i < channel.dataList.length; i++) {
    const v = channel.dataList[i]
    const k = {}
    k.time = v.time
    k.channelName = channel.channelName
    k.yData1 = v.infos.map((item) => item.flow)
    k.yData2 = v.infos.map((item) => item.waterlevel)
    k.yData3 = v.infos.map((item) => item.waterdepth)
    const obj = {
      flow: [
        {
          name: channel.channelName,
          data: k.yData1,
        },
      ],
      waterlevel: [
        {
          name: channel.channelName,
          data: k.yData2,
        },
      ],
      waterdepth: [
        {
          name: channel.channelName,
          data: k.yData3,
        },
      ],
    }
    if (!result[v.time]) {
      result[v.time] = obj
    } else {
      result[v.time] = {
        flow: result[v.time].flow.concat({
          name: channel.channelName,
          data: k.yData1,
        }),
        waterlevel: result[v.time].waterlevel.concat({
          name: channel.channelName,
          data: k.yData2,
        }),
        waterdepth: result[v.time].waterdepth.concat({
          name: channel.channelName,
          data: k.yData3,
        }),
      }
    }
  }
}

export { xData, timeData, result }
