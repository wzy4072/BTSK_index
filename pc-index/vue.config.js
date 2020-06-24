// 'use strict'
const path = require('path')
const name = 'vue Element Admin' 
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },
  devServer: {
    port: 8090,
    // open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      api: {
        target: `http://127.0.0.1:8090`,
        changeOrigin: true,
        pathRewrite: {
          api: '',
        },
      },
    },
    // before: require('./mock/mock-server.js'),
  },
}
