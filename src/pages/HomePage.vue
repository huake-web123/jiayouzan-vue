<!--Created by hjx on 2018/6/21.-->
<template>
    <div class="head-box">
      <swiper :options="swiperOptions" ref="mySwiper" class="swiper-box">
        <swiper-slide v-for="banner in banners" v-bind:key="banner.id">
          <img class="banner-bg" :src="banner.imgUrl">
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
      banners: [],
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
  },
  mounted () {
    this.$nextTick(() => {
      this.getSwiper()
    })
  },
  methods: {
    getSwiper () {
      // this.banners
      let that = this
      this.$ajax({
        method: 'get',
        url: 'https://www.easy-mock.com/mock/5b2e1206d901cc25e7df4de5/jiayouzan/banner'
      }).then((res) => {
        // res是变量
        that.banners = res.data.data
      })
    }
  }
}
</script>

<style scoped>
  .head-box{
    height:3rem;
  }
  .swiper-box{
    height:3rem;
  }
  .swiper-box .banner-bg{
    width:100%;
    height:3rem;
  }
  .swiper-pagination{
    right:0;
    top:2.5rem;
  }
  .menu-box{
    background-color: #dfdfdf;
    height: 1rem;
    display:flex;
    justify-content:space-around;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .img-box{
    display:flex;
    flex-direction:column;
    justify-content:center;
    font-size:0.3rem;
    text-decoration: none;
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
