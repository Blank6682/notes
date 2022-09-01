### 模拟实现原生JS函数

#### 数组

##### forEach

循环数组

- item：遍历项
- index：遍历项的索引
- arr：数组本身

```javascript
Array.prototype.tx_forEach = function(callback){
    for(let i=0;i<this.length;i++){
        callback(this[i],i,this)
    }
}
```

##### map

循环数组，返回一个新元素

- item：遍历项
- index：遍历项的索引
- arr：数组本身

```javascript
Array.prototype.tx_map = function(callback){
    let res=[]
    for(let i=0;i<this.length;i++){
        res.push(callback(this[i],i,this))
    }
    return res
}
```

##### filter

返回满足条件的项

- item：遍历项
- index：遍历项的索引
- arr：数组本身

```javascript
Array.prototype.tx_fliter = function(callback){
    let res=[]
    for(let i=0;i<this.length;i++){
        callback(this[i],i,this) && res.push(this[i])
    }
    return res
}
```

##### every

所有项都满足

- item：遍历项
- index：遍历项的索引
- arr：数组本身

```javascript
Array.prototype.tx_every = function(callback){
    let flag = true
    for(let i=0;i<this.length;i++){
        flag = callback(this[i],i,this))
        if(!flag) break;
    }
    return flag
}
```

##### some

存在即返回true

- item：遍历项
- index：遍历项的索引
- arr：数组本身

```javascript
Array.prototype.tx_some= function(callback){
    let flag = true
    for(let i=0;i<this.length;i++){
        flag = callback(this[i],i,this))
        if(flag) break;
    }
    return flag
}
```

##### reduce

计算累加

- pre：前一项
- next：下一项
- index：当前索引
- arr：数组本身

```javascript
Array.prototype.tx_reduce = function(callback,...arg){
    let start = 0,pre
    if(arg.length){
        pre = arg[0]
    }else{
        pre = this[0]
        start = 1
    }
    
    for(let i = start;i<this.length;i++){
        pre = callback(pre,this[i],i,this)
    }
    return pre
}
```

##### findIndex

返回第一个满足条件的项的下标

- item：遍历项
- index：遍历项的索引
- arr：数组本身

```js
Array.prototype.tx_findIndex = function(callback){
	for(let i = 0; i < this.length ; i++){
        if(callback(this[i],i,this)){
            return i
        }
    }
    return -1
}
```

##### find

返回满足条件的项集合

- item：遍历项
- index：遍历项的索引
- arr：数组本身

```js
Array.prototype.tx_find= function(callback){
	for(let i = 0; i < this.length ; i++){
        if(callback(this[i],i,this)){
            return this[i]
        }
    }
    return undefined
}
```

##### fill

填充数组

- initValue：填充的值
- start：开始填充索引，默认0
- end：结束填充索引，默认length

```js
Array.prototype.tx_fill= function(initValue,start = 0,end){
    end = end || this.length
    for(let i =start;i< end;i++){
        this[i] = initValue
    }
    return this
}
```

##### includes

是否包含

- value：查询元素
- start：开始查询索引，默认0

```js
Array.prototype.tx_includes= function(value,start = 0){
    if(start<0) start = this.length + start
    for(let i = start;i< end;i++){
        if(this[i] === value || Number.isNaN(this[i] ===isNaN)){
            return ture
        }  
    }
    return false
}
```

##### join

数组转字符串

- code：分隔符，默认”，“

```js
Array.prototype.tx_join= function(code = ","){
    let str = ""
    for(let i = 0;i< this.length;i++){
        str = i===0 ? `${this[i]}` :`${str}${code}${this[i]}`
    }
    return str
}
```

##### flat

扁平化数组

```js
Array.prototype.tx_flat= function(){
   let arr = this
   while(arr.some(item => !Array.isArray(item))){
       arr=[].concat(...arr)
   }
    return arr
}
```

#### 字符串

##### slice

截取数组

- start：开始截取的字符索引(包含此字符)
- end：结束截取的字符索引(不包含此字符)
- start > end：返回空字符串
- start < 0：`start = 数组长度 + start`
- !end && end !== 0 语句是处理NaN的情况

```js
String.prototype.tx_slice(start = 0,end){
    satrt = start<0 ? this.length +start:start
    end = !end && end !== 0 ? this.length :end
    
    if(start>end) return ""
    let str = ""
    for(let i = start;i<end;i++){
        str+=this[i]
    }
    return str
}
```

##### subStr

截取指定位置指定长度的字符串

