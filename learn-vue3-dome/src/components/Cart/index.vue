<template>
  <div class="container">
    <h3>购物车（使用组件之间传值完成）</h3>
    <ProductList :productList="productList" @addToCart="addToCart" />
    <hr />
    <CartList
      :productList="productList"
      :cartList="cartList"
      @addToCart="addToCart"
      @delFormCart="delFormCart"
    />
  </div>
</template>

<script setup>
import { reactive, toRefs } from "@vue/reactivity";
import ProductList from "./ProductList/ProductList.vue";
import CartList from "./CartList/CartList.vue";

const cartData = reactive({
  productList: [
    {
      id: 1,
      title: "商品A",
      price: 10,
    },
    {
      id: 2,
      title: "商品B",
      price: 20,
    },
    {
      id: 3,
      title: "商品C",
      price: 50,
    },
  ],
  cartList: [
    {
      id: 1,
      amount: 1,
    },
  ],
});

//加入购物车
const addToCart = (id) => {
  let pro = cartData.cartList.find((item) => item.id == id);
  if (pro) {
    pro.amount++;
  } else {
    cartData.cartList.push({
      id: id,
      amount: 1,
    });
  }
};

//减少
const delFormCart = (id) => {
  let pro = cartData.cartList.find((item) => item.id == id);
  if (pro.amount == 1) {
    cartData.cartList = cartData.cartList.filter((item) => {
      item.id != pro.id;
    });
  } else {
    pro.amount--;
  }
};

const { productList, cartList } = toRefs(cartData);
//添加自定义事件
// event.$on("addToCart", addToCart);
// event.$on("delFormCart", delFormCart);
</script>

<style>
</style>