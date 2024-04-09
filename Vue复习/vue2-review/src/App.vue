<template>
  <div class="container">
    <!-- new MusicItem -->
    <music-item
      v-for="item of musics"
      :key="item.id"
      :item="item"
      @delItem="delItem"
    ></music-item>
  </div>
</template>
<script>
import MusicItem from "./components/MusicItem.vue";
import { getListHttp } from "./API";
export default {
  components: {
    MusicItem,
  },
  data() {
    return {
      musics: [],
    };
  },
  async mounted() {
    /* created  --ssr,mounted */
    let result = await getListHttp();
    this.musics = result.data.playlists;
  },
  methods:{
    delItem(id){
      var result = this.musics.filter(item=>item.id !=id);
      this.musics = result;
    }
  }
};
</script>
<style>
.container {
  width: 800px;
  display: flex;
  margin: 10px auto;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
