<template>
  <h3>v-model 双向数据绑定</h3>
  <p>父组件 姓名：{{ name }} 年龄：{{ age }}</p>
  <UserInfo v-model:name="name" v-model:age="age" />
  <!--语法糖：v-model:name="name"等同于  :name="name"  @update:name = "name=$event"--->
</template>

<script setup>
import { reactive, toRefs } from "@vue/reactivity";
import UserInfo from "./UserInfo.vue";

const state = reactive({
  name: "blank",
  age: 24,
});
const { name, age } = toRefs(state);
</script>

<style>
</style>