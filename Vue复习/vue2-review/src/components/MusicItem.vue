<template>
  <div class="item" @click="handleItem(item.id)">
    <img :src="item.coverImgUrl" alt="" />
    <p>{{ item.name }}</p>
  </div>
</template>
<script>
export default {
  name: "MusicItem",
  data() {
    return {
      msg: "我是子组件",
    };
  },
  props: {
    item: {
      type: Object,
    },
  },
  methods: {
    handleItem(id) {
      //   console.log(id);
      this.$emit("delItem", id);
    },
  },
};
/* 相当于一个类
class MusicItem{

}
*/
</script>
<style>
.item {
  margin-top: 5px;
  width: 200px;
  padding: 5px;
  border: 1px solid #333;
  border-radius: 15px;
}
.item img {
  width: 200px;
  height: 200px;
}
</style>
