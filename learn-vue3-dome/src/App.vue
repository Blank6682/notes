
<template>
  <div>
    <LifeCycles :msg="msg" v-if="falg" />
    <button @click="handleChange">Update</button>
    <button @click="handleDestory">Destory</button>
    <SetinterVal />
    <Ref />
    <RefTemplate />
    <ToRef />
    <ToRefs />
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import SetinterVal from "./components/SetInterVal.vue";
import Ref from "./components/Ref.vue";
import RefTemplate from "./components/RefTemplate.vue";
import ToRef from "./components/ToRef.vue";
import ToRefs from "./components/ToRefs.vue";
//生命周期函数
import LifeCycles from "./components/LifeCycles.vue";

const falg = ref(true);
const msg = ref("这是一个空数据");

const handleChange = () => {
  msg.value = new Date() + "修改了数据";
};

const handleDestory = () => {
  falg.value = !falg.value;
};
</script>

<style>
</style>
