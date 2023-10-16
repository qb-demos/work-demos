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
  let fPoints = [
    { x: caWidth.value / 2, y: 60, r: 3 },
    { x: caWidth.value / 2, y: 60, r: 3 }
  ] // 初始点坐标
  function drawCircle () {
    for (const fPoint of fPoints) {
      context.shadowColor = 'rgba(19,238,227,1)' // 设置或返回用于阴影的模糊级别
      context.fillStyle = 'rgba(19,238,227,1)' // 填充颜色-实心圆
      // 实心圆
      // context.beginPath()
      // context.arc(fPoint.x, fPoint.y, fPoint.r, 3, Math.PI * 2)
      // context.closePath()
      // context.fill()
      // 正方形
      context.fillRect(fPoint.x, fPoint.y, 5, 5)
    }
    // 回到起始位置
    if (fPoints[0].x < -200) {
      fPoints = [
        { x: caWidth.value / 2, y: 60, r: 3 },
        { x: caWidth.value / 2, y: 60, r: 3 }
      ]
      return
    }
    // 移动
    const speed = 1.8
    fPoints[0].x -= speed
    fPoints[1].x += speed
  }
  function render () {
    // 默认值为source-over
    const prev = context.globalCompositeOperation
    // 只显示canvas上原图像的重叠部分
    context.globalCompositeOperation = 'source-in'
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
