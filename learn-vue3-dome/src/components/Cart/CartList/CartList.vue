<template>
  <div>
    <template v-if="cartShowList.length">
      <div v-for="item in cartShowList" :key="'cart' + item.id">
        <CartListItem
          :title="item.title"
          :amount="item.amount"
          :id="item.id"
          @addToCart="addToCart"
          @delFormCart="delFormCart"
        />
      </div>
    </template>
    <div>总价：{{ priceCount }}</div>
  </div>
</template>

<script setup>
import CartListItem from "./CartListItem.vue";
import { computed } from "@vue/reactivity";

const props = defineProps({
  productList: Array,
  cartList: Array,
});
const emit = defineEmits(["addToCart", "delFormCart"]);

//购物车显示数据
const cartShowList = computed(() => {
  const list = props.cartList.map((item) => {
    let pro = props.productList.find((pro) => pro.id == item.id);
    return {
      id: pro.id,
      title: pro.title,
      price: pro.price,
      amount: item.amount,
    };
  });
  return list;
});
//总价
const priceCount = computed(() => {
  const count = cartShowList.value.reduce((prev, next) => {
    return (prev += next.price * next.amount);
  }, 0);
  return count;
});
</script>

<style>
</style>