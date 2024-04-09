<template>
  <div id="map"></div>
</template>

<script setup>
import { gaode_image, gaode_vector } from "../gaode_libs/gaode";
import { app } from "../main";
// import { useGlobal } from "../utils/useGlobal";
onMounted(() => {
  const map = new ol.Map({
    target: "map",
    layers: [gaode_image, gaode_vector],
    view: new ol.View({
      center: [114.3, 30.5],
      zoom: 4,
      projection: "EPSG:4326",
    }),
  });
  app.provide("$map", map);
  useGlobal();
});
</script>
<style></style>
