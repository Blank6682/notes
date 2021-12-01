//创建响应式
function reactive (target = {}) {
    if (typeof target !== "object" || target == null) {
        return target
    }

    //代理配置
    const proxyConfig = {
        //代理
        get (target, key, receiver) {
            //只处理非原型的属性，即本身的属性
            //Reflect.ownKeys获取key列表
            // const ownKeys = Reflect.ownKeys(target)
            // if (ownKeys.includes(key)) {
            //     console.log("get", key)
            // }
            const result = Reflect.get(target, key, receiver) //反射
            console.log("get", key)
            //深度监听
            //如何提升性能？
            //获取到哪一层哪一层才有响应式
            return reactive(result) //返回结果
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

    }

    //生成代理对象
    const obserber = new Proxy(target, proxyConfig)
    return obserber
}

//测试数据
//测试深度监听
// const data1 = {
//     name: "blankZro",
//     age: "25",
//     info: {
//         city: "zhanjiang"
//     }
// }
//测试监听数组
// const data2 = ["a", "b", "c"]

// const proxyData = reactive(data2)

export default reactive