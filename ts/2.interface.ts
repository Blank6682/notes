//对对象的形状（shape）进行描述
//Duck Typing(鸭子类型)
//定义一个接口
interface IPerson{
    //只读：只能在对象刚刚创建的时候修改其值
    readonly id:number;
    name:string;
    //可选数据
    age?:Number;
}

//定义对象，数据类型要对应、属性不能多/少
let blnak:IPerson={
    id:1,
    name:"blank",
    // age:25
}
