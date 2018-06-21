<!--Created by hjx on 2018/6/21.-->
<template>
    <div class="wrapper-box">
      <swiper-slide v-for="banner in banners">
        <img class="banner-bg" :src="banner">
      </swiper-slide>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import {swiper,swiperSlide} from 'vue-awesome-swiper'
export default {
  name: '',
  data () {
    return {
      banners: ['http://7xqnxu.com1.z0.glb.clouddn.com/jiayouzan-vue-1.jpg',
        'http://7xqnxu.com1.z0.glb.clouddn.com/jiayouzan-vue-2.jpg',
        'http://7xqnxu.com1.z0.glb.clouddn.com/jiayouzan-vue-3.jpg',
        'http://7xqnxu.com1.z0.glb.clouddn.com/jiayouzan-vue-4.jpg']
    }
  },
  components: {
    'swiper': swiper,
    'swiper-slide': swiperSlide
  }
}
</script>

<style scoped>
</style>
