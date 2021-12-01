
<template>
  <h3>生命周期函数</h3>
  <p>{{ msg }}</p>
</template>

<script>
import {
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
} from "@vue/runtime-core";

export default {
  name: "LifeCycles",
  props: {
    msg: String,
  },
  // 相当于beforeCreate 和 created,setup()没有this
  setup() {
    console.log("setup");
    //模板被编程函数之后（即组件内容被渲到界面之前。。。
    onBeforeMount(() => {
      console.log("onBeforeMount");
    });
    //组件内容被渲染到界面之后。。。
    onMounted(() => {
      console.log("onMounted");
    });
    //data中的数据发生改变的时。。。
    onBeforeUpdate(() => {
      console.log("onBeforeUpdate");
    });
    //data中的数据发生变化，同时页面完成更新之后。。。
    onUpdated(() => {
      console.log("onUpdated");
    });
    //vue应用失效时
    onBeforeUnmount(() => {
      console.log("onBeforeUnmount");
    });
    //vue应用失效是，且dom完全销毁时
    onUnmounted(() => {
      console.log("onUnmounted");
    });
  },

  // options API
  //实例生成之前
  beforeCreate() {
    console.log("beforeCreate");
  },
  //实例生成之后。。。
  created() {
    console.log("create");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },
  beforeUnmount() {
    console.log("beforeUnmount");
  },
  unmounted() {
    console.log("unmounted");
  },
};
</script>

<style scoped>
</style>
