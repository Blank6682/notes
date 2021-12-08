<template>
  <div>
    <span>{{ title }}&nbsp;</span>
    <span>数量：{{ amount }}&nbsp;</span>
    <button @click="$emit('addToCart', id)">增加</button>
    <button @click="$emit('delFormCart', id)">减少</button>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  amount: Number,
  id: Number,
});
const emit = defineEmits(["addToCart", "delFormCart"]);
</script>

<style>
</style>