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
Array.prototype.tx_find= function(initValue,start = 0,end){
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
- start：开始填充索引，默认0

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

A instanceof B，判断A是否存在B的原型链,用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

```js
function instanceof(father,child){
	const fp = father.prototype
    let cp = child.__proto__
    while(cp){
        if(cp === fp){
            return true
        }
        cp = cp.__proto__
    }
    return false
}
//例子
function Person(name){
    this.name = name
}
const user = new Person("BlankZro")
const user2 = {name:"abc"}
console.log(instanceof(Person,user)) // true
console.log(instanceof(Person,user2))//false
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

