vue基本使用

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

#### 循环（列表渲染）

- 如何是遍历对象？---也可以用v-for

- key的重要性。key不能乱写（如random或者index） 

  key一般写和业务相连的信息，如Id,保证key的唯一性

- v-for和v-if不能一起使用！

  - 当 v-for 和 v-if 处于同一个节点时，v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for 循环中。如果要遍历的数组很大，而真正要展示的数据很少时，这将造成很大的性能浪费 

    注：在vue3.x中版本中 `v-if` 总是优先于 `v-for` 生效。

    :point_right:

    [v-for和v-]: 

  - 这种场景建议使用 computed，先对数据进行过滤

    

  

​	