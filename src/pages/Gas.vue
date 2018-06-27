<!--Created by hjx on 2018/6/22.-->
<template>
  <div class="wrapper-box">
    <swiper :options="swiperOptions" class="swiper-box">
      <swiper-slide v-for="item in banners">
        <div class="img-box"><img :src="item.img_url"></div>
      </swiper-slide>
    </swiper>
    <div class="swiper-pagination"></div>
    <div v-if="nearbyStation">
      <!--判断是否有值，有值为真-->
      <div class="gas-station" >
        <div class="station-name">{{nearbyStation.name}}</div>
        <!--nearbyStation是对象，直接调用，注意和数组的区别。v-for是用来循环的，如果只有一个对象就不能循环。-->
        <div class="station-position">{{nearbyStation.location}}</div>
      </div>
     <div class="station-distance">{{nearbyStation.distance}}</div>
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
      nearbyStation: null,
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
      this.loadData()
    })
  },
  methods: {
    loadBanner () {
      return this.$ajax.get('https://www.easy-mock.com/mock/5b2e1206d901cc25e7df4de5/jiayouzan/station_banner')
    },
    loadNearbyStation () {
      return this.$ajax.get('https://www.easy-mock.com/mock/5b2e1206d901cc25e7df4de5/jiayouzan/nearby_station')
    },
    loadData () {
      this.$ajax.all([this.loadBanner(), this.loadNearbyStation()])
        .then((res) => {
          this.banners = res[0].data.data
          this.nearbyStation = res[1].data.data
        })
    }
  }
}
</script>

<style  lang="less" scoped>
  .wrapper-box{
    .img-box{
      height:3rem;
      img{
        height:100%;
        width:100%;
      }
    }
    .swiper-pagination{
      right:0;
      top:2.5rem;
    }
  }
</style>
