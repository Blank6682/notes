// const data = {
//     name: "blankZro",
//     age: "25"
// }
const data = ["a", "b", "c"]

const proxyData = new Proxy(data, { //代理
    get (target, key, receiver) {
        //只处理非原型的属性，即本身的属性
        const ownKeys = Reflect.ownKeys(target)
        if (ownKeys.includes(key)) {
            console.log("get", key)
        }
        const result = Reflect.get(target, key, receiver) //反射
        console.log("get", key)
        return result //返回结果
    },
    set (target, key, val, receiver) {
        //不处理重复的数据
        const oldVal = target[key]
        if (val === oldVal) {
            return true
        }
        const result = Reflect.set(target, key, val, receiver)
        console.log("set", key, val)
        console.log("setResult", result)
        return result //是否设置成功
    },
    deleteProperty (target, key) {
        const result = Reflect.deleteProperty(target, key)
        console.log("delete", key)
        console.log("deleteResult", result)
        return result //是否删除成功
    },
})