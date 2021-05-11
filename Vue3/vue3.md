路由Router：

路由是指根据 url 的不同，展示不同的内容

router-link 是跳转路由的标签  <router-link   to="">

router-view 负责展示当前路由对应的组件内容 <router-view>

import 异步加载路由

数据管理框架Vuex:

创建了一个全局唯一的仓库，用来存放全局的数据

想改变数据。vuex	要求

1，dispatch方法，派发一个action，例如change   change(){this.$dispatch(change)}

2，感知到change这个action，执行store中action下面的change

3，commit 提交 一个叫做change的数据改变

actions:change(){	this.commit("change")}}

4，mutation感知到提交的change改变，执行change方法改变数据

mutation:{change(){this.state.name="blank"}}



mutation  里面只允许写同步代码，不允许写异步代码

想要异步操作可以把异步操作放到action里面