- start：开始截取的字符索引(包含此字符)
- length：截取的长度

- start < 0：`start = 数组长度 + start`
- length超出所能截取范围，需要做处理
- length < 0：返回空字符串

```js
String.prototype.tx_subStr(start = 0,length){
    if(length<0) return ""
    
    satrt = start<0 ? this.length +start:start
    //如果length为NAN或者大于剩余长度
   	length = (!length && length!==0) || length > this.length-start? this.length:start+length
    
    let str = ""
    for(let i = start;i<length;i++){
        str+=this[i]
    }
    return str
}
```

##### subString

功能与`slice`大致相同

区别之处

- 如果任一参数小于 0 或为 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)，则被当作 0。
- 如果任一参数大于 `stringName.length`，则被当作 `stringName.length`。

- start > end：互换值

```js
String.prototype.tx_subSting = function(start = 0,end){
    start = (!start && start !==0)|| (start< 0 )? 0 : (start>this.length? this.length:start)

    end = (!end && end !==0 )|| (end< 0 )?0: (end>this.length? this.length:end)
    if(start>end) [start,end] = [end,start]
    let str=""
    for(let i=start;i<end;i++){
        str +=this[i]
    }
    return str
}
```

#### 对象

##### entries

将对象转成键值对数组

```js
Object.prototype.tx_entries = function(obj){
	const res = []
	for(let key in obj){
		obj.hasOwnProperty(key) && res.push([key,obj[key]])
	}
	return res
}
```

##### fromEntries

将键值对数组转换成对象

```js
Object.prototype.tx_fromEntries = function(arr){
	const obj = {}
	for(let i = 0;i<arr.length;i++){
		const [key,value]=arr[i]
		obj[key]=value
	}
	return obj
}
```

##### keys

将对象的key转成一个数组合集

```js
Object.prototype.tx_keys = function(obj){
	const arr = []
	for(let key in obj){
		obj.hasOwnProperty(key) && obj.push(key)
	}
	return arr
}
```

##### values

将对象的所有值转成数组合集

```js
Object.prototype.tx_values = function(obj){
	const arr = []
	for(let key in obj){
		obj.hasOwnProperty(key) && obj.push(obj[key])
	}
	return arr
}
```

##### instanceof

`instanceof` **运算符**用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上

**关键点：**构造函数Fn的`prototype`，实例对象的原型链。

**方法：** 遍历实例对象的原型链，挨个往上查找看是否有与Fn的`prototype`相等的原型，直到最顶层`Object`还找不到，那么就返回false

##### 递归实现

```js
const myInstanceOf = (obj,fn)=>{
    if(obj === null && typeof obj !== "object"){
        return false
    }
    const proto = Object.getPrototypeOf(obj)
    if(proto === fn.prototype){
        return true
    }else if(proto === null){
        return false
    }else{
         myInstanceOf(proto)
    }
}
```

##### 遍历实现

```js
const myInstanceOf = (obj,fn)=>{
    const proto = obj
    while(proto = Object.getPrototypeOf(proto)){
        if(proto === fn.prototype){
            return true
        }
    }
    return false
}
```

##### is

Object.is(a, b)，判断a是否等于b

```js
Object.prototype.tx_is = function(x,y){
    if(x===y){
        //防止-0和+0
        return x!==0 ||1/x===1/y
    }
    //防止NaN
    return x!==x && y!==y
}
```

#### 函数

##### call()

使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数。

:deciduous_tree: **注意：**该方法的语法和作用与 [`apply()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 方法类似，只有一个区别，就是 `call()` 方法接受的是**一个参数列表**，而 `apply()` 方法接受的是**一个包含多个参数的数组**。

```js
Function.prototype.tx_call = function (obj,...agrs){
    obj = obj || window
    
    //使用Symbol,防止重名key
    const fn = Symbol()
    obj[fn] = this
    
    //执行，返回执行值
    return obj[fn](...ags)
}

//例子
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.tx_call(this, name, price);
  this.category = 'food';
}

console.log(new Food('cheese', 5).name);//cheese
```

#####  aplly()

```js
Function.prototype.tx_aplly = function (obj,agrs){
    obj = obj || window
    
    //使用Symbol,防止重名key
    const fn = Symbol()
    obj[fn] = this
    
    //执行，返回执行值
    return obj[fn](...ags)
}
```

##### bind()

注意

- bind是返回一个函数，而不是执行结果
- bind返回的函数，拿来当做构造函数，该怎么处理

```js

