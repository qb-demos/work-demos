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
      // monaco editor
      new MonacoWebpackPlugin({
        languages: ['javascript', 'css', 'html', 'json', 'sql'], // 语言包
        features: ['coreCommands', 'find'] // 控件
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
  }
}
