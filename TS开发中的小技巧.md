# TS开发中的小技巧

## 一、内置函数

### typeof

- 作用：`typeof` 操作符可以用来获取一个变量声明的类型。

```typescript
function getLength(arg: number | string): number {
    if(typeof arg === 'string') {
        return arg.length
    } else {
        return arg.toString().length
    }
}
```



### in

- 作用：`in` 用来实现遍历

```typescript
type Person = "name" | "school" 

type Obj =  {
  [p in Person]: string
}
//Obj = {name :string, school:string}
```



### keyof

- 作用：`keyof` 操作符可以用于获取某种类型的所有键，其返回类型是联合类型。

  - 基本数据类型：内置方法索引名，如string,number,boolean

  - 获取class,interface的索引组成的联合数据类型

```tsx
//keyof
//function getAttribute<T,U extends keyof T>(obj:T,key:U):T[U]{
//    retrun obj[key]
//}
// getAttribute('blankzro',"match")

//基本数据类型
type Str = keyof string
const BL :Str = 'match'

//class/interface
class BlankZro{
    constructor(message:string){
        this.name:message
    }
    name:string
    run(){
        return this.name+ " is running"
    }
}

type BL = keyof BlankZro
const user:Bl = "name"//name/run

```



### :star: extends的多种意思

- 作用：extends 用于 `约束泛型`

- T extends U , 表示T中的某些在U里面，分两种情况
  - T不是联合类型，表示T是U的子集
  - T是联合类型，表示T中的类型是U的子集；可以理解为对T中的类型进行一次遍历，每个类型都会执行一次extends

- 继承

```typescript
type name = {name :string}
interface user extends name{
    password:string |number
} 
//user继承了name,相当于{name :string,password:string |number}
const bl :user = {name:"bkankzro",password:123456}
```

- 限制泛型的类型

```typescript
//一个典型的例子，限制了传入参数类型[{id:number,render(n:number):number}]
function fn <T extends {id:number,render(n:number):number}>(arr:T[]){
    arr.map(i =>i.render(i.id))
}

fn([
    { id:1, render(n){ return n}},
    { id:2, render(n){ return n}}
])
```



### Pick 类型过滤

- 作用：Pick<T,K>,新类型 相当于 T 与 K 的交集

- 可以理解为es的 filter函数

```typescript
type BlankZro = {name:string,age:number,skill:string}

//可以理解为ES的fliter遍历,源码：pick
//type PICK<T,U extends keyof T> = {
//    [P in U]:T[P]
//}

type BZ = Pick<BlankZro,'name' |'age'> //BZ的type:{ name:string,age:number}

const user :BZ = {name:"blankzro",age:25}

```



### Exclude 类型排除

- 作用：Exclude<T,U>如果 T 是 U 的子类型则返回 never 不是则返回 T

```tsx
//源码：Exclude
//type EXCLUDE<T,U> = T extends U ? never : T

type Name = string | number
type BlankZro = string | number | boolean

const BZ: Exclude<BlankZro, Name> = false //BZ：never| never|boolean => BZ：bloolean

```



### Extract  类型提取

- 作用：与Exclude相反 

```typescript
//源码：Extract
//type EXCLUDE<T,U> = T extends U ? T :never

type Name = string | number
type BlankZro = string | number | boolean

const BZ: Extract<BlankZro, Name> = false //BZ：string | number|never => BZ：string | number
```



### Partial  类型可选

- 作用：`Partial<T>`将`T`的所有属性变成可选的

```tsx
//源码：Partial
//type PARTIAL<T> = { [P in keyof T]?:T[P]|undefined }

type BlankZro = {name:string ,age: number}

const BZ: Partial<BlankZro> = {name:"blankzro"} 
```



### Required 类型必选

- 作用：`Required <T>`将`T`的所有属性变成必选的

```tsx
//源码：Required
//type PEQUIRED<T> = { [P in keyof T]-?:T[P]}

type BlankZro = {name?:string ,age?: number}

const BZ: Required<BlankZro> = {name:"blankzro"} //会报错
```



### Readonly 类型只读

- 作用：Readonly< T> T 中的 K 属性是只读的，K 属性是不可修改的

```typescript
//源码：Required
//type REQUIRED<T> = { readonly [P in keyof T]?:T[P]|undefined }
interface Foo{
    name:string,
    age:number
} 
type BlankZro = Required<T>

const BZ: Required<BlankZro> = {name:"blankzro"} //会报错
```



### :star: Record 定义类型

- 作用：Record <T,U>,定义对象的 key类型->T 和 value 类型->U,

- 一般使用Record 批量定义类型

```tsx
//源码：Record
//type RECORD<T extends string|number|symbol,V> = { [P in T]:V}

type BlankZro = Record<string,number|string>

const BZ: BlankZro = {name:"blankzro",age:25} 
```



### infer 类型推断

**推导泛型参数**，即通过已知的类型和获得它泛型反推出泛型参数

- infer 只能在 extends 的右边使用
- infer P 的 P 也只能在条件类型为 True 的一边使用

