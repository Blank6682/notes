<template>
  <h3>Composition API抽离逻辑复用</h3>
  <p>抽离获取鼠标位置逻辑</p>
  <p>鼠标位置：X({{ position.x }}),y({{ position.y }})</p>
</template>

<script setup>
import uesMousePosition from "./useMousePosition";
// const { x, y } = uesMousePosition();//ref
const position = uesMousePosition(); //reactive,注：不能解构，解构会失去响应式
</script>

<style>
</style>