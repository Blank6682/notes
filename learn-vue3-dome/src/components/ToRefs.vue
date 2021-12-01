<template>
  <h3>ToRef</h3>
  <p>姓名：{{ name }},年龄：{{ age }}(5秒后我变了！)</p>
</template>

<script >
import { reactive, toRef, toRefs } from "@vue/reactivity";
export default {
  setup() {
    const state = reactive({
      name: "blankZro",
      age: 25,
    });
    setTimeout(() => {
      state.age += 5;
    }, 5000);

    //将响应式对象（reactive封装）转换为普通对象
    //对象的每个prop都是对应的Ref
    //两者保持引用关系
    const { name, age } = toRefs(state);
    return { name, age };
  },
};
</script>

<style>
</style>