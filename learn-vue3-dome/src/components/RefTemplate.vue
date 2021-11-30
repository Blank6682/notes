<template>
  <div>
    <h3>Ref template</h3>
    <p ref="elemRef">测试文字Ref template</p>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

const elemRef = ref(null);
onMounted(() => {
  console.log(elemRef.value); //获取dom节点
});
</script>

<style>
</style>