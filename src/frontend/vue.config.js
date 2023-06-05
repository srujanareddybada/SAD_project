// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })


module.exports = {
  "devServer": {
      "port": 8081,
      "proxy": {
          "^/api": {
              "target": "http://localhost:3000",
              "changeOrigin": true
          }
      }
  }
}