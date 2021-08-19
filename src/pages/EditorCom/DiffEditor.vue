<template>
  <div v-loading="loading" class="wrap">
    <div id="diffContainer" style="height: 100%"></div>
  </div>
</template>

<script>
import monacoLoader from '@monaco-editor/loader'
import * as theme from './theme'

export default {
  name: 'DiffEditor',
  components: {},
  props: {
    options: {
      // https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html
      type: Object,
      default: () => { }
    },
    originalValue: { // 原始版本代码
      type: String,
      default: ''
    },
    modifiedValue: { // 新版本代码
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: false,
      IStandaloneDiffEditor: null, // 编辑器实例
      originalModel: null, // 编辑器实例里面的 model
      modifiedModel: null, // 编辑器实例里面的 model
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
          // 配置项
          const options = Object.assign(
            {
              theme: 'customTheme',
              contextmenu: false
            },
            this.defaultOptions,
            this.options,
            { readOnly: true } // 代码对比时强制不可编辑
          )
          // 语言
          const language = this.options.language || this.defaultOptions.language
          this.originalModel = monaco.editor.createModel(this.originalValue, language)
          this.modifiedModel = monaco.editor.createModel(this.modifiedValue, language)
          // 实例
          this.IStandaloneDiffEditor = monaco.editor.createDiffEditor(document.getElementById('diffContainer'), options)
          this.IStandaloneDiffEditor.setModel({
            original: this.originalModel,
            modified: this.modifiedModel
          })
          this.loading = false

          // model 内容变更
          // this.ITextModel.onDidChangeContent(e => {
          //   const value = this.ITextModel.getValue()
          //   this.$emit('onVlueChange', value)
          // })
        })
    },
    editorLayout () {
      this.IStandaloneDiffEditor.layout()
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
