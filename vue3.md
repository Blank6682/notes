#### vue3比vue2有什么优势？

- 性能更好
- 体积更小
- 更好的TS支持
- 更好的代码组织
- 更好的逻辑抽离
- 更多的新功能



#### vue3升级了那些重要功能？

- createApp

  ```js
  //vue2.x
  const app=new Vue({/*...*/})
  
  Vue.use(/*...*/)
  Vue.mixin(/*...*/)
  Vue.component(/*...*/)
  Vue.directive(/*...*/)
  
  //vue3.x
  const app = createApp({/*...*/})
  
  app.use(/*...*/)
  app.mixin(/*...*/)
  app.component(/*...*/)
  app.directive(/*...*/)
  ```

  

- emits属性

  ```js
  //父组件
  <HelloWorld :msg="msg" @onSayHello="sayHello">
  
  //子组件
  export deault{
      name:"HelloWorld",
      props:{
          msg:String
      },
      emits:["onSayHello"],
      setup(prop,{emit}){
          emit("onSayHello","blankZro")
      }
  }
  ```

  

- ##### 生命周期

- ##### option API的生命周期

  - beforeDestory ==>beforeUnmount
  - destory ==>unmouned
  - 其他沿用vue2的生命周期

  setup()内部的

  - setup()相当于beforeCreate 和created
  - onBeforeMount()
  - onMount()
  - onBeforeUpdate
  - onUpdated
  - onBeforeUnmount
  - onUnmount

  

- 多事件

  ```vue
  //可以定义两个函数
  <button @click="one($event),two($event)"> Submit</button>
  ```

  

- fragmnet

  ```vue
  //vue2.x组件模板 需要一个块级元素包裹
  <template>
  	<div class="container">
          ...
  	</div>
  </template>
  
  //vue3.x组件模板
  <template>
      <h1>Blank</h1>
      <div class="content"></div>
  </template>
  
  ```

  

- 移除.sync

  ```vue
  //vue2.x
  <MyComponent v-bind:title.sync="title" />
  
  //vue3.x
  <MyComponent v-model:title="title" />
  ```

  

- 异步组件写法

  ```javascript
  //vue2.x
  new Vue({
      //...
  	components:{
  		"MyComponnent"：()=>import("./MyComponnent")
  	}
  })
  
  //vue3.x
  import {createApp ,defineAsyncComponent} from "vue"
  createApp({
      //...
      components:{
          AsyncComponent:defineAsyncComponent(()=>{
              ()=>import("./MyComponnent")
          })
      }
  })
  ```

  

- 移除filter（filter）

  ```vue
  //以下filter不能在vue3.x中使用
  {{ msg | capitlize}}
  <div v-bind:id="rowId | formatId"></div>
  ```

  

- teleport

  ```vue
  <teleport to="body">
      <!--teleport的父元素的body-->
      <div class ="connent">
          ....
      </div>
  </teleport>
  ```

  

- suspense

  ```vue
  <!--其实就是vue自己封装的一个组件内部有两个插槽，其中一个是具名插槽-->
  <Suspense>
      <template>
  		<TestComponent/>
      </template>
      <!--fallback，是具名插槽-->
      <template #fallback>
  		Loading...
      </template>
  </Suspense>
  
  ```

  

- Composition API
  - reactive
  - ref相关
  - readonly
  - watch和watchEffect
  - setup
  - 生命周期钩子函数

#### composition API 和 option API 区别

composition API带来了什么

- 更好的代码组织
- 更好的逻辑复用
- 更好的类型推导

composition API实现逻辑复用

- 抽离逻辑代码到一个函数
- 函数命名约定为useXxxx格式（react hook也是）
- 在setup中引用useXxxx格式

#### vue3的响应式原理

- proxy的基本使用

  ```javascript
  const proxyData =new Proxy(data,{
  	get(target,key,receiver){
          //只处理非原型的属性，即target本身的属性
          const ownKeys = Reflect.ownKeys(target)
          if (ownKeys.includes(key)) {
              console.log("get ownKeys", key)
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
          const result = Reflect.set(target,key,val,receiver)
          console.log("set",key,val)
          return result //是否设置成功
      },
      deleteProperty(target,key){
          const result = Reflect.deleteProperty(target,key)
          console.log("delete",key)
          return result //是否删除成功
      },
  })
  ```

- Reflect的作用

  - 和proxy能力一一对应
  - 规范化、标准化、函数化
  - 代替Object上的工具函数

- proxy实现响应式

  - 深度监听，性能更好
  - 可监听 新增/删除属性
  - 可监听数组变化

  - proxy能规避Object.defineProperty的问题‘

  - proxy无法兼容所有浏览器，无法polyfill

    ```javascript
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
                //const ownKeys = Reflect.ownKeys(target)
                //if (ownKeys.includes(key)) {
                //    console.log("get ownKeys", key)
                //}
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
                return result //是否设置成功
            },
            deleteProperty (target, key) {
                const result = Reflect.deleteProperty(target, key)
                return result //是否删除成功
            },
    
        }
    
        //生成代理对象
        const obserber = new Proxy(target, proxyConfig)
        return obserber
    }
    
    //测试数据
    //测试深度监听
    const data1 = {
        name: "blankZro",
        age: "25",
        info: {
            city: "zhanjiang"
        }
    }
    //测试监听数组
    const data2 = ["a", "b", "c"]
    
    const proxyData = reactive(data2)
    ```

    

setup中如何获取组件实例

- 在setup和其他Composition API中没有this
- 可通过getCurrentInstance 获取当前实例
- 若使用Options API可照常使用this

