<template>
  <div>
    <h3>ToRef</h3>
    <p>姓名{{ name }}</p>
  </div>
</template>

<script >
import { reactive, toRef } from "@vue/reactivity";
export default {
  setup() {
    const state = reactive({
      name: "blankZro",
      age: "25",
    });

    // - 创建一个响应式对象(reactive封装)的prop
    // - 创建一个ref,具有响应式
    // - 两者保持引用关系
    const name = toRef(state, "name"); //用于响应式对象的属性，如果是普通对象则无响应效果
    return { name };
  },
};
</script>

<style>
</style>