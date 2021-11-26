### vue基本使用

#### 指令、插值

- 插值、表达式

- 指令、动态属性

- v-html：会有XSS风险，会覆盖子组件

  

#### computed 和 watch

- computed有缓存，data不变则不会重新计算；

- watch 如何深度监听？

  使用get(),set(),deep:true

- watch 监听引用类型，拿不到oldVal

  通俗来讲，既能用 computed 实现又可以用 watch 监听来实现的功能，推荐用 computed， 重点在于 computed 的缓存功能 computed 计算属性是用来声明式的描述一个值依赖了其它的值，当所依赖的值或者变量 改变时，计算属性也会跟着改变； watch 监听的是已经在 data 中定义的变量，当该变量变化时，会触发 watch 中的方法。

#### class 和style

- 使用动态属性
- 使用驼峰式写法

#### 条件渲染

- v-if v-else的用法，可使用变量，也可以使用===表达式

- v-if和v-show的区别

  v-if会把dom节点销毁，v-show则是隐藏dom节点，相当于增加样式disaply:none

- v-if和v-show的使用场景

  在dom节点需要频繁变更隐藏/显示的时候,使用v-show则减少了dom节点的频繁销毁，可以提高性能。
  
  #### 事件
  
  - vue的事件是绑定在目标dom下的
  
  #### vue组件使用
  
  - props、$emit
  
    - 父组件通过props向子组件传递，子组件通过$emit向父组件传递
  
  - 组件之间的通讯，自定义事件
  
    - 将事件绑定在一个新的vue实例中，自定义事件要及时销毁,即组件beforeDestroy()中销毁，不然导致内存泄露
  
    ```javascript
    //通用组件，event.vue
    import Vue from 'vue'
    export default new Vue()
    
    //绑定自定义事件 ，一个组件
    import event from "../common/event"
    event.$on("addTitle",fn)
    
    //调用自定义事件，另外一个组件
    import event from "../common/event"
    event.$emit("addTitle",value)
    ```
  
  - 组件生命周期
  
    ![Vue 实例生命周期](https://cn.vuejs.org/images/lifecycle.png)
  
  #### 修饰符
  
  - 事件修饰符
  
  ```html
  <!-- 阻止单击事件继续传播 -->
  <a v-on:click.stop="doThis"></a>
  
  <!-- 提交事件不再重载页面 -->
  <form v-on:submit.prevent="onSubmit"></form>
  
  <!-- 修饰符可以串联 -->
  <a v-on:click.stop.prevent="doThat"></a>
  
  <!-- 只有修饰符 -->
  <form v-on:submit.prevent></form>
  
  <!-- 添加事件监听器时使用事件捕获模式 -->
  <!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
  <div v-on:click.capture="doThis">...</div>
  
  <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
  <!-- 即事件不是从内部元素触发的 -->
  <div v-on:click.self="doThat">...</div>
  ```
  
  - 表单修饰符
    - .lazy  懒加载，一般用于输入框
    - .number 数字返回number,不是输入数字返回string
    - .trim 去除前后空格

#### 循环（列表渲染）

- 如何是遍历对象？---也可以用v-for

- key的重要性。key不能乱写（如random或者index） 

  key一般写和业务相连的信息，如Id,保证key的唯一性

- v-for和v-if不能一起使用！

  - 当 v-for 和 v-if 处于同一个节点时，v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for 循环中。如果要遍历的数组很大，而真正要展示的数据很少时，这将造成很大的性能浪费 

    :point_right:注：在vue3.x中版本中 `v-if` 总是优先于 `v-for` 生效。

  - 这种场景建议使用 computed，先对数据进行过滤

### vue的高级特性

- 自定义v-model

```vue
//自定义v-model组件，CustomizeModel.vue
<template>
	<div>
    	<input type="text" :value="text" @input="$emit($event.targer.value)" />
    </div>
</template>
<script>
export default{
    model:{
      prop:text //对应props的值，text
    },
    props:{
        text:String, 
        default(){
            return ''
        }
    }
}
</script>

//调用v-model组件，
import CUustomizeModel from "./CustomizeModel.vue"
<template>
	<div>
    	<CUustomizeModel v-model="text" />
    </div>
</template>
<script>
export default{
	data(){
        return{
            text:""
        }
    }
}
</script>
```

#### $nextTick

- vue是异步渲染

- data改变之后，dom不会立即渲染
- $nextTick会在dom渲染完之后触发，待 dom渲染完再回调

#### slot

- 基本使用

  ```vue
  <solt>
      默认内容，即父组件没设置内容时，显示这个
  </solt>
  ```

- 作用域插槽

  ```vue
  //子组件，ScopedSlot.vue
  //定义一个属性，存放数据
  <solt :soltData="value"></solt>
  
  //父组件调用
  <ScopedSlot>
      //v-solt指令获取数据
      <template v-slot="soltProps">
  		{{soltProps.soltData.value}}
      </template>
  </ScopedSlot>
  
  ```

- 具名插槽

  ```vue
  //子组件，ScopedSlot.vue
  <div>
      <solt name="header">
      </solt>
      <solt></solt>
       <solt name="footer">
      </solt>
  <div>
  
  //父组件调用
  <ScopedSlot>
      //v-solt:name指定使用插槽
      <template v-solt:header>头部</template>
      <p>主体<p>
      //缩写
  	<template #footer>尾部</template>
  </ScopedSlot>
  ```

#### 动态组件

- 用法

  ```vue
  <component :is="component-name"></component>
  ```

- 需要根据数据，动态渲染场景。即组件类型不确定

#### 异步组件

- import()函数

- 按需加载，异步加载大组件

  ```vue
  <script>
  export default{
      components:{
  		Dome:()=>import("./component/Dome")
      }
  }
  </script>
  
  ```

#### keep-alive

- 缓存组件

- 频繁切换，不需要重复渲染

- vue常见性能优化

  常见的有tab切换

  ```vue
  <keep-alive>
      //子组件
  </keep-alive>
  ```

#### mixin

- 多个组件有相同的逻辑，抽离出来

- mixin并不是完美的解决方案，会有一些问题

  - 变量来源不明确，不利于阅读
  - 多mixin可能会造成命名冲突
  - mixin和组件可能出现多对多的关系，复杂度较高

- Vue3提出的Composition API旨在解决这些问题

  ```vue
  <script>
  export default{
  	mixins:[myMixin]
  }
  </script>
  ```

#### vuex基本概念

- state
- getters
- action
- mutation
- 用于vue组件
  - dispatch
  - commit
  - mapState
  - mapGetters
  - mapAction
  - mapMutations

#### vue-router

- 路由模式
  - hash模式，默认。如http:http://locahostl:8080/#/user
  - H5 history模式，如:http://locahostl:8080/user
  - 后者需要server端支持，因此无特殊需求可以选择前者

- 配置动态路由

  ```javascript
  const User={
      template:"<div>User {{$route.params.id}}</div>"
  }
  const router=new VueRouter({
  	routes:[
          //动态路径
  	{path:"/user/:id",compnent:User}
  ]
  })
  ```

- 路由懒加载

  ```javascript
  export default new VueRouter({
  	routes:[{
  		parh:"/",
          name:"home"
  		compnent:()=>improt("../View/home")
  	}]
  })
  ```

### vue原理

#### 组件化和MVVM

- 组件化在早期就有

  - asp jsp php 已经有组件化了
  - node.js 中也有类似的组件化

- 数据驱动视图（MVVM,setSate)

  - 传统组件，只是静态渲染，更新还要依赖于操作Dom
  - 数据驱动视图 ,如Vue MVVM ， React  setState

