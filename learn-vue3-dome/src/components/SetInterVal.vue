<template>
  <div>
    <h3>周期函数</h3>
    <p>{{ number }}</p>
    <button @click="handleAdd">+10</button>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";

const number = ref(0);
const handleAdd = () => {
  let cyclesNumber = 0;
  // 周期函数会不断执行，直到执行clearInterval()被调用/窗口关闭
  //执行一次可以用setTimeout()
  const animation = setInterval(() => {
    number.value++;
    cyclesNumber++;
    if (cyclesNumber == 10) {
      // 清除周期函数
      clearInterval(animation);
    }
  }, 100);
};
</script>

<style>
</style>