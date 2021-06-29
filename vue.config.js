module.exports = {
  // 生产环境不生成 .map
  productionSourceMap: false,
  // 不单独打包 css
  css: {
    extract: false
  },
  configureWebpack: {
    // 通过 CDN 引入
    externals: {
      vue: 'Vue',
      vant: 'vant'
    }
  }
}
