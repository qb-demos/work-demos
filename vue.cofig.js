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
  }
}
