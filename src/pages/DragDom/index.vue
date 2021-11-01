<template>
  <div>
    <div id="box">
      <div id="left" :style="{ width: `${dragWidth}px` }"></div>
      <div id="split-panel"></div>
      <div id="right"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DragDom',
  components: {},
  props: {},
  data () {
    return {
      dragWidth: 200
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () {
    this.moveSlideBar()
  },
  methods: {
    // 侧边栏拉伸
    moveSlideBar () {
      const _this = this
      const splitPanel = document.getElementById('split-panel')
      splitPanel.onmousedown = function (e) {
        splitPanel.style.background = '#409eff'
        let startX = e.clientX
        document.onmousemove = function (e) {
          // console.log(Date.now() - this.time)
          // 节流
          // if (this.time && (Date.now() - this.time) < 20) return
          // this.time = Date.now()

          const endX = e.clientX
          const moveLen = startX - endX
          startX = endX
          // 设置拖动幅度
          _this.dragWidth -= moveLen
        }
        return false
      }
      splitPanel.onmouseup = function () {
        // 重置slipte
        splitPanel.style.background = ''
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
</script>

<style lang='less' scoped>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
}
#box {
  width: 600px;
  height: 500px;
  overflow: hidden;
  display: flex;
}
#left {
  height: 100%;
  width: 200px;
  background: skyblue;
}
#split-panel {
  width: 5px;
  height: 100%;
  cursor: w-resize;
}
#right {
  flex: 1;
  height: 100%;
  background-color: pink;
}
</style>
