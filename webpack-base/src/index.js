import _ from 'lodash'
import imgsrc from './asset/test.png'
import svgsrc from './asset/AirPlay.svg'
import txtsrc from './asset/text.txt'
import style from './style.css'
import './main.scss'
// 动态导入,抽离公共代码测试
import './asyn-module'

function component() {
  const element = document.createElement('div')
  element.innerHTML = 'webpack use ES6'

  return element
}
document.body.appendChild(component())

// asset resource资源
const img = document.createElement('img')
img.src = imgsrc

document.body.appendChild(img)

// asset inline资源
const img2 = document.createElement('img')
img2.style.cssText = 'width:200px;height:300px;'
img2.src = svgsrc

document.body.appendChild(img2)

// asset inline资源
const txt = document.createElement('div')
txt.style.cssText = 'width:200px; height:100px; background:#3b86e8'
txt.textContent = txtsrc

document.body.appendChild(txt)

// asset 资源类型自动选择
const img3 = document.createElement('img')
img3.style.cssText = 'dispaly:block'
img3.src = imgsrc

document.body.appendChild(img3)

// es6语法，
function getString() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello')
    }, 2000)
  })
}

async function sayHello() {
  const str = await getString()
  console.log(str)
}
sayHello()

// 多入口文件公共部分代码，抽离测试
console.log(_.join(['index', 'module', 'loader!'], ' '))

// 懒加载，事件触发再加载对应文件
// 预获取/预加载模块，声明import时使用内置指令，prefetch(预获取)：将来某些导航下可能需要的资源，preload:当前导航下可能需要的资源(效果和懒加载类似)
const button = document.createElement('button')
button.textContent = '点击执行加减'
button.style.cssText = 'display: block;height:120px'
button.addEventListener('click', () => {
  // webpack魔法注释，告诉webpack打包生成的文件名为math，prefetch示例
  import(/* webpackChunkName:'math', webpackPrefetch:true */'./math').then(({ add }) => {
    console.log(add(4, 5))
  })
})
document.body.appendChild(button)

// 外部拓展引入
console.log(_.join(['外部拓展引入测试']))

// css模块 ,react和vue就是采用的这种方式
document.body.classList.add(style.home)

// 注册serviceWorker
// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker.register("/service-worker.js")
//       .then(registration => {
//         console.log("SW 注册成功", registration)
//       })
//       .catch(registrationError => {
//         console.log("SW 注册失败", registrationError)
//       })
//   })
// }

// 覆盖this的指向，在原始代码中已存在的 imports（import/require）与引入新值会导致失败。测试需要注释imports（import/require）
// this.alert("覆盖this指向window")

// exports-loader导出内容测试
const { file, parse } = require('./globals')
console.log(file)
parse()
