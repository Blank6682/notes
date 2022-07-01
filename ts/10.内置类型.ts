//global objects
const a: Array<number> = [1, 2, 3]
const date = new Date()
date.getTime()
const reg = /abc/
reg.test('abc')

//build-in object
Math.pow(2, 2)

//DOM and BOM
let body = document.body
body.remove()

let allLis = document.querySelectorAll('li')
allLis.keys()

document.addEventListener('click', (el) => {
  el.preventDefault()
})

//utility Types
interface IPersons {
  name: string
  age: number
}

let blank: IPersons = { name: 'blank', age: 25 }
type IPartial = Partial<IPersons> //可选类型
let blank2: IPartial = { name: 'blank' }
type IOmit = Omit<IPersons, 'name'> //忽略类型
let blank3: IOmit = { age: 25 }

//实现类型忽略 myOmit
type User = {
  name: string
  age: number
  city: string
}

type MyOmit<T, U> = Pick<
  T,
  {
    [K in keyof T]: K extends U ? never : K
  }[keyof T]
>

type myType = MyOmit<User, 'name' | 'age'>
