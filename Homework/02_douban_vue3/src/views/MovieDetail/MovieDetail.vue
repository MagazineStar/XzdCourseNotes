<template>
  <div class="container">
    <div class="nav" :style="{ opacity: visible }">
      <button>返回首页</button>
    </div>
    <div style="margin-top: 150px">
      {{ item?.title }}
      <img :src="item.pic" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  name: "MovieDetail"
};
</script>
<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useHttp } from "./Hooks/useHttp";
const $router = useRouter();
const visible = ref(0);
const item = ref({});
onMounted(async () => {
  /* 监听窗口的滚动 */
  console.log("detail");
  window.addEventListener("scroll", handleScroll);
  let result = await useHttp();
  item.value = result;
});
const handleScroll = () => {
  /* 达到300px滚动条完全显示 */
  var scrollTop = window.scrollY;
  var opacity = scrollTop / 300;
  if (opacity > 1) {
    opacity = 1;
  }
  visible.value = opacity;
};
onUnmounted(() => {
  console.log("detail页面销毁了");
  /* 全局事件的监听和解绑 */
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.container {
  height: 1000px;
}
.nav {
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  background-color: #652e80;
}
</style>
