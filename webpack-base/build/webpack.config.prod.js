const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

//利用webpack-merge进行对象深层合并
const { merge } = require('webpack-merge')
const webapck = require("webpack")

const CommonConfig = require("./webpack.config.common")

module.exports = merge(CommonConfig, {
    mode: "production",

    //输出文件
    output: {
        filename: "scripts/[name].[contenthash].js",
        publicPath: 'http://loachost:8000/'
    },

    //优化
    optimization: {
        minimizer: [
            //压缩Css
            new CssMinimizerPlugin(),
            //这是webpack开箱即用的插件，由于配置了压缩Css的插件，这个需要重新配置一下，压缩JS
            new TerserPlugin(),
            // gzip
            new CompressionPlugin({
                algorithm: 'gzip',
                threshold: 10240,
                minRatio: 0.8
            }),
            new webpack.DefinePlugin({
                process: {
                    env: {
                        NODE_DEV: JSON.stringify('development'),
                        // 这里可以定义你的环境变量
                        // VUE_APP_URL: JSON.stringify('https://xxx.com')
                    }
                }
            })
        ],

        //自动抽离公共模块，防止重复代码
        splitChunks: {
            //缓存第三方库，提取第三方库到到单独的venbor chunk中，利用client的长效缓存机制，命中缓存来消除请求，并减少向server获取资源，同时还保证client和server代码版本一致
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                },
                //抽离css,css代码块提取到单独的文件中
                // styles: {
                //     name: styles,
                //     test: /\.css$/,
                //     chunks: all,
                //     enforce: true
                // }
            }
        }
    },
})



