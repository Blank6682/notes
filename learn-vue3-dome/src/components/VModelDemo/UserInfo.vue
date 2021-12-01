<template>
  <p>子组件</p>
  姓名：
  <input
    type="text"
    :value="name"
    @input="$emit('update:name', $event.target.value)"
  />
  年龄：
  <input
    type="text"
    :value="age"
    @input="$emit('update:age', $event.target.value)"
  />
</template>

<script setup>
const props = defineProps({
  name: String,
  age: Number,
});
</script>

<style>
</style>