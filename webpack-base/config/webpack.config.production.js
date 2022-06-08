const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin')


module.exports = {
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
            new TerserPlugin()

        ],
    },
}

