const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  chainWebpack: config => {
    // 配置 raw-loader
    config.module
      .rule('txt')
      .test(/\.(txt|tsv)$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end();
  }
})

