<template>
  <div class="bg"
       :style="{ backgroundImage: `url(${bg})` }">
    <div ref="refBox"
         class="canvas-box">
      <canvas ref="refStar"
              :width="caWidth"
              height="500" />
    </div>
  </div>
</template>

<script setup>
import bg from '../imgs/light.png'

const refBox = ref(null)
const caWidth = ref(770)
function getWidth () {
  caWidth.value = refBox.value.clientWidth
}

const refStar = ref(null)
function drawCanvas () {
  const c = refStar.value
  const context = c.getContext('2d')
  const width = caWidth.value // 画布宽度
  const height = 500 // 画布高度

  const lineLen = 200
  const lineWidth = 3 // 线条的宽度
  let points = [
    { startX: caWidth.value / 2 + lineLen, startY: 60, endX: caWidth.value / 2, endY: 60 },
    { startX: caWidth.value / 2 - lineLen, startY: 60, endX: caWidth.value / 2, endY: 60 }
  ] // 初始点坐标

  function draw () {
    for (const p of points) {
      const gradient = context.createLinearGradient(p.startX, p.startY, p.endX, p.endY) // 创建渐变对象
      gradient.addColorStop(0, 'rgba(19,238,227, 1)') // 渐变的起始颜色，不透明
      gradient.addColorStop(1, 'rgba(0, 193, 220, 0)') // 渐变的结束颜色，完全透明

      // 绘制线条
      context.beginPath()
      context.moveTo(p.startX, p.startY)
      context.lineTo(p.endX, p.endY)
      context.lineWidth = lineWidth
      context.lineCap = 'square' // 设置线条的端点样式
      context.strokeStyle = gradient // 设置线条颜色和透明度
      context.shadowColor = 'rgba(19,238,227, 0.5)' // 设置阴影颜色和透明度
      context.shadowBlur = 10 // 设置阴影的模糊程度
      context.stroke()
    }
    // 回到起始位置
    if (points[0].endX > (caWidth.value + 200)) {
      points = [
        { startX: caWidth.value / 2 + lineLen, startY: 60, endX: caWidth.value / 2, endY: 60 },
        { startX: caWidth.value / 2 - lineLen, startY: 60, endX: caWidth.value / 2, endY: 60 }
      ]
    }

    // 更新线条的位置
    const speed = 2
    points[0].startX += speed
    points[0].endX += speed
    points[1].startX -= speed
    points[1].endX -= speed
  }

  function drawLine () {
    // context.clearRect(0, 0, width, height) // 清空画布
    // 默认值为source-over
    const prev = context.globalCompositeOperation
    // 只显示canvas上原图像的重叠部分
    context.globalCompositeOperation = 'destination-in'
    // 设置主canvas的绘制透明度
    context.globalAlpha = 0.9
    // 这一步目的是将canvas上的图像变的透明
    context.fillRect(0, 0, width, height)
    // 在原图像上重叠新图像
    context.globalCompositeOperation = prev
    // 在主canvas上画新圆
    draw()
    // 递归调用绘制函数
    window.requestAnimationFrame(drawLine)
  }

  // 开始绘制
  window.requestAnimationFrame(drawLine)
}

onMounted(() => {
  getWidth()
  drawCanvas()
})
onBeforeUnmount(() => { })
</script>

<style lang='scss' scoped>
.bg {
  width: 100%;
  height: 500px;
  background: center no-repeat;
  background-size: 1920px 500px;
}

.canvas-box {
  margin: 0 auto;
  width: 100%;
}
</style>
