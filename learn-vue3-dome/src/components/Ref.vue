<template>
  <h3>Ref</h3>
  <p>{{ msgRef }}</p>
</template>

<script setup>
import { ref } from "@vue/reactivity";

const msgRef = ref(20); //值类型 ，响应式

setTimeout(() => {
  msgRef.value += 5; //.value 修改值
}, 2000);
</script>

<style>
</style>