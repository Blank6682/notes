<template>
  <h3>获取组件实例（即this）</h3>
  <p>使用函数getCurrentInstance()</p>
</template>

<script >
import { getCurrentInstance, ref } from "@vue/runtime-core";

export default {
  setup() {
    // console.log(this);会报错
    const instance = getCurrentInstance();
    console.log("instance", instance);
  },
};
</script>

<style>
</style>