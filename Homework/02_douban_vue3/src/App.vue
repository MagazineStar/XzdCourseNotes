<template>
  <router-view v-slot="{ Component }">
    <keep-alive exclude="MovieDetail">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <!-- <router-view></router-view> -->
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style></style>
