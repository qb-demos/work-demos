<template>
  <div class="wrap">
    <div>
      <el-button @click="printHTML" type="primary" style="margin: 15px"
        >打印 DOM 元素</el-button
      >
      <div id="printBox" class="markdown-body">
        <h1 id="h1-heading-1">
          <a name="Heading 1" class="reference-link"></a
          ><span class="header-link octicon octicon-link"></span>Heading 1
        </h1>
        <h2 id="h2-heading-2">
          <a name="Heading 2" class="reference-link"></a
          ><span class="header-link octicon octicon-link"></span>Heading 2
        </h2>
        <h3 id="h3-heading-3">
          <a name="Heading 3" class="reference-link"></a
          ><span class="header-link octicon octicon-link"></span>Heading 3
        </h3>
        <h4 id="h4-heading-4">
          <a name="Heading 4" class="reference-link"></a
          ><span class="header-link octicon octicon-link"></span>Heading 4
        </h4>
        <h5 id="h5-heading-5">
          <a name="Heading 5" class="reference-link"></a
          ><span class="header-link octicon octicon-link"></span>Heading 5
        </h5>
        <h6 id="h6-heading-6">
          <a name="Heading 6" class="reference-link"></a
          ><span class="header-link octicon octicon-link"></span>Heading 6
        </h6>
        <h4>
          <a
            name="标题（用底线的形式）Heading (underline)"
            class="reference-link"
          ></a
          ><span class="header-link octicon octicon-link"></span
          >标题（用底线的形式）Heading (underline)
        </h4>
        <h1 id="h1-this-is-an-h1">
          <a name="This is an H1" class="reference-link"></a
          ><span class="header-link octicon octicon-link"></span>This is an H1
        </h1>
        <h2 id="h2-this-is-an-h2">
          <a name="This is an H2" class="reference-link"></a
          ><span class="header-link octicon octicon-link"></span>This is an H2
        </h2>
        <h3 id="h3-u5B57u7B26u6548u679Cu548Cu6A2Au7EBFu7B49">
          <a name="字符效果和横线等" class="reference-link"></a
          ><span class="header-link octicon octicon-link"></span
          >字符效果和横线等
        </h3>
        <hr />
        <p>
          <del>删除线</del> <s>删除线（开启识别HTML标签时）</s><br /><em
            >斜体字</em
          >
          <em>斜体字</em><br /><strong>粗体</strong> <strong>粗体</strong
          ><br /><strong><em>粗斜体</em></strong>
          <strong><em>粗斜体</em></strong>
        </p>
        <p>上标：X<sub>2</sub>，下标：O<sup>2</sup></p>
        <p><strong>缩写(同HTML的abbr标签)</strong></p>
        <blockquote>
          <p>
            即更长的单词或短语的缩写形式，前提是开启识别HTML标签时，已默认开启
          </p>
        </blockquote>
        <p>
          The
          <abbr title="Hyper Text Markup Language">HTML</abbr> specification is
          maintained by the <abbr title="World Wide Web Consortium">W3C</abbr>.
        </p>
        <h3 id="h3--blockquotes">
          <a name="引用 Blockquotes" class="reference-link"></a
          ><span class="header-link octicon octicon-link"></span>引用
          Blockquotes
        </h3>
        <blockquote>
          <p>引用文本 Blockquotes</p>
        </blockquote>
        <p>引用的行内混合 Blockquotes</p>
        <h4 id="h4--unordered-lists-">
          <a
            name="无序列表（减号）Unordered Lists (-)"
            class="reference-link"
          ></a
          ><span class="header-link octicon octicon-link"></span
          >无序列表（减号）Unordered Lists (-)
        </h4>
        <ul>
          <li>列表一</li>
          <li>列表二</li>
          <li>列表三</li>
        </ul>
        <h4 id="h4--unordered-lists-">
          <a
            name="无序列表（星号）Unordered Lists (*)"
            class="reference-link"
          ></a
          ><span class="header-link octicon octicon-link"></span
          >无序列表（星号）Unordered Lists (*)
        </h4>
        <ul>
          <li>列表一</li>
          <li>列表二</li>
          <li>列表三</li>
        </ul>
        <h4 id="h4--unordered-lists-">
          <a
            name="无序列表（加号和嵌套）Unordered Lists (+)"
            class="reference-link"
          ></a
          ><span class="header-link octicon octicon-link"></span
          >无序列表（加号和嵌套）Unordered Lists (+)
        </h4>
        <ul>
          <li>列表一</li>
          <li>
            列表二
            <ul>
              <li>列表二-1</li>
              <li>列表二-2</li>
              <li>列表二-3</li>
            </ul>
          </li>
          <li>
            列表三
            <ul>
              <li>列表一</li>
              <li>列表二</li>
              <li>列表三</li>
            </ul>
          </li>
        </ul>
        <h4 id="h4--ordered-lists-">
          <a name="有序列表 Ordered Lists (-)" class="reference-link"></a
          ><span class="header-link octicon octicon-link"></span>有序列表
          Ordered Lists (-)
        </h4>
        <ol>
          <li>第一行</li>
          <li>第二行</li>
          <li>第三行</li>
        </ol>
        <h4 id="h4-gfm-task-list">
          <a name="GFM task list" class="reference-link"></a
          ><span class="header-link octicon octicon-link"></span>GFM task list
        </h4>
        <ul>
          <li style="list-style: none">
            <input
              type="checkbox"
              class="task-list-item-checkbox"
              checked=""
              disabled=""
            />
            GFM task list 1
          </li>
          <li style="list-style: none">
            <input
              type="checkbox"
              class="task-list-item-checkbox"
              checked=""
              disabled=""
            />
            GFM task list 2
          </li>
          <li style="list-style: none">
            <input type="checkbox" class="task-list-item-checkbox" /> GFM task
            list 3
            <ul>
              <li style="list-style: none">
                <input type="checkbox" class="task-list-item-checkbox" /> GFM
                task list 3-1
              </li>
              <li style="list-style: none">
                <input type="checkbox" class="task-list-item-checkbox" /> GFM
                task list 3-2
              </li>
              <li style="list-style: none">
                <input type="checkbox" class="task-list-item-checkbox" /> GFM
                task list 3-3
              </li>
            </ul>
          </li>
          <li style="list-style: none">
            <input type="checkbox" class="task-list-item-checkbox" /> GFM task
            list 4
            <ul>
              <li style="list-style: none">
                <input type="checkbox" class="task-list-item-checkbox" /> GFM
                task list 4-1
              </li>
              <li style="list-style: none">
                <input type="checkbox" class="task-list-item-checkbox" /> GFM
                task list 4-2
              </li>
            </ul>
          </li>
        </ul>
        <hr />
        <h3 id="h3--tables">
          <a name="绘制表格 Tables" class="reference-link"></a
          ><span class="header-link octicon octicon-link"></span>绘制表格 Tables
        </h3>
        <table>
          <thead>
            <tr>
              <th>表格--1</th>
              <th style="text-align: right">价格</th>
              <th style="text-align: center">数量</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>计算机</td>
              <td style="text-align: right">$1600</td>
              <td style="text-align: center">5</td>
            </tr>
            <tr>
              <td>手机</td>
              <td style="text-align: right">$12</td>
              <td style="text-align: center">12</td>
            </tr>
            <tr>
              <td>管线</td>
              <td style="text-align: right">$1</td>
              <td style="text-align: center">234</td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>表格--2</th>
              <th>Second Header</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Content Cell</td>
              <td>Content Cell</td>
            </tr>
            <tr>
              <td>Content Cell</td>
              <td>Content Cell</td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>表格--3</th>
              <th>Second Header</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Content Cell</td>
              <td>Content Cell</td>
            </tr>
            <tr>
              <td>Content Cell</td>
              <td>Content Cell</td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>表格--4</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>help()</code></td>
              <td>Display the help window.</td>
            </tr>
            <tr>
              <td><code>destroy()</code></td>
              <td><strong>Destroy your computer!</strong></td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th style="text-align: left">表格--5</th>
              <th style="text-align: center">Center Aligned</th>
              <th style="text-align: right">Right Aligned</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align: left">col 3 is</td>
              <td style="text-align: center">some wordy text</td>
              <td style="text-align: right">$1600</td>
            </tr>
            <tr>
              <td style="text-align: left">col 2 is</td>
              <td style="text-align: center">centered</td>
              <td style="text-align: right">$12</td>
            </tr>
            <tr>
              <td style="text-align: left">zebra stripes</td>
              <td style="text-align: center">are neat</td>
              <td style="text-align: right">$1</td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>表格--6</th>
              <th style="text-align: right">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Computer</td>
              <td style="text-align: right">$1600</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td style="text-align: right">$12</td>
            </tr>
            <tr>
              <td>Pipe</td>
              <td style="text-align: right">$1</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <h4 id="h4--html-entities-codes">
          <a name="特殊符号 HTML Entities Codes" class="reference-link"></a
          ><span class="header-link octicon octicon-link"></span>特殊符号 HTML
          Entities Codes
        </h4>
        <p>© &amp; ¨ ™ ¡ £<br />&amp; &lt; &gt; ¥ € ® ± ¶ § ¦ ¯ « ·</p>
        <p>X² Y³ ¾ ¼ × ÷ »</p>
        <p>18ºC " '</p>
      </div>
    </div>
  </div>
</template>

<script>
import print from 'print-js'
import 'print-js/dist/print.css'
import printStyle from './style'

export default {
  name: 'PrintPage',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    printHTML () {
      print({
        printable: 'printBox',
        type: 'html',
        // style 可用，css 不可用，可能是引入时路径出错
        style: printStyle,
        // css: require('./test.css'),
        scanStyles: false,
        maxWidth: 800,
        documentTitle: '打印测试'
        // 打印内容使用所有 HTML 样式，没有设置这个属性/值，设置分页打印没有效果
        // targetStyles: ['*']
      })
    }
  }
}
</script>

<style lang='less' scoped>
@import url('./github-md.css');
// @import url('./index.css');
.wrap {
  height: 400px;
  overflow-y: auto;
  border: 1px solid #ccc;
}
</style>
