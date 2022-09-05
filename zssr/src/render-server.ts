import createApp from './main'
import { renderToString } from 'vue/server-renderer'

//使用Vue的 SSR API 渲染该应用
export function render(url: string) {
  const app = createApp()
  //获取vue最终处理的html
  const html = renderToString(app)
  return html
}
