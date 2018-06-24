<!--Created by hjx on 2018/6/21.-->
<template>
    <div class="head-box">
      <swiper :options="swiperOptions" ref="mySwiper" class="swiper-box">
        <swiper-slide v-for="banner in banners" v-bind:key="banner.id">
          <img class="banner-bg" :src="banner.imgUrl">
        </swiper-slide>
      </swiper>
      <div class="swiper-pagination"></div>
      <div class="head-content">
        <div class="content-box">
          <img src="../assets/tingche.png">
          <div>停车</div>
        </div>
        <div class="content-box">
          <img src="../assets/weizhangdaijiao.png">
          <div>违章代缴</div>
        </div>
        <div class="content-box">
          <img src="../assets/huodong.png">
          <div>活动</div>
        </div>
      </div>
      <div class="main-content">
        <div class="content-title">热卖商品</div>
        <div class="goods">
          <div class="goods-type">
            <img>
            <div>焕然-新套餐</div>
            <div>
              <div></div>
              <div>购买</div>
            </div>
          </div>
        </div>
      </div>
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
    background-color:#F5F5F5;
  }
  .swiper-box{
    height:3.5rem;
  }
  .swiper-box .banner-bg{
    width:100%;
    height:3.5rem;
  }
  .swiper-pagination{
    right:0;
    top:3rem;
  }
  .head-content{
    height:2rem;
    display:flex;
    justify-content:space-around;
    background-color:white;
  }
  .content-box{
    height:1.6rem;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
  }
  .content-box img{
    width:1rem;
    margin-bottom:0.2rem;
  }
  .main-content{
    height:5rem;
    margin-top:0.2rem;
  }
  .main-content .content-title{
    height:0.8rem;
    background-color:white;
    text-align:center;
    line-height:0.8rem;
  }
 .main-content .goods .goods-type{
   width:3.5rem;
   height:4.5rem;
   background-color:white;
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
    align-items: center;
    font-size:0.28rem;
    text-decoration: none;
  }
  .img-box>div{
    width:0.5rem;
    height:0.5rem;
    background-size:0.5rem 0.5rem;
  }
  .img-box span{
    color:#8A8A8A;
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
  .menu-box .img-box.selected span{
    color:red;
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