- MVVM

  和传统的MVC模型不同

#### 响应式

- 组件data的数据一旦变化，立即触发视图的更新

- 实现数据驱动视图的第一步

- 核心API --Object.defineProperty() (监听data变化的核心API)

  **Object.defineProperty()** 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

  ```javascript
  //语法
  Object.defineProperty(obj, prop, descriptor)
  
  //基本用法
  const data= {}
  const name = "blanZro"
  Object.defineProperty(data,"name",{
      get:function(){
          console.log("get")
          return name
      },
      set:function(newVal){
          console.log("set")
          name = newVal
      }
  })
  
  //测试
  console.log(data.name) //get blanZro
  data.name = "Zro" // set
  
  ```

- 如何实现响应式，代码演示

  - 监听对象，监听数组 (需特殊处理)

  - 复杂对象，深度监听

    ```javascript
    //视图更新函数
    function undateView(){
        console.log("视图更新了")
    }
    
    //特殊处理数组，主要是利用了数组的原型
    //重新定义数组原型
    const oldArrayProperty = Array.prototype
    //创建新对象，原型指向oldArrayProperty，再拓展新的方法不会影响原型，不会造成全局污染
    const arrProto = Object.create(oldArrayProperty)
    ['pop','unshift','push','shift','splice'].forEach(methodName =>{
        arrProto[methodName] = function (){
            updateView()//触发视图更新
            oldArrayProperty[methodName].call(this,...arguments)
            //Array.property.push.call(this,...argments)
        }
    })
    
    //重新定义属性，监听起来
    function defineReactive(target,key,value){
        //深度监听
        observer(target)
        //核心API
        Object.defineProperty(target,key,{
            get(){
                return value
            },
            set(newVal){
                if(newVal !== value){
                    //深度监听
                    observer(target)
                    //设置新值
                    //注意，valuey一直在闭包中，此处设置完之后，再get时获取到的也是newVal
                    value = newVal
                    undateView()
                }
            }
        })
    }
    
    //监听对象
    function observer(target){
        if(typeof target !=="object" || target ===null){
            return target
        }
        
        if(Array.isArray(target)){
            target.__proto__ = arrProto
        }
        //重新定义各个属性
        for(let key in target){
            defineReactive(target,key,target[key])
        }
    } 
    
    ```

    

