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
  const flowBase = channel.dataList[0].infos.map((item) => item.flow) // 基准流量
  const waterlevelBase = channel.dataList[0].infos.map((item) => item.waterlevel) // 基准水位
  const waterdepthBase = channel.dataList[0].infos.map((item) => item.waterdepth) // 基准水深
  for (let i = 0; i < channel.dataList.length; i++) {
    const v = channel.dataList[i]
    const k = {}
    k.time = v.time
    k.channelName = channel.channelName
    k.yData1 = v.infos.map((item) => item.flow) // 流量
    k.yData2 = v.infos.map((item) => item.waterlevel) // 水位
    k.yData3 = v.infos.map((item) => item.waterdepth) // 水深
    const obj = {
      flow: [
        {
          name: `flowBase-${channel.channelName}`,
          data: flowBase,
        },
        {
          name: channel.channelName,
          data: k.yData1,
        },
      ],
      waterlevel: [
        {
          name: `waterlevelBase-${channel.channelName}`,
          data: waterlevelBase,
        },
        {
          name: channel.channelName,
          data: k.yData2,
        },
      ],
      waterdepth: [
        {
          name: `waterdepthBase-${channel.channelName}`,
          data: waterdepthBase,
        },
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
        flow: result[v.time].flow.concat([
          {
            name: channel.channelName,
            data: k.yData1,
          },
          {
            name: `flowBase-${channel.channelName}`,
            data: flowBase,
          },
        ]),
        waterlevel: result[v.time].waterlevel.concat([
          {
            name: channel.channelName,
            data: k.yData2,
          },
          {
            name: `waterlevelBase-${channel.channelName}`,
            data: waterlevelBase,
          },
        ]),
        waterdepth: result[v.time].waterdepth.concat([
          {
            name: channel.channelName,
            data: k.yData3,
          },
          {
            name: `waterdepthBase-${channel.channelName}`,
            data: waterdepthBase,
          },
        ]),
      }
    }
  }
}

export { xData, timeData, result }
