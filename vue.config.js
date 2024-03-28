const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   proxy: "http://192.168.31.99:8080",
  // },
});

module.exports = {
  devServer: {
    host: 'localhost',
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://8.134.104.253:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
