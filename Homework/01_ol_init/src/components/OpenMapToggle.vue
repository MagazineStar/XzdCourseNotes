<template></template>

<script setup>
const isToggle = ref(false);
onMounted(() => {
  const $map = inject("$map");
  $map.on("click", () => {
    isToggle.value = !isToggle.value;
    var layers = $map.getLayers().getArray();
    var gaode = layers[1];
    if (isToggle.value) {
      gaode.setVisible(false);
    } else {
      gaode.setVisible(true);
    }
  });
});
</script>

<style></style>
