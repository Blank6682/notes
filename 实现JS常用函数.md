### 实现深拷贝

#### `JSON`方法实现

```js
const deepClone = (target)=>{
    return JSON.parse(JSON.stringify(target))
}
```

#### 函数库`lodash`的`_.cloneDeep`方法

```js
var _ = require("lodash")
 _.target(lodash)
```

#### 递归实现

- 简单实现

```js
//简单实现
const deepClone = (target)=>{
    //判断传入的是对象还是数组
    const result = target instanceof Array?[]:{}
    for(const [key,val] of Object.entries(target)){//转换成数组
        result[key] = typeof val === "object" ? deepClone(val) : val
    }
}
```

- 考虑传入值有循环引用问题

```js
//考虑存在循环引用问题
const deepClone = (target,cache = new Map()) =>{
    const isObject = (obj) => typeof obj === "object" && obj !== null
    
    if(isObject(target)){
        //解决循环引用问题
        const cacheTarget = cache.get(cache)
        // 已经存在直接返回，无需再次解析
		if(cacheTarget){
            return cacheTarget
        }
        let cloneTarget = Array.isArray(target) ?[]:{}
        cache.set(target,cloneTarget)
        
        for(const key in target){
            if(target.hasOwnProperty(key)){
                const val = target[key]
                cloneTarget[key] = isObject(val) ? deepClone(val,cache) :val
            }
        }
        return cloneTarget
    }else{
        return target
    }
}

//测试
const target = {
  field1: 1,
  field2: undefined,
  field3: {
      child: 'child'
  },
  field4: [2, 4, 8],
  f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: {} } } } } } } } } } } },
};

target.target = target;

const result1 = deepClone(target);
console.log(result1)
```



### :fire: 实现一个Promise

```js
class MyPromise {
    constructor (exe){
        //最后的值，Promise  .then接收的值/.catch 接收的值 
        this.value = undefined
        //状态：三种状态  pending success failure
        this.status = "pending"
        //成功的队列
        this.successQueue = []
        //失败的队列
        this.failureQueue = []
        //resolve
        const resolve = (value) => {
            const doResolve = ()=>{
                //将缓存的队列挨个执行，并且将状态和值设置好
                if(this.status === "pending"){
                    this.status = "success"
                    this.value = value
                    
                    while(this.successQueue.length){
                        const cd = this.successQueue.shift()
                        cb && cb(this.value)
                    }
                }
            }
            setTimeout(doResolve,0)
        }
        //reject
        const reject = (value) =>{
            const doReject = ()=>{
                if(this.status ==="pending"){
                    this.status = "failure"
                    this.value = value
                    
                    while(this.failureQueue.length){
                        const cd = this.failureQueue.shift()
                        cd && cd(this.value)
                    }
                }
            }
            setTimeout(reject,0)
        }
      exe(resolve,reject)
    }
    
    then(success = (value) =>value,failure = (value)=>value){
        //.then  会返回一个新的promise
        return new MyPromise((resolve,reject)=>{
            //包装成功回调函数
            const successFn = (value)=>{
                try{
					const result = success(value)
                   	//如果值是一个promise,那么需要将这个promise的值继续往下传递，否则直接resolve即可
                    result instanceof MyPromise ? result.then(resolve,reject) :resolve(result)
                }catch(err){}
                    reject(err)
                }
            }
            //包装失败函数回调
			const failureFn = (value) =>{
            	try {
                    const result = rejrct(value)
                    
                    result instanceof MyPrommise ?result.then(resolve,reject) : reject(result)
                }catch(err){
                    reject(err)
                }
        	}
        	//如果Promise的状态还没结束，则将成功和失败的函数缓存到队列
        	if(this,status ==="pending"){
                this.successQueue.push(successFn)
                this.successQueue.push(failureFn)
                //如果已经成功，直接执行成功函数
            }else if(this.status === "success"){
                success(this.value)
                //如果失败，直接执行失败函数
            }else{
                failure(this.value)
            }
            	
        })
    }
    
    catch(){
        
    }
}
```

### 

查漏：

计算机网络基础

从输入路由到浏览器渲染的过程，

js:

布局判断元素位置方法：getBoundingClientRect，**IntersectionObserver**

promise 調度器

大文件上傳出方案

async await 实现原理

vueX 持久化