- Obiject.defineProperty的一些缺点（vue3.0启用Proxy）

  - 深度监听，递归到底，一次性计算量大
  - 无法监听新增和删除的属性,需要使用Vue.set()和Vue.delete()
  - 无法监听原生数组需要特殊处理

- proxy有兼容性问题

  - proxy兼容性不好，且无法polyfill

#### 虚拟DOM(vdom)和diff  

##### 	v-dom

- dom操作非常耗费性能

- vdom - 用 JS 操作模拟DOM，计算出最小的变更，操作DOM

- 用js模拟dom结构

  ```html
  //dom结构
  <div id="main" calss="container">
      <p>vdom</p>
      <ul style="font-size:16px">
          <li> 111</li>
          ...
      </ul>
  </div>
  
  //js模拟
  <script>
  const vdom = {
      tag:"div",
      prop：{
      	className:"container",
      	id："main"
  	},
      children:[
          {
              tag:"p",
              children:"vdom"
          },
          {
              tag:"ul",
              props:{ style:"font-size:16px"}
              children:[
              	{
              		tag:"li",
                     children:"111"
                  },
                  ...
              ]
          }
      ]
  }
  </script>
  ```

  ##### diff

  diff算法时间复杂度为O(n^3)

  - 第一，遍历tree1；第二，遍历tree2
  - 第三，排序
  - 1000个节点，要计算1亿次，算法不可用。
  - 对应diff算法不可用的解决方案：优化时间复杂度到O(n)
    - 只比较同一级，不跨级对比
    - tag不相同，则直接删掉重建，不再深度比较
    - tag和key,两者相同，则认为是相同节点，不度深度比较

  通过snabbdom去了解vue中的虚拟dom实现过程，snabbdom中流程为

  patch(） ---虚拟DOM的核心

  ​     通过patch(oldVnode, newVnode);来判断两个元素是否相同，oldVnode 可以是Vnode|Element

  - 执行pre  hook（生命周期，patch开始之前）
  - 第一步，判断第一个参数是否为vnode,不是则创建一个新的vnode，关联到这个dom元素
  - 第二步，判断是否为相同的vnode,key和sel相同，不是相同的则直接删掉重建

  patchVnode()

  ​	通过patchVnode(oldVnode, vnode)

  - 执行prepatch hook

  - 设置vnode.elm

  - 如果vnode.text ===undefined (vnode.children 一般有值，反之则无值) ，然后做一些特殊处理

    根据新旧的children对比执行不同的操作

    - 新旧都有，执行undateChildren()
    - 新有，旧无，清空旧的text,执行addVnode()添加children
    - 新无，旧有，执行removeVnode()移除旧的children
    - 新旧都无值，则把text设置为空

  - oldVnode.text !==vonde.text ,则把oldVnode.text移除，设置新的vnode.text

  - updateChildren

  vue中的流程为

  

  

#### 模板编译



#### 渲染过程

#### 前端路由

查漏：

计算机网络基础

从输入路由到浏览器渲染的过程，



js:

布局判断元素位置方法：getBoundigClienRect ，intersionObsver

promise調度器

大文件上傳出方案

async await 实现原理



vueX持久化









