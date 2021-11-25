const http = require("http")
const parse = require("url-parse")
const querystring = require("querystring")
const port = 8888

const app = http.createServer(function (req, res) {
    //开启Cors
    res.writeHead(200, {
        //允许跨域的域名,http://localhost:8888，*=>所有
        "Access-Control-Allow-Origin": "*",
        //跨域允许的请求方法,DELETE,PUT,POST,GET,OPTIONS,*=>所有
        "Access-Control-Allow-Methods": "*",
        //允许的header类型
        "Access-Control-Allow-Headers": "Content-Type"

    })
    const { query } = parse(req.url, true)
    const { methods = "GET", headers } = req
    //代理请求
    const proxyReq = http.request({
        host: "localhost",
        port: 8000,
        path: `/?${querystring.stringify(query)}`,
        headers,
        methods
    }, proxyRes => {
        proxyRes.on("data", chunk => {
            console.log(chunk.toString(), "响应数据")
            res.end(chunk.toString())
        })
    }).end()
})

app.listen(port, () => {
    console.log("代理服务器启动了+8888")
})