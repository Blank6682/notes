const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    //入口文件
    entry: {
        index: path.join(__dirname, "../src", "index.js"),
        another: path.join(__dirname, "../src", "another-module.js"),
    }
    ,
    //输出文件
    output: {
        path: path.join(__dirname, "../dist"),
        //打包前清理dist文件夹
        clean: true,
        //静态资源输出路径，可以在rules中配置，这里的优先级比generator低
        assetModuleFilename: 'images/[contenthash][ext]',
    },

    //配置解析module规则
    module: {
        rules: [
            //js资源
            {
                test: /\.js$/,
                include: path.join(__dirname, "src"),
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    //预设：Babel插件集合,也可外部增加.babelrc文件配置
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [
                            //兼容async/await的语法，需要regenratorRuntime插件支持，安装@babel/runtime和@babel/plugin-transform-runtime"
                            ["@babel/plugin-transform-runtime"]
                        ]
                    }
                }
            },
            //asset/resource 导出静态文件，即发送一个单独的文件并生成url
            {
                test: /\.png$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[contenthash][ext]'//文件名哈希值,原本拓展名
                }
            },
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
            //css loader 注意顺序，从后往前
            {
                test: /\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader"
                ],
            },
        ]
    },
    //插件
    plugins: [
        //自动生成html入口文件和引用js文件
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../src", "index.html"),
            filename: "index.html"
        }),
        //打包css
        new MiniCssExtractPlugin({
            filename: "styles/[contenthash].css"
        }),
    ],

    //优化
    optimization: {
        //自动抽离公共模块，防止重复代码
        splitChunks: {
            //缓存第三方库，提取第三方库到到单独的venbor chunk中，利用client的长效缓存机制，命中缓存来消除请求，并减少向server获取资源，同时还保证client和server代码版本一致
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    }
}

