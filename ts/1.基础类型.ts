//布尔值
let isDone: boolean = false

//数字
let age: number = 10

//字符串/模板字符串也可以
let userName: string = 'blank'
let message: string = `Hello,${userName}`

//undefined
let u: undefined = undefined

//null
let n: null = null

//any任意类型，避免使用，使数据类型检测失效
let notSure: any = 4
notSure = 'it is a string'
notSure = true

notSure.myname
notSure.getName()

//数组,两种方式
let firstList: number[] = [1, 2, 3]
let secondList: Array<number> = [1, 2, 3]
firstList.push(3)

function arrTest() {
  console.log(arguments)
}

//元组Tuple,本质还是数组
let user: [string, number] = ['blank', 20]

//枚举,默认从0开始编号，也可以手动指定成员的数值
enum Color {
  red = 1,
  green,
  blue,
}
let colorName: string = Color[2]
console.log(colorName) //显示green

class BlankZro {
  constructor(message: string) {
    this.name = message
  }
  name: string
  run() {
    return this.name + ' is running'
  }
}

type Bl = keyof BlankZro
const BZ: Bl = 'name'
