<template>
  <div v-loading="loading" class="wrap">
    <div id="container" style="height: 100%"></div>
  </div>
</template>

<script>
import monacoLoader from '@monaco-editor/loader'
import * as theme from './theme'

export default {
  name: 'EditorCom',
  components: {},
  props: {
    options: {
      // https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html
      type: Object,
      default: () => { }
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: false,
      IStandaloneCodeEditor: null, // 编辑器实例
      ITextModel: null, // 编辑器实例里面的 model
      provider: null,
      defaultOptions: {
        language: 'sql',
        scrollBeyondLastLine: false,
        automaticLayout: false // 不要开启，性能不好
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    window.addEventListener('resize', this.editorLayout.bind(this))
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.loading = true
      monacoLoader.init()
        .then(monaco => {
          monaco.editor.defineTheme('customTheme', theme.customTheme01)
          const options = Object.assign({ value: this.value, theme: 'customTheme' }, this.defaultOptions, this.options)
          this.IStandaloneCodeEditor = monaco.editor.create(document.getElementById('container'), options)
          this.ITextModel = this.IStandaloneCodeEditor.getModel()
          this.loading = false

          // 鼠标事件
          this.IStandaloneCodeEditor.onMouseUp((e) => {
            const selection = this.ITextModel.getValueInRange(this.IStandaloneCodeEditor.getSelection())
            console.log('selection:', selection)
          })
          // 键盘事件
          this.IStandaloneCodeEditor.onKeyUp((e) => {
            const selection = this.ITextModel.getValueInRange(this.IStandaloneCodeEditor.getSelection())
            console.log('selection:', selection)
          })
          // model 内容变更
          this.ITextModel.onDidChangeContent(e => {
            const value = this.ITextModel.getValue()
            this.$emit('onVlueChange', value)
          })
        })
    },
    editorLayout () {
      this.IStandaloneCodeEditor.layout()
    }
  }
}
</script>

<style lang='less' scoped>
.wrap {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
}
</style>
