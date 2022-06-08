//Common js语法
const path = require('path')

module.exports = {
    mode: "development",

    //输出文件
    output: {
        filename: "scripts/[name].js",
    },

    //在开发模式下追踪代码，
    devtool: 'inline-source-map',

    //dev server,（检测文件的变化实现热更新，实质是把打包文件放在了内存中）
    devServer: {
        port: 8000,
        static: path.join(__dirname, "../dist")
    },

}
