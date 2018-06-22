<!--Created by hjx on 2018/6/21.-->
<template>
    <div class="wrapper-box">
      <swiper :options="swiperOptions" ref="mySwiper">
        <swiper-slide v-bind:v-for="banner in banners">
          <img class="banner-bg" :src="banner">
        </swiper-slide>
      </swiper>
      <div class="swiper-pagination"></div>
      <div class="menu-box">
        <router-link tag="a"  to="/HomePage" class="img-box" active-class="selected">
          <div class="home-page"></div>
          <span>首页</span>
        </router-link>
        <router-link  tag="a" to="/Gas" class="img-box" active-class="selected">
          <div class="gas-page"></div>
          <span>加油</span>
        </router-link>
        <router-link  tag="a" to="/CarService" class="img-box" active-class="selected">
          <div class="car-page"></div>
          <span>汽车服务</span>
        </router-link>
        <router-link  tag="a" to="/Personal" class="img-box" active-class="selected">
          <div class="personal-page"></div>
          <span>我</span>
        </router-link>
      </div>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
export default {
  name: '',
  data () {
    return {
      banners: ['http://7xqnxu.com1.z0.glb.clouddn.com/jiayouzan-vue-1.jpg',
        'http://7xqnxu.com1.z0.glb.clouddn.com/jiayouzan-vue-2.jpg',
        'http://7xqnxu.com1.z0.glb.clouddn.com/jiayouzan-vue-3.jpg',
        'http://7xqnxu.com1.z0.glb.clouddn.com/jiayouzan-vue-4.jpg'],
      swiperOptions: {
        autoplay: true,
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  components: {
    'swiper': swiper,
    'swiper-slide': swiperSlide
  }
}
</script>

<style scoped>
  .menu-box{
    background-color: #dfdfdf;
    height: 3.125rem;
    display:flex;
    justify-content:space-around;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .img-box>div{
    width:0.6rem;
    height:0.6rem;
    background-size:0.6rem 0.6rem;
  }
  .menu-box .img-box .home-page{
    background-image:url('../assets/menu/home.png');
  }
  .menu-box .img-box .gas-page{
    background-image:url('../assets/menu/gas.png');
  }
  .menu-box .img-box .car-page{
    background-image:url('../assets/menu/car.png');
  }
  .menu-box .img-box .personal-page{
    background-image:url('../assets/menu/my.png');
  }
  .menu-box .img-box.selected .home-page{
    background-image:url("../assets/menu/home@selected.png");
  }
  .menu-box .img-box.selected .gas-page{
    background-image:url('../assets/menu/gas@selected.png');
  }
  .menu-box .img-box.selected .car-page{
    background-image:url('../assets/menu/car@selected.png');
  }
  .menu-box .img-box.selected .personal-page{
    background-image:url('../assets/menu/my@selected.png');
  }
</style>
