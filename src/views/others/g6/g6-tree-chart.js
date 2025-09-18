import { Rect as GRect, Text as GText } from '@antv/g'
import { Badge, CommonEvent, iconfont, Rect } from '@antv/g6'

const style = document.createElement('style')
style.innerHTML = `@import url('${iconfont.css}');`
document.head.appendChild(style)

export const COLORS = {
  B: '#1783FF',
  R: '#F46649',
  Y: '#DB9D0D',
  G: '#60C42D',
  DI: '#A7A7A7',
}
export const GREY_COLOR = '#CED4D9'

// 自定义节点
export class TreeNode01 extends Rect {
  get data() {
    return this.context.model.getNodeLikeDatum(this.id)
  }

  get childrenData() {
    return this.context.model.getChildrenData(this.id)
  }

  getLabelStyle(attributes) {
    const [width, height] = this.getSize(attributes)
    return {
      x: -width / 2 + 8,
      y: -height / 2 + 16,
      text: this.data.name,
      fontSize: 14,
      opacity: 1,
      fill: '#000',
      cursor: 'pointer',
    }
  }

  getPriceStyle(attributes) {
    const [width, height] = this.getSize(attributes)
    return {
      x: -width / 2 + 8,
      y: height / 2 - 8,
      text: this.data.label,
      fontSize: 16,
      fill: '#000',
      opacity: 0.85,
    }
  }

  drawPriceShape(attributes, container) {
    const priceStyle = this.getPriceStyle(attributes)
    this.upsert('price', GText, priceStyle, container)
  }

  getProcessBarStyle(attributes) {
    const { status } = this.data
    const { radius } = attributes
    const color = COLORS[status]
    const percent = `100%`
    const [width, height] = this.getSize(attributes)
    return {
      x: -(width / 2),
      y: -height / 2,
      width: 3,
      height: height,
      radius: [radius, radius, 0, 0],
      fill: `linear-gradient(to right, ${color} ${percent}, ${GREY_COLOR} ${percent})`,
    }
  }

  drawProcessBarShape(attributes, container) {
    const processBarStyle = this.getProcessBarStyle(attributes)
    this.upsert('process-bar', GRect, processBarStyle, container)
  }

  getCollapseStyle(attributes) {
    if (this.childrenData.length === 0) return false
    const { collapsed } = attributes
    const [width] = this.getSize(attributes)
    return {
      backgroundFill: '#fff',
      backgroundHeight: 16,
      backgroundLineWidth: 1,
      backgroundRadius: 0,
      backgroundStroke: GREY_COLOR,
      backgroundWidth: 16,
      cursor: 'pointer',
      fill: GREY_COLOR,
      fontSize: 16,
      text: collapsed ? '+' : '-',
      textAlign: 'center',
      textBaseline: 'middle',
      x: width / 2,
      y: 0,
    }
  }

  drawCollapseShape(attributes, container) {
    const collapseStyle = this.getCollapseStyle(attributes)
    const btn = this.upsert('collapse', Badge, collapseStyle, container)

    if (btn && !Reflect.has(btn, '__bind__')) {
      Reflect.set(btn, '__bind__', true)
      btn.addEventListener(CommonEvent.CLICK, () => {
        const { collapsed } = this.attributes
        const graph = this.context.graph
        if (collapsed) graph.expandElement(this.id)
        else graph.collapseElement(this.id)
      })
    }
  }

  getKeyStyle(attributes) {
    const keyStyle = super.getKeyStyle(attributes)
    return {
      ...keyStyle,
      fill: '#fff',
      lineWidth: 1,
      stroke: GREY_COLOR,
    }
  }

  render(attributes = this.parsedAttributes, container) {
    super.render(attributes, container)

    // 渲染价格
    // this.drawPriceShape(attributes, container)
    // 渲染进度条
    this.drawProcessBarShape(attributes, container)
    // 渲染折叠按钮
    this.drawCollapseShape(attributes, container)
  }
}
