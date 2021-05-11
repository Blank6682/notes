//类(Class)：定义了一切事物的抽象特点
//public 修饰的属性和方法是共有的
//private 修饰的属性或方法是私有的  只能自身身访问属性和方法
//proteted 修饰的属性或方法受保护的 子类可以访问属性和方法

//对象(Object):类的实例

//面向对象（OOP）三大特性：封装、继承、多态

//新建个Animal类
class Animal {
    name: string
    constructor(message:string) {
        this.name=message
    }
    run(){
        return this.name+ " is running"
    }
}

const snake=new Animal("blank")
console.log(snake.run())


//继承
class Dog extends Animal{
    bark(){
        return this.name+ " is barking"
    }
}
const trump=new Dog("trump")
console.log(trump.run())
console.log(trump.bark())

//重写
class Cat extends Animal{
    static categories=["mammal"]
    constructor(message:string) {
        super(message)
        this.name=message
    }
    run(){
        //调用父类方法需要使用super
        return "Meow,"+ super.run()
    }
}
const Putin=new Cat("Putin")
console.log(Putin.run())

