const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  devServer: {
    port: 8089, // 配置端口
    // 设置让浏览器 overlay 同时显示警告和错误
    overlay: {
      warnings: true,
      errors: true
    }
  },
  configureWebpack: (config) => {
    config.plugins = [
      ...config.plugins,
      // monaco editor
      new MonacoWebpackPlugin({
        // 语言包
        languages: ['javascript', 'css', 'html', 'json', 'sql'],
        // 控件(https://github.com/microsoft/monaco-editor-webpack-plugin#options)
        features: ['clipboard', 'comment', 'gotoLine', 'smartSelect', 'suggest', 'wordHighlighter', 'coreCommands', 'find']
      })
    ]
    let pluginsProd = []
    let pluginsDev = []
    if (process.env.NODE_ENV === 'production') {
      // 删除 console.log 语句
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
      // console.log(`config.optimization.minimizer[0]:`, config.optimization.minimizer[0].options.terserOptions)
      config.plugins = [...config.plugins, ...pluginsProd]
    } else {
      config.plugins = [...config.plugins, ...pluginsDev]
    }
  },
  chainWebpack (config) {
    config.module
      .rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true
      })
  }
}
