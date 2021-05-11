//限制 接受的对象类型  (可选参数类型后面不要加指定类型)  返回值类型
const firstAdd=(x:number,y:number,z?:number):number=>{
    if(typeof z==="number"){
            return x+y+z
    }else{
        return x+y
    }
}
//使用interface声明函数类型
interface ISum{
    (x:number,y:number,z?:number):number
}

//注：冒号后的箭头是指secondAdd的返回值类型
//凡是在冒号后的都是声明类型
// let secondAdd:(x:number,y:number,z?:number)=>number=firstAdd
let secondAdd:ISum=firstAdd