<template>
  <div class="bg"
       :style="{ backgroundImage: `url(${bg})` }">
    <div ref="refBox"
         class="canvas-box">
      <canvas ref="refStarOne"
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

const refStarOne = ref(null)
function drawCanvas () {
  const c = refStarOne.value
  const context = c.getContext('2d')
  const width = caWidth.value // 画布宽度
  const height = 500 // 画布高度
  let fPoints = [
    { x: caWidth.value / 2, y: 410, r: 1.5 },
    { x: caWidth.value / 2, y: 410, r: 1.5 }
  ] // 初始点坐标
  function drawCircle () {
    for (const fPoint of fPoints) {
      context.lineWidth = 0 // 线条宽度-空心圆
      // context.strokeStyle = 'rgba(2, 179, 253,0.02)' // 颜色
      context.shadowBlur = 0 // 设置或返回用于阴影的颜色
      context.shadowColor = 'rgba(255, 255, 253,1)' // 设置或返回用于阴影的模糊级别
      context.fillStyle = 'rgba(255, 255, 253,1)' // 填充颜色-实心圆
      context.fill() // 画实心圆
      context.beginPath()
      context.arc(fPoint.x, fPoint.y, fPoint.r, 0, Math.PI * 2)
      context.closePath()
    }
    // 回到起始位置
    if (fPoints[0].x < 0) {
      fPoints = [
        { x: caWidth.value / 2, y: 410, r: 1.5 },
        { x: caWidth.value / 2, y: 410, r: 1.5 }
      ]
      return
    }
    // 向斜上方移动
    if (fPoints[0].y > 265) {
      fPoints[0].x -= 2
      fPoints[0].y -= 1.15
      fPoints[1].x += 2
      fPoints[1].y -= 1.15
    } else if (fPoints[0].y > 0) {
      // 向两侧移动
      fPoints[0].x -= 2.5
      fPoints[1].x += 2.5
    }
  }
  function render () {
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
    drawCircle()
    // 在动画没有结束前，递归渲染
    window.requestAnimationFrame(render)
  }
  window.requestAnimationFrame(render)
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
