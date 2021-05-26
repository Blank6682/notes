//可以把泛型看作是一个占位符，在使用的时候在填入类型

function echo<T>(arg:T):T{
    return arg
}

//可以指定类型 也可以自动类型推论
const resultString=echo("str")
const resultBoolen=echo(true)

function swap<T,U>(tuple:[T,U]):[T,U]{
    return [tuple[0],tuple[1]]
}
const resultTuple=swap(["string",123])

//约束泛型
interface IWithLength{
    length:number
}

function echoWithLength<T extends IWithLength>(arg:T):T{
    console.log(arg.length)
    return arg
}
const withStr=echoWithLength("str")
const withObj=echoWithLength({length:10})
const withArr=echoWithLength([1,2,3])

//泛型在类和接中的使用
class Queue<T>{
    private data=[]
    push(item:T){
        return this.data.push(item)
    }
    pop():T{
        return this.data.shift()
    }
}

const queue=new Queue<number>()
queue.push(1)
console.log(queue.pop().toFixed())

//泛型在类和接口中的使用
interface keyPair<T,U>{
    key:T,
    value:U
}

let kp1:keyPair<number,string>={key:123,value:"blank"}
let kp2:keyPair<string,number>={key:"blank",value:123}

let arr:number[]=[1,2,3]//普通写法
let kpArr:Array<number>=[1,2,3]//指定类型，相当于泛型