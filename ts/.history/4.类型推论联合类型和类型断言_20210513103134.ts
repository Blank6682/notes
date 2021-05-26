//TypeScript里，在有些没有明确指出类型的地方，类型推论会帮助提供类型

//type inference 类型推论
let str="str" //类型string


//union types 联合类型
let numberOrString:number|string
numberOrString="blank"
numberOrString=123

//只能访问联合类型所有类型的共同属性
numberOrString.toString()

//类型断言 必须是联合类型中存在的类型
function getLength(input:string|number):number{
    const str=input as string
    if(str.length){
        return str.length
    }else{
        const number=input as number
        return number.toString().length
    }
}

//type guard 类型守卫
function getLength2(input:string|number):number{
    if(typeof input==="string"){
        return input.length
    }else{
        return input.toString().length
    }
}
