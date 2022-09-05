import { createSSRApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

// 导出环境无关的（通用的）应用代码
export default function createApp() {
  const app = createSSRApp(App)
  return app
}
