
const path = require('path');
//自动生成html入口文件和引用js文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//打包Css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//压缩Css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
//webpack开箱即用的插件,压缩Js
const TerserPlugin = require('terser-webpack-plugin');
//开启PWA,渐进式网络程序，需要浏览器注册serviceWorker
const WorkboxPlugin = require("workbox-webpack-plugin")
//依赖图
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const webpack = require("webpack")

module.exports = {
  mode: 'development',
  // mode: "production",
  // 入口文件
  entry: {
    index: path.join(__dirname, 'src', 'index.js'),
    another: path.join(__dirname, 'src', 'another-module.js'),
    // 抽离公共模块的一种方法，公用部分抽离放到新的 lodash.js文件
    // index: {
    //     import: path.join(__dirname, "src", "index.js"),
    //     dependOn: "lodash",
    //     filename: "/scripts/chared1/[name].js"
    // },
    // another: {
    //     import: path.join(__dirname, "src", "another-module.js"),
    //     dependOn: "lodash",
    //     filename: "/scripts/chared2/[name].js"
    // },
    // //公共模块lodash
    // lodash: {
    //     import: "lodash",
    //     filename: "/scripts/common/[name].js"
    // },
  },
  // 输出文件
  output: {
    path: path.join(__dirname, 'dist'),
    // 多入口文件命名,文件改变时通过文本字符模板的哈希命名来告诉浏览器更新缓存
    filename: 'scripts/[name].[contenthash].js',
    // 打包前清理dist文件夹
    clean: true,
    // 静态资源输出路径，可以在rules中配置，这里的优先级比generator低
    assetModuleFilename: 'images/[contenthash][ext]',
    // 输出文件的公共路径，基础文件路径用的都是相对路径口，
    // publicPath: 'http://loachost:8000/',
  },

  // 在开发模式下追踪代码，开发一般推荐使用'cheap-module-source-map'
  devtool: 'inline-source-map',
  // 配置解析module规则
  module: {
    rules: [
      // js资源
      {
        test: /\.js|jsx$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          'cache-loader',
          'thread-loader',
          {
            loader: 'babel-loader',
            // 预设：Babel插件集合,也可外部增加.babelrc文件配置
            options: {
              presets: [
                ['@babel/preset-env',
                  //配置polyfill兼容
                  {
                    targets: [
                      '> 1%',
                      'last 1 version',
                    ],
                    useBuiltIns: 'usage',
                    corejs: 3
                  }
                ]
              ],
              plugins: [
                // 兼容async/await的语法，需要regeneratorRuntime插件支持，安装@babel/runtime和@babel/plugin-transform-runtime"
                '@babel/plugin-transform-runtime',
              ],
            },
          },]
      },
      // asset/resource 导出静态文件，即发送一个单独的文件并生成url
      {
        test: /\.png$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[contenthash][ext]', // 文件名哈希值,原本拓展名
        },
      },
      // asset/inline 导出资源的data-url
      {
        test: /\.svg$/,
        type: 'asset/inline',
      },
      // asset/source 导出资源的源代码
      {
        test: /\.txt$/,
        type: 'asset/source',
      },
      // asset 在resource 和 inline 之中自动选择一个，默认是8KB,可通过parser配置
      // {
      //     test: /\.png$/,
      //     type: 'asset',
      //     parser: {
      //         //改变默认资源大小
      //         dataUrlCondition: {
      //             maxSize: 4 * 1024 * 1024
      //         }
      //     }
      // },
      // css loader 注意顺序，从后往前
      //Css模块。检测 .global.css文件
      {
        test: new RegExp(`^(?!.*\\.global).*\\.(css|less)`),
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            //开启，模块化处理Css类名，防止Css冲突，样式覆盖
            options: {
              modules: true
            }
          },
          'less-loader',
          "postcss-loader",
        ],
      },
      {
        test: new RegExp(`^(.*\\.global).*\\.(css|less)`),
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          "postcss-loader",
        ],
      },
      //细粒度Shimming，一些遗留模块的依赖this,commonJs运行时,this指向是module.exprots,通过 imports-loader 覆盖this的指向
      //在原始代码中已存在的 imports（import/require）与引入新值会导致失败。
      // {
      //     test: require.resolve("./src/index.js"),
      //     use: [{
      //         loader: "imports-loader",
      //         options: {
      //             wrapper: "window"
      //         }
      //     }]
      // },

      //exports-loader,一般用来导入一些外部模块，在不知道其内容在做什么样的导出时，即当源文件不包含 exports 或者有一些内容没有 export 时是有用的。可以借助exports-loader进行配置做一些内容的导出， 
      {
        test: require.resolve("./src/globals.js"),
        use: [
          {
            loader: "exports-loader",
            options: {
              type: 'commonjs',
              exports: ["file", "multiple helpers.parse parse"]
            }
          }
        ]
      }
    ],
  },
  // dev server,（检测文件的变化实现热更新，实质是把打包文件放在了内存中）
  devServer: {
    port: 8000,
    static: path.join(__dirname, 'dist'),
    // 是否压缩传输,压缩头部，可以减少传输的大小
    compress: true,

    // 添加响应头，为资源的请求和响应打入标志
    headers: {
      // 示例
      'X-Access-Token': 'abc123',
    },
    // 开启代理，解决跨域问题
    proxy: {
      // 示例,/api访问到 http://loachost:3001/api
      // "/api": "http://loachost:3001"，
      // /api访问到 http://loachost:3001/
      api: {
        target: 'http://loachost:3001',
        pathRewrite: { '^/api': '' },
      },
    },
    // 服务器主机
    // host: '0.0.0.0',

    // 配置https
    // https: true,

    // 配置http2，http2自带https的证书
    // http2: true,

    // historyApiFallback,解决SPA 路由跳转时404的问题 可以直接设置为true，也通过一个对象像 rewrites 这样的配置项进一步控制
    historyApiFallback: {
      // rewrites: [
      //     { from: /^\/$/, to: '/views/landing.html' },
      //     { from: /^\/subpage/, to: '/views/subpage.html' },
      //     { from: /./, to: '/views/404.html' },
      // ],
    },

    // 模块热替换
    hot: true,

    // 热加载，webpack-dev-server默认自动开启
    liveReload: true,

    client: {
      //关闭在浏览器上面显示错误
      overlay: false,
    },

    // devMiddleware: {
    //     //写入硬盘,默认dev-server中的内容都是写入内存的
    //     writeToDisk: true
    // },
  },

  // 插件
  plugins: [
    // 自动生成html入口文件和引用js文件
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html',
    }),
    // 打包css
    new MiniCssExtractPlugin({
      filename: 'styles/[contenthash].css',
      chunkFilename: 'styles/[contenthash].css'
    }),
    //依赖图
    // new BundleAnalyzerPlugin(),
    //添加workbox, 实现PWA,需要浏览器注册注册serviceWorker
    // new WorkboxPlugin.GenerateSW({
    //     // 这些选项帮助快速启用 ServiceWorkers
    //     clientsClaim: true,
    //     // 不允许遗留任何“旧的” ServiceWorkers
    //     skipWaiting: true,
    // }),
    //shimming预置全局变量
    new webpack.ProvidePlugin({
      //告诉webpack如果遇到一个或者多个_ 就把lodash这个包引入进来
      _: "lodash"
    })
  ],

  // 优化
  optimization: {
    minimizer: [
      // 压缩Css
      new CssMinimizerPlugin(),
      // 这是webpack开箱即用的插件，由于配置了压缩Css的插件，这个需要重新配置一下，压缩JS
      new TerserPlugin(),

    ],
    // 自动抽离公共模块，防止重复代码
    splitChunks: {
      // 缓存第三方库，提取第三方库到到单独的venbor chunk中，利用client的长效缓存机制，命中缓存来消除请求，并减少向server获取资源，同时还保证client和server代码版本一致
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },

  },

  performance: {
    // 打包性能提示
    hints: false,
  },

  //配置模块如何解析
  resolve: {
    //创建 import 或 require 的别名
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
    //解析文件的拓展名
    extensions: ['.json', ".js", '.vue']
  },

  //外部拓展,缩小打包体积，提高首屏加载速度，jQuery引入示例
  externalsType: "script",
  externals: {
    lodash: [
      "https://cdn.jsdelivr.net/npm/lodash@4.17.19/lodash.min.js",
      "_"
    ]
  }
};
//在package.json中添加sideEffects配置可以告诉webpack那些模块是不需要tree-shaking的，值为 true(所有的)/[]（指定模块）
