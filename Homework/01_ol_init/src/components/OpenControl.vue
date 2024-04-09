<template>
  <div id="mouse-position"></div>
</template>

<script setup>
import { inject, onMounted } from "vue";

onMounted(() => {
  const $map = inject("$map");
  var navControl = new ol.control.ZoomToExtent({
    extent: [100, 30, 140, 30],
  });
  $map.addControl(navControl);
  var zoomslider = new ol.control.ZoomSlider();
  $map.addControl(zoomslider);
  //实例化鼠标位置控件（MousePosition）
  var mousePositionControl = new ol.control.MousePosition({
    //坐标格式
    coordinateFormat: ol.coordinate.createStringXY(4),
    //地图投影坐标系（若未设置则输出为默认投影坐标系下的坐标）
    projection: "EPSG:4326",
    //坐标信息显示样式类名，默认是'ol-mouse-position'
    className: "custom-mouse-position",
    //显示鼠标位置信息的目标容器
    target: document.getElementById("mouse-position"),
    //未定义坐标的标记
    undefinedHTML: "&nbsp;",
  });
  $map.addControl(mousePositionControl);
});
</script>

<style>
.ol-zoomslider {
  top: 7.5em;
}
/* 鼠标位置控件层样式设置 */
#mouse-position {
  position: fixed;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #652e807d;
  width: 200px;
  height: 40px;
  border-radius: 15px;
  /*在地图容器中的层，要设置z-index的值让其显示在地图上层*/
  z-index: 2000;
  text-align: center;
  line-height: 40px;
  color: #fff;
}
/* 鼠标位置信息自定义样式设置 */
.custom-mouse-position {
  /* color: rgb(0, 0, 0); */
  font-size: 16px;
  font-family: "微软雅黑";
}
.ol-zoomslider {
  background-color: #652e807d;
}
.ol-control:hover {
  background-color: #652e80e5;
}
</style>
