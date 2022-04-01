const path = require('path')
const isProd = process.env.NODE_ENV === 'production'
// const joinPath = dir => path.join(__dirname, dir)

module.exports = {
  // 设置应用根路径
  // publicPath: isProd ? '/admin/' : '/',

  // 如果不需要使用 eslint，把 lintOnSave 设为 false 即可
  // lintOnSave: false,

  // 关闭 sourceMap 以加速构建
  productionSourceMap: false,

  // 生产环境构建文件的目录
  // outputDir: 'dist',

  // 需要编译的依赖包名
  transpileDependencies: ['view-design'],

  // 设置别名
  chainWebpack: config => {
    config.resolve.alias
      .set('@c', path.resolve('src/components'))
  },

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true, // 开启 javascriptEnabled 支持写函数
      },
      // sass: {
      //   implementation: require('sass'), // Dart Sass 须加此配置
      //   prependData: '@import "~@/styles/variables.sass";', // 自动导入变量定义文件
      // },
      stylus: {
        import: ['~@/styles/var'], // 自动导入变量定义文件
      },
    },
    extract: {
      ignoreOrder: true, // 忽略加载顺序冲突
    },
  },

  configureWebpack: config => {
    // 生产环境配置
    if (isProd) {
      // 构建时移除 console 和 debugger
      const { options: terserOptions } = config.optimization.minimizer[0].options.minimizer
      terserOptions.compress.drop_console = true
      terserOptions.compress.drop_debugger = true

      // 配置 gzip 压缩
      const CompressionWebpackPlugin = require('compression-webpack-plugin')
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: /\.(js|css|html|svg)$/, // 匹配文件
          threshold: 10240, // 超过 10K 的数据进行压缩
        }),
      )
    }
  },

  // 设置代理解决跨域问题
  devServer: {
    // hot: false, // 关闭热更新
    // host: 'localhost',
    // port: 80,
    // open: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/api-dev': {
        target: 'http://dev-www.xxx.com/api/',
        changeOrigin: true,
        pathRewrite: { '^/api-dev': '' },
      },
      '/api-test': {
        target: 'https://test-www.xxx.com/api/',
        changeOrigin: true,
        pathRewrite: { '^/api-test': '' },
      },
    },
  },
}
