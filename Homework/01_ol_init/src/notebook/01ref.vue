<template>
  <button @click="addCount">{{ count }}</button>
  <p>{{ double }}</p>
</template>

<script setup>
/* data+methods+computed+watch */
/* 只要在setup语法糖中定义的变量或者函数都是可以直接被模板使用的 */
const count = ref(10);
const data = reactive({
  num: 20,
  city: "武汉",
});
const double = computed(() => {
  return count.value * 2;
});
const addCount = () => {
  count.value++;
};
</script>

<style></style>
