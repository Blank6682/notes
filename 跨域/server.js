const http = require("http")
const parse = require("url-parse")
const cors = require("cors")
const ws = require("ws")

const port = 8000

const app = http.createServer((req, res) => {
    console.log("到达后端")
    const { query } = parse(req.url, true)
    //基础连接
    // console.log(query.name)
    // res.end(JSON.stringify("blankzro"))

    //jsonp解决跨域
    // if (query && query.callback) {
    //     console.log(query)
    //     const { name, age, callback } = query
    //     const message = `${name}年龄：${age}`
    //     const src = `${callback}(${JSON.stringify(message)})`
    //     res.end(src)
    // } else {
    //     res.end(JSON.stringify("nothing!"))
    // }

    //Cors
    // res.writeHead(200, {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Cortrol-Allow-Methods": "*",
    //     "Access-Cortrol-Allow-Headers": "Content-Type"
    // })
    // const { name, age } = query
    // res.end(`${name}年龄：${age}`)

    //node接口代理请求
    const { name, age } = query
    res.end(`${name}年龄：${age}`)

    //nginx代理

})

app.listen(port, function () {
    console.log("服务器启动了+")
})

//WebScoket
// const wss = new ws.WebSocketServer({ port })

// wss.on("connection", (obj) => {
//     console.log("服务器启动了+")
//     obj.on("message", (data) => {

//         data = JSON.parse(data.toString())
//         const { name, age } = data
//         console.log(data)
//         obj.send(`${name}年龄：${age}`)
//     })
// })