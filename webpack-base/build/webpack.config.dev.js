// Common js语法
const path = require('path')
const StylelintWebpackPlugin = require('stylelint-webpack-plugin')
// 利用webpack-merge进行对象深层合并
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const CommonConfig = require('./webpack.config.common')

module.exports = merge(CommonConfig, {
    mode: 'development',

    // 输出文件
    output: {
        filename: 'scripts/[name].js',
    },

    // 在开发模式下追踪代码，
    devtool: 'eval-cheap-module-source-map',

    plugins: [
        // 热更新插件
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            process: {
                env: {
                    NODE_DEV: JSON.stringify('development'),
                    // 这里可以定义你的环境变量
                    // VUE_APP_URL: JSON.stringify('https://xxx.com')
                },
            },
        }),
        new StylelintWebpackPlugin({
            context: 'src',
            configFile: path.resolve(__dirname, '../stylelint.config.js'),
            // 检测的文件范围
            files: ['**/*.scss'],
        }),
    ],
    // dev server,（检测文件的变化实现热更新，实质是把打包文件放在了内存中）
    devServer: {
        port: 8000,
        static: path.join(__dirname, '../dist'),

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
        // 热更新
        hot: true,
        // 是否压缩传输,压缩头部，可以减少传输的大小
        compress: true,
        client: {
            // 关闭在浏览器上面显示错误
            overlay: false,
        },
    },
})
