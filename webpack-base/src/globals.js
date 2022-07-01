// 测试exports-loader
// 这个假设是外部的第三方模块，在导入时，在不知道其内容在做什么样的导出时，可以借助exports-loader进行配置做一些内容的导出，
const file = 'example.txt'

const helpers = {
  test() {
    console.log('globals test something')
  },
  parse() {
    console.log('globals parse something')
  },
}
const func = () => {
  1 != 2
}