```typescript
//ex1:
type User = {name:string ,age:number }

//联合类型
type UnionType<T> = T extends { name: infer M,age: infer M} ? M : T
type BlankUnion = UnionType<User>  
//通过已知类型User，推导出类型 BlankUnion：number | string

//元组类型
type TupleType<T> = T extends{ name: infer M,age: infer N} ? [ M:N ]:T
type BlankzroTuple = TupleType<User>  //BlankzroTuple：[number | string]

//ex2
type User2 = {name:string ,age:number,get(a:string):void }

type GetType<T> = {
    [k in keyof T] : T{K} extends (infer U) ? U : K
}[keyof T]
//上面语句通过遍历已知类型，推导出泛型的属性对象，然后通过[keyof T]把类型取出来,最后得出联合类型

type valueType = GetType<User2> //BlankzroTuple：string | number | ((a: string) => void)

//ex4: 获取函数返回值类型
type Fn = (val:string) => number[]

type GetFnReturnType<T> = T extends (...arg:any) => (infer U)[] ? U : T 

type FnReturnType = GetFnReturnType<Fn> // FnReturnType: number
```



### omit 类型剔除

- 作用：`Omit<T, U>`从类型 `T` 中剔除 `U` 中的所有属性。

```typescript
type User = {
  name: string
  age: number
  city: string
}

//ex1:通过Pick实现
type MyOmit1<T, U> = Pick<T, {
    [K in keyof T]: K extends U ? never : K
}[keyof T]>

type myType1 = MyOmit1<User,'name' | 'age'>//myType1：{city: string}

//ex1:通过Pick+Exclude实现
type MyOmit2<T,U>=Pick<T,Exclude<keyof T,U>>

type myType2 = MyOmit2<User,'name' | 'age'>//myType2：{city: string}  

//上方事项的效果等同于内置的omit
type omitType = Omit<<User,'name' | 'age'>> // omitType：{city: string}  
```



### NonNullable

- 作用：NonNullable< T>从泛型 T 中排除掉 null 和 undefined

```typescript
//源码：NonNullable
//type NonNullable<T> = T extends null | undefined

type BL = NonNullable< string|null|undefined>
```

### Parameters

- 作用：Parameters< T extends (...args:any) => any>，以元组的方式获得函数的入参类型

```typescript
//源码：Parameters
//type Parameters<T extends (...args:any) => any> = T extends (...args:infer P) => any ? P : never

//基础类型
type ParType = Parameters<(name:string) => any> //ParType:[name:string]

//联合类型
type ParType2 = Parameters<((name:string) => any) | ((age:number) => any)>//ParTypes2:[name:string] |[age: number]
```

### ConstructorParameters

- 作用：ConstructorParameters< T extends new (...args:any) => any>，元组的方式获得构造函数的入参类型

```typescript
//源码：ConstructorParameters
//type ConstructorParameters<T extends new (...args:any) => any> = T extends new (...args:infer P) => any ? P : never

//联合类型
type ParType2 = ConstructorParameters<(new (name: string) => any) | (new (age: number) => any)>//ParTypes2:[name:string] |[age: number]
```

### ReturnType

- 作用：ReturnType< T extends (...args:any) => any> ，获得函数返回值的类型

```typescript
//源码：ReturnType
//type ReturnType<T extends (...args:any) => any> = T extends (...args:any) => any:infer P ? P : any

//基础类型
type ReType = ReturnType<(name:string) => string|number> //ReType:string|number

```

### InstanceType

- 作用：InstanceType< T extends new  ((...args:any) => any)> ，获得构造函数返回值的类型

```typescript
//源码：InstanceType
//type InstanceType<T extends new ((...args:any) => any)> = T extends new  (...args:any) => any:infer P ? P : any

//基础类型
type ReType = InstanceType<new ((name:string) => string|number)> //ReType:string|number

```



## 二、开发小技巧

### viod  和 never

- viod:无返回值
- never：所有类型的子类型

```typescript
//void
function fn():void{}
const fnv = fn()
fnv===undefined//true,内部无返回值，即undefined
    
//never
function nev():never{
    throw new Error("error")
}
let bl:string = "blankZro"
bl=nev() //true
```

### T 泛型条件匹配

- 看下面例子

```typescript
//ex1
type Name = string
type UserInfo <T> = T extends Name ? string :boolean
const user:UserInfo<string | number>= false 
//这个语句是没问题的
//BlankZro<string|number> 会在上面三元运算符里面匹配，string=>string，number=>boolean
//结果user的类型是<string | boolean>, 

//ex2 多个组合判断
type Name2 = string
type Blank2 = string | number
type UserInfo2<T> = T extends Name2 ? string : T extends Blank ? symbol : boolean

const user2: UserInfo2<string | number> = 'BlankZro' //user2的类型是<string | number> 
const user3: UserInfo2<string | symbol> = 'BlankZro' //user3的类型是<string | boolean> 

//EX3  元组 联合类型 限制
type Blank2 = string | number
type UserInfo2<T> = [T] extends [Blank2] ? string : boolean
const user4: UserInfo2<string | number> = 'BlankZro' //user4的类型是string
```

### 类型条件判断

- 看下面例子

```tsx
type Name = string
type Blank = string | number

const bl: Name extends Blank ? string : boolean = 'blankzro'
const zr: Blank extends Name ? string : boolean = false
//Blank 包含Name的类型=>bl的判断为true,zr反之
```

### 值类型过滤索引

```typescript
type User = {
  name: string
  age: number
  city: string
}
type FilterProperty<T,U> = {
    [K in keyof T]: T[K] extends U ? never : K
}[keyof T]

type BlankZro = Pick<User,FilterProperty<User,string>> //BlankZro:{age: number}
```

### 类型重复声明错误

- ts中会默认把打开文件夹的所有.ts文件都做类型检测，即声明的类型都在全局中,重复声明即会报错，可以在文件中使用{ }包裹，使声明类型私有化。一般不建议重复声明，可以用导入、继承等
