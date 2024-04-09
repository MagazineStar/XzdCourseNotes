<template>
  <div class="container">
    <div 
    @click="handleItem(item.id)"
    class="item" v-for="item of movies" :key="item.id">
      <img :src="item.pic" alt="">
      <p>{{ item.title }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted,ref } from "vue";
import { getTop250Http } from "../../API";
import {useRouter} from 'vue-router'
const $router = useRouter();
const movies = ref([])
onMounted(async () => {
  let res = await getTop250Http();
  movies.value = res.data.result
});

const handleItem=(id)=>{
    $router.push(`/detail?id=${id}`)
}
</script>

<style scoped>
*{margin:0;padding:0}
.container {
  width: 500px;
  margin: 5px auto;
}
.item img{
  width:100px;
  height: 170px;
}
.item{
  border-bottom: 1px solid #333;
}
</style>
