module.exports = {
    devServer: {
      port: 8888,
      proxy: {
        '/api': {
          target: 'http://localhost:8080', // 配置访问的服务器地址
          // target: 'http://ego.vipgz4.91tunnel.com', // 配置访问的服务器地址
          
          pathRewrite: { '^/api': '' },  // 用于将请求中的 /api 字符串替换为空, 然后访问地址就能正确访问，若不添加此行配置，那么访问地址就变成了： http://localhost:5000/api/request_url，这样的请求就会出现 404 操作
          ws: true, // 是否支持 webstocket, 默认是 true
          changeOrigin: true // 用于控制请求头中的 host 值, 默认是 ture
        },
        '/ai': {
          target: 'http://172.22.89.166:5000', // 配置访问的服务器地址
          // target: 'http://ego.vipgz4.91tunnel.com', // 配置访问的服务器地址
          
          pathRewrite: { '^/ai': '' },  // 用于将请求中的 /api 字符串替换为空, 然后访问地址就能正确访问，若不添加此行配置，那么访问地址就变成了： http://localhost:5000/api/request_url，这样的请求就会出现 404 操作
          ws: true, // 是否支持 webstocket, 默认是 true
          changeOrigin: true // 用于控制请求头中的 host 值, 默认是 ture
        }
      }
    }
  }