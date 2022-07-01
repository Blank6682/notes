const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

//获取在环境变量获取开发模式
const DevMode = process.env.NODE_ENV !== "production"

module.exports = {
    //入口文件
    entry: {
        index: path.join(__dirname, "../src", "index.js"),
        // another: path.join(__dirname, "../src", "another-module.js"),
    },
    //输出文件
    output: {
        path: path.join(__dirname, "../dist"),
        // 多入口文件命名,文件改变时通过文本字符模板的哈希命名来告诉浏览器更新缓存
        filename: DevMode ? 'scripts/[name].js' : 'scripts/[name].[contenthash].js',
        //打包前清理dist文件夹
        clean: true,
        //静态资源输出路径，可以在rules中配置，这里的优先级比generator低
        assetModuleFilename: DevMode ? 'images/[name][ext]' : 'images/[contenthash][ext]',
    },

    //配置解析module规则
    module: {
        rules: [
            //js资源
            {
                test: /\.js|jsx$/,
                include: path.join(__dirname, "../src"),
                exclude: /node_modules/,
                use: [
                    'cache-loader',
                    'thread-loader',
                    {
                        loader: "babel-loader",
                        //预设：Babel插件集合,也可外部增加.babelrc文件配置
                        options: {
                            presets: [
                                ["@babel/preset-env",
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
                                //兼容async/await的语法，需要regenratorRuntime插件支持，安装@babel/runtime和@babel/plugin-transform-runtime"
                                ["@babel/plugin-transform-runtime"]
                            ]
                        }
                    }
                ]
            },
            //asset/resource 导出静态文件，即发送一个单独的文件并生成url
            // {
            //     test: /\.png$/,
            //     type: 'asset/resource',
            //     generator: {
            //         filename: 'images/[contenthash][ext]'//文件名哈希值,原本拓展名
            //     }
            // },
            //asset/inline 导出资源的data-url
            {
                test: /\.svg$/,
                type: 'asset/inline',
            },
            //asset/source 导出资源的源代码
            {
                test: /\.txt$/,
                type: 'asset/source',
            },
            //asset 在resource 和 inline 之中自动选择一个，默认是8KB,可通过paeser配置
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/,
                type: 'asset',
                parser: {
                    // 转base64的条件
                    dataUrlCondition: {
                        maxSize: 25 * 1024, // 25kb,根据自己需求设置
                    }
                }
            },
            //css loader 注意顺序，从后往前
            {
                test: /\.(le|sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            //publicPath的配置和plugins中的filename和chunkFilename的名字有关，请检查清楚，避免Css不生效
                            publicPath: "../",
                            // publicPath: DevMode?"./" : "../",不同环境切换
                        }
                    },
                    {
                        loader: 'css-loader',
                        //开启，模块化处理Css类名，防止Css冲突，样式覆盖
                        options: {
                            modules: true
                        }
                    },
                    "sass-loader",
                    // {
                    //   loader: 'sass-resources-loader',
                    //   options: {
                    //     resources: [
                    //       // 放置全局引入的公共scss文件
                    //     ],
                    //   },
                    // },
                ],
            },
            //exports-loader,一般用来导入一些外部模块，在不知道其内容在做什么样的导出时，即当源文件不包含 exports 或者有一些内容没有 export 时是有用的。可以借助exports-loader进行配置做一些内容的导出， 
            {
                test: require.resolve("../src/globals.js"),//globals.js 用来导入外部模块的文件
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
        ]
    },
    //插件
    plugins: [
        //自动生成html入口文件和引用js文件
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../src", "index.html"),
            filename: "index.html",
            // js文件插入 body里
            inject: 'body',
        }),
        //打包css
        new MiniCssExtractPlugin({
            filename: DevMode ? "styles/[name].css" : "styles/[name].[contenthash].css",
            chunkFilename: DevMode ? "styles/[id].css" : "styles/[id],[contenthash].css",
            ignoreOrder: true,
        }),
    ],

    //配置模块如何解析
    resolve: {
        //创建 import 或 require 的别名,减少webpack解析的遍历加快构建速度
        alias: {
            "@": path.resolve(__dirname, "./src")
        },
        //解析文件的拓展名
        extensions: ['.json', ".js", '.vue', ".ts"]
    },
}

