const koa = require('koa')
const fs = require('fs')
const path = require("path")
const compilerSFC = require('@vue/compiler-sfc')
const compilerDom = require('@vue/compiler-dom')

const app = new koa()
const port = 3000

app.use(async (ctx, next) => {
  const { url, query } = ctx.request

  //处理路由
  if (url === '/') {
    //加载html文件
    ctx.type = "text/html"
    ctx.body = fs.readFileSync(path.join(__dirname, 'src/index.html'), 'utf-8')
  } else if (url.endsWith('.js')) {
    //处理静态资源js文件
    const p = path.join(__dirname, 'src', url)
    ctx.type = 'application/javascript'
    ctx.body = rewriteImportPath(fs.readFileSync(p, 'utf-8'))
  } else if (url.startsWith('/@modules')) {
    //模块名
    const moduleName = url.replace('/@modules/', '')
    //在node_modules里面找
    const modulePath = path.join(__dirname, 'node_modules', moduleName)
    //模块中目标文件路径
    const target = require(modulePath + '/package.json').module
    //文件路径
    const fliePath = path.join(modulePath, target)

    const res = fs.readFileSync(fliePath, 'utf-8')
    ctx.type = 'application/javascript'
    ctx.body = rewriteImportPath(res)
  } else if (url.indexOf('.vue' !== -1)) {

    //处理SFC
    //将vue文件，解析成js
    const p = path.join(__dirname, 'src', url.split('?')[0])
    const file = fs.readFileSync(p, 'utf-8')
    const res = compilerSFC.parse(file)
    // console.log(res)
    if (!query.type) {
      const script = res.descriptor.script.content
      const __script = script.replace('export default', 'const __script = ')
      ctx.type = 'application/javascript'
      ctx.body = `
      ${rewriteImportPath(__script)}
      //解析tpl
      import { render as __render } from '${url}?type=template'
      __script.render = __render
      export default __script
      `
    } else if (query.type === 'template') {
      //解析生成render函数
      const tpl = res.descriptor.template.content
      const render = compilerDom.compile(tpl, { mode: 'module' }).code
      ctx.type = 'application/javascript'
      ctx.body = rewriteImportPath(render)
    }
  }
})

//浏览器对于裸模块加载不支持，对其路径进行重写
//eg: import xx form 'vue'
//target eg: import xx form '/@modules/vue'
function rewriteImportPath(content) {
  return content.replace(/ from ['"](.*)['"]/g, function (s1, s2) {
    if (s1.startsWith('.') || s2.startsWith('./') || s2.startsWith('../')) {
      return s1
    } else {
      return ` from '/@modules/${s2}'`
    }
  })
}
app.listen(port, () => {
  console.log(`server start at ${port}!`)
})
