import express from 'express';
import { createServer as SSRServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url))

//模拟实现SSR
async function Server() {
  const PORT = 3001
  const app = express()

  //获取vite中间件来处理前端html模板
  const vite = await SSRServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  app.use(vite.middlewares)

  app.use('*', async (req, res, next) => {
    //有请求就会执行
    const url = req.originalUrl
    try {
      console.log(__dirname);
      //1.读取index.html,使用vite中间件来模板化前端代码
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
      template = await vite.transformIndexHtml(req.originalUrl, template)

      //2.获取页面真正的数据，从前端服务器获取数据(产出这个具有数据的html)
      const { render } = await vite.ssrLoadModule('/src/render-server.ts')
      const appHtml = await render(url)

      //3.把读取到的index.html,进行内容替换，比如：中的注释替换成真正数据的html
      const html = template.replace('<!--Render Html-->', appHtml)

      //4.返回完整的html
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      // 如果捕获到了一个错误，让 Vite 来修复该堆栈，这样它就可以映射回
      // 你的实际源码中。
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  app.listen(PORT, () => {
    console.log(`server start [${PORT}]`);
  })
}
Server() 
