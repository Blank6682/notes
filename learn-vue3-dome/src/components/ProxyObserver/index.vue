<template>
  <h3>proxy原理和响应式原理</h3>
  {{ data.name }}
  <input type="text" v-model="data.name" />
</template>

<script setup>
import { toRefs } from "@vue/reactivity";
import reactive from "./proxy_observer";

const data = reactive({
  name: "blank",
  age: 24,
});

console.log(data);
</script>

<style>
</style>