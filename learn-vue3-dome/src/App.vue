
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
    <MousePosition />
    <ProxyObserber />
    <VModelDemo />
    <Watch />
    <GetInstance />
    <Cart />
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import SetinterVal from "./components/SetInterVal.vue";
import Ref from "./components/Ref.vue";
import RefTemplate from "./components/RefTemplate.vue";
import ToRef from "./components/ToRef.vue";
import ToRefs from "./components/ToRefs.vue";
import MousePosition from "./components/MousePosition/index.vue";
import ProxyObserber from "./components/ProxyObserver/index.vue";
import VModelDemo from "./components/VModelDemo/index.vue";
import Watch from "./components/Watch.vue";
import GetInstance from "./components/GetInstance.vue";
import Cart from "./components/Cart/index.vue";

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