```



#### Promise

##### all

- 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
- 如果所有Promise都成功，则返回成功结果数组
- 如果有一个Promise失败，则返回这个失败结果

```js
function all(promises){
    const result = []
    let count = 0
    return new MyPromise((resolve,reject)=>{
        promises.forEach((promise,index)=>{
            if(promise instanceof MyPromise){
                promise.then(res=>{
                	result[index] = res
                	count ++
                    if(count == promises.length) resolve(result)
                },error => reject(err))
            }else{
                result[index] = promise
                count++
            }
        })
        
    })
}
```

### 高频手写js函数：

#### 防抖

一定时间段内没有再触发事件，事件处理函数才会执行一次

```js
function debounce(fn,deday) {
    let timer
    return function(...args){
        timer && clearTimeout(timer)

        timer = setTimeout(()=>{
            fn.apply(this,args)
        },delay)
    }
}
```

#### 节流

在指定的时间间隔内只会触发一次

##### 基于时间戳

```js
function throttle(fn,delay){
    let startTime = Date.now()
    return function (...args){
        let lastTime = Date.now()
        
        if(lastTime - startTime >delay){
            fn.apply(this,args)
            startTime = Date.now()
        }
    }
}
```

##### 基于setTimeout

```js
function throttle(fn,dalay){
    let timer
    return function(...args){
        if(!timer){
            timer = setTimeout(()=>{
                fn.apply(this,args)
                timer = null
            },delay)
        }
    }
}
```

#### 实现new操作符

**`new`** 关键字会进行如下的操作：

1. 创建一个空的简单JavaScript对象（即` {} `）；
2. 为步骤1新创建的对象添加属性 `proto` ，将该属性链接至构造函数的原型对象
3. 将步骤1新创建的对象作为`this`的上下文,执行该函数 ；
4. 如果该函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error等)，则返回`this`。

```js
function myNew(fn,...args){
    //1、2 创建一个全新对象，并将其`__proto__`属性指向构造函数的`prototype`属性
    let obj = Object.create(fn.prototype)
    
    //3 将构造函数调用的this指向这个新对象，并执行构造函数
    let result = fn.apply(obj,args)
    
    //4 如果构造函数返回对象类型Object，则正常返回，否则返回这个新的对象
    return (result instanceof Object)? result :obj
}
```

#### 函数柯里化

##### 递归实现

```js
function curry(fn,...args){
    //函数参数个数
    const fnLen = fn.length
    return function(...innerArgs){
        innerArgs = [...args,...innerArgs]
        //未满足条件则继续递归
        if(innerArgs.length<fnLen){
            return curry.call(this,fn,...innerArgs)
        }else{
            fn.apply(this,innerArgs)
        }
    }
}
// 测试
const add = curry((num1, num2, num3) => {
  console.log(num1, num2, num3, num1 + num2 + num3)
})

add(1)(2)(3) // 1 2 3 6
add(1, 2)(3) // 1 2 3 6
add(1, 2, 3) // 1 2 3 6
add(1)(2, 3) // 1 2 3 6
```

#### 实现多为数组扁平化

##### 递归实现

```js
const myFlat = (array)=>{
    return array.reduce((result,curr)=>{
        return result.concat(Array.isArray(curr)? myFlat(curr): curr)
    },[])
}
```

##### 遍历实现

```js
const myFlat = (array)=>{
    let result = []
    let stack = [...array]
    while(stack.length){
        //每次取出数组最后一个元素进行验证
        const val = stack.pop()
        //是数组则展开再次插入数组
        if(Array.isArray(val)){
            stack.push(...val)
        }else{
            result.unshift(val) //将元素插入数组前面
        }
    }
    return result
}
```

#### 实现深拷贝

##### `JSON`方法实现

```js
const deepClone = (target)=>{
    return JSON.parse(JSON.stringify(target))
}
```

##### 函数库`lodash`的`_.cloneDeep`方法

```js
var _ = require("lodash")
 _.target(lodash)
