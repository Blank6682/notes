<template>
  <h3>watch and WatchEffter</h3>
  <p>watch ref: {{ numberRef }}</p>
  <p>watch reactive: {{ info.city }}</p>
  <p>watchEffect: {{ name }}</p>
</template>

<script setup>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { watch, watchEffect } from "@vue/runtime-core";

const numberRef = ref(100);
const state = reactive({
  name: "blank",
  info: {
    city: "zhangjian",
  },
});
//第一个参数是监听的属性，第二个是回调函数，第三个是配置项
watch(
  numberRef,
  (newValue, oldValue) => {
    console.log("numberRef", newValue, oldValue);
  }
  //   ,{
  //     immediate: true, //初始化之前就监听
  //   }
);
setTimeout(() => {
  numberRef.value = 200;
}, 2000);

//深度监听
watch(
  () => state.info,
  (newValue, oldValue) => {
    console.log("state", newValue, oldValue);
  },
  {
    // immediate: true, //初始化之前就监听
    deep: true, //深度监听,监听不到 深度的oldValue
  }
);
setTimeout(() => {
  state.info.city = "guangzhou";
}, 2000);

//初始化时会执行一次,(收集需要监听的数据)
watchEffect(() => {
  console.log("state name", state.name);
});

setTimeout(() => {
  state.name = "blankZro";
}, 2000);

const { name, info } = toRefs(state);
</script>

<style>
</style>