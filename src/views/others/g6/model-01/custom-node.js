import { Rect as GRect, Text as GText } from '@antv/g'
import { Badge, CommonEvent, iconfont, Rect, HTML, ExtensionCategory, register } from '@antv/g6'

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

// 自定义节点-继承自 Rect
export class CustomNodeRect01 extends Rect {
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

// 自定义 HTML节点
export class CustomNodeHTML01 extends HTML {
  get data() {
    return this.context.model.getNodeLikeDatum(this.id)
  }

  get childrenData() {
    return this.context.model.getChildrenData(this.id)
  }

  getKeyStyle(attributes) {
    const keyStyle = super.getKeyStyle(attributes)
    return {
      ...keyStyle,
      width: 200,
      height: 60,
    }
  }

  render(attributes = this.parsedAttributes, container) {
    const data = this.data
    const { collapsed } = attributes

    // 创建HTML内容 - 只显示名字
    const html = `
      <div style="
        width: 200px;
        height: 60px;
        overflow: hidden;
        background: white;
        border: 1px solid ${GREY_COLOR};
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        padding: 10px;
        box-sizing: border-box;
        position: relative;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        display: flex;
      ">
        <!-- 状态条 -->
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: ${COLORS[data.status]};
          border-radius: 8px 8px 0 0;
        "></div>
        
        <!-- 名称 -->
        <div class="node-text" style="
          font-size: 14px;
          color: #303133;
          width: 100%;
          padding-right: ${this.childrenData.length > 0 ? '30px' : '0'};
          height: 40px;
          line-height: 20px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          word-break: break-word;
          cursor: default;
        " title="${data.name}">${data.name}</div>
        
        <!-- 展开/折叠按钮 -->
        ${
          this.childrenData.length > 0
            ? `
          <div class="collapse-btn" style="
            position: absolute;
            top: 50%;
            right: 8px;
            transform: translateY(-50%);
            width: 16px;
            height: 16px;
            background: #409EFF;
            color: white;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 12px;
            font-weight: bold;
            border: 2px solid white;
          " data-collapsed="${collapsed}">
            ${collapsed ? '+' : '-'}
          </div>
        `
            : ''
        }
      </div>
    `

    super.render(
      {
        ...attributes,
        innerHTML: html,
      },
      container
    )

    // 绑定展开/折叠事件
    if (this.childrenData.length > 0) {
      const collapseBtn = this.getDomElement()?.querySelector('.collapse-btn')
      if (collapseBtn && !Reflect.has(collapseBtn, '__bind__')) {
        Reflect.set(collapseBtn, '__bind__', true)
        collapseBtn.addEventListener('click', (e) => {
          e.stopPropagation()
          const graph = this.context.graph
          if (collapsed) {
            graph.expandElement(this.id)
          } else {
            graph.collapseElement(this.id)
          }
        })
      }
    }
  }
}

// 注册自定义节点
export function registerCustomNodes() {
  register(ExtensionCategory.NODE, 'custom-node-rect-01', CustomNodeRect01)
  register(ExtensionCategory.NODE, 'custom-node-html-01', CustomNodeHTML01)
}