```

##### 递归实现

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

#### 实现发布订阅（`EventEmitter`）

- on：事件监听 
-  emit: 发布事件  
- off: 删除事件  
- once : 只进行一次的事件订阅

```js
class EventEmitter {
    constructor(){
        this.events = {}
    }
    //事件监听
    on(evt,callback,ctx){
        //存在则push到数组里面，不存在则新建一个
        this.events[evt] ? this.events[evt].push(callback) : this.events[evt] = [callback]
        return this
    }
    //发布事件
    emit(evt,...playload){
        const callbacks = this.events[evt]
        if(callbacks){
            callbacks.forEach((cb) => cb.apply(this,playload))
        }
        return this
    }
    //删除事件,evt：指定事件，callback：evt指定函数；两者都是不传值则删除全部
    off(evt,callback){
        if(typeof evt === "undefind"){
            delete this.events
        }else if(typeof evt ==="string"){
            if(typeof callback === "function"){
                this.events[evt] = this.events[evt].filter(cb => cb !== callback)
            }else{
               delete this.events[evt]
            }
        }
        return this
    }
    //只进行一次的事件订阅
    once(evt,callback,ctx){
        const proxyCallback = (...playload)=>{
            callback.apply(ctx,payload)
            //回调函数执行之后就删除事件订阅
            this.off(evt,proxyCallback)
        }
        this.on(evt,proxyCallback,ctx)
    }
}

// 测试
const e1 = new EventEmitter()

const e1Callback1 = (name, sex) => {
  console.log(name, sex, 'evt1---callback1')
}
const e1Callback2 = (name, sex) => {
  console.log(name, sex, 'evt1---callback2')
}
const e1Callback3 = (name, sex) => {
  console.log(name, sex, 'evt1---callback3')
}

e1.on('evt1', e1Callback1)
e1.on('evt1', e1Callback2)
// 只执行一次回调
e1.once('evt1', e1Callback3)

e1.emit('evt1', 'blankzro', 'boy')
// blankzro boy evt1---callback1
// blankzro boy evt1---callback2
// blankzro boy evt1---callback3
console.log('------尝试删除e1Callback1------')
// 移除e1Callback1
e1.off('evt1', e1Callback1)
e1.emit('evt1', 'blankzro', 'boy')
// blankzro boy evt1---callback2

```

#### 实现原生ajax请求

- 创建XHLHttpRequest对象
- 初始化参数
- 发送请求
- 接收请求判断

```js
const ajax = (options)=> {
    //创建XMLHttpRequest对象
	const xhr = new XMLHttpRequest()
    
    //初始化参数
    options = options || {}
    options.type = (options.type || "GET").toUpperCase()
    options.dataType = options.dataType || "json"
    const params = options.data || null
    
    //发送请求
    if(options.type === "GET"){
        xhr.open("GET",options.url+'?'+params,true)
        xhr,send(null)
    }else if(options.type === "POST"){
        xhr.open("POST",options.url,true)
        xhr.send(params)
    }
    
    //接收请求
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            let status = xhr.status
            if(status >=200 && status<300){
                options.success && options.success(xhr.responseText,xhr.responseXML)
            }else{
                options.fail && options.fail(status)
            }
        }
    }
} 

//使用如下
ajax({
    type:'post',
    dataType:'json',
    data:{},
    url:'https://......',
    success:(text,xml)=>{
        console.log(text)
    },
    fail:(status){
    console.log(status)
}
})
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

#### async await实现原理

- 原理：其实就是一种语法糖，基于`promise`实现，返回值是一个`promise`对象
- 调用`async`会返回一个`Promise`对象
- `async`中可能有`await`表达式，其会使`async`暂停，直到表达式中的Promise解析完成后继续执行 async 中 await 后面的代码并返回解决结果。
- 返回的是Promise 对象，所以在最外层不能直接获取其返回值，那么肯定可以用原来的方式：then() 链来处理这个 Promise 对象

#### async await 和 promise 的区别

- async/await 出现的异常是无法捕获的，需要借助 try/catch 来捕获异常
- 任何一个await后面的promise对象变为reject，那么整个async都会被中断
- 使用 async await 的话，catch 能处理 JSON.parse 错误
  

#### Promise调度器

- 控制并发数量限制的异步任务调度器

```js
class Scheduler{
    constructor(limit){
        this.limit = limit;//最大并发数
        this.count = 0;//当前并发数
        this.pending = [];//记录promise的数组
    }
    
    add(promiseCreator){
        this.pending.push(promiseCreator)
        this.run()
    }
    
    run(){
        // 假设pending为空，或者调用大于限制直接返回
        if(!this.pending.length || this.count >= this.limit) return

        this.count++
        this.pending.shift()().finally(()=>{
            this.count--
            //轮询
            this.run()
        })
    }
}

//例子
const timeout = time => new Promise(resolve => {
  setTimeout(resolve, time);
})
  
const scheduler = new Scheduler();
  
const addTask = (time,order) => {
  scheduler.add(() => timeout(time).then(()=>console.log(order)))
}

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');

// output: 2 3 1 4
```

