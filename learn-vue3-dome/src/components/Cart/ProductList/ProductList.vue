<template>
  <div>
    <div v-for="pro in productList" :key="pro.id">
      <span>{{ pro.title }}&nbsp;</span>
      <span>{{ pro.price }}&nbsp;</span>
      <button @click="$emit('addToCart', pro.id)">加入购物车</button>
    </div>
  </div>
</template>

<script setup>
import moduleName from "module";
const props = defineProps({
  productList: Array,
});
const emit = defineEmits(["addToCart"]);
</script>

<style>
</style>