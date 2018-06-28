<!--Created by hjx on 2018/6/22.-->
<template>
  <div class="wrapper-box">
    <swiper :options="swiperOptions" class="swiper-box">
      <swiper-slide v-for="item in banners">
        <div class="img-box"><img :src="item.img_url"></div>
      </swiper-slide>
    </swiper>
    <div class="swiper-pagination"></div>
      <!--v-if判断是否有值，有值为真-->
    <div class="gas-station" v-if="nearbyStation">
      <div>
        <div class="station-name">{{nearbyStation.name}}</div>
          <!--nearbyStation是对象，直接调用，注意和数组的区别。v-for是用来循环的，如果只有一个对象就不能循环。-->
          <div class="station-position">{{nearbyStation.location}}</div>
        </div>
        <div class="station-distance">{{nearbyStation.distance}}</div>
      </div>
    <div class="midcontent">
      <div class="pay-box">
        <div class="pay-img"><img src="../assets/zhifu.png"></div>
        <div class="pay">支付</div>
      </div>
      <div class="navigation-box">
        <div class="navigation-img"><img src="../assets/daohang.png"></div>
        <div class="navigation">导航</div>
      </div>
    </div>
    <div class="load-more" v-for="item in loadArr" v-bind:key="item.id">
       <div>
          <div class="station-name">{{item.name}}</div>
          <div class="staion-location">{{item.location}}</div>
       </div>
       <div>
          <div class="station-distance">{{item.distance}}</div>
          <div class="station-img"><img src="../assets/daohang.png"></div>
       </div>
    </div>
    <div class="load-box" @click="loadMore">
      <div class="drop-down">点击下拉获取更多加油站</div>
      <div class="img-box"><img src="../assets/jiantou.png"></div>
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
      loadArr: [],
      page: '1',
      stationArr: [],
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
    loadMore () {
      this.page++
      this.loadMoreStation()
    },
    loadBanner () {
      return this.$ajax.get('https://www.easy-mock.com/mock/5b2e1206d901cc25e7df4de5/jiayouzan/station_banner')
    },
    loadNearbyStation () {
      return this.$ajax.get('https://www.easy-mock.com/mock/5b2e1206d901cc25e7df4de5/jiayouzan/nearby_station')
    },
    loadMoreStation () {
      return this.$ajax.get('https://www.easy-mock.com/mock/5b2e1206d901cc25e7df4de5/jiayouzan/stations/' + this.page + '/10')
    },
    loadData () {
      this.$ajax.all([this.loadBanner(), this.loadNearbyStation(), this.loadMoreStation()])
        .then((res) => {
          this.banners = res[0].data.data
          this.nearbyStation = res[1].data.data
          this.loadArr = res[2].data.stationArr
        })
    }
  }
}
</script>

<style  lang="less" scoped>
  .wrapper-box {
    background-color: #F5F5F5;
    padding-bottom:4.8rem;
    .img-box {
      height: 3rem;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .swiper-pagination {
      right: 0;
      top: 2.5rem;
    }
    .gas-station {
      height: 1.8rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 0.25rem;
      padding-right: 0.35rem;
      background-color: white;
      .station-name {
        color: #222222;
        font-size: 0.38rem;
      }
      .station-position {
        color: #8A8A8A;
        margin-top: 0.1rem;
      }
      .station-distance {
        color: #8A8A8A;
      }
    }
    .midcontent {
      height: 1.2rem;
      display: flex;
      justify-content: space-around;
      margin-top: 0.025rem;
      background-color: white;
      .pay-box {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .navigation-box {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 0.72rem;
        }
      }
    }
    .load-more{
      height: 1.8rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 0.25rem;
      padding-right: 0.35rem;
      background-color: white;
      .station-name {
        color: #222222;
        font-size: 0.38rem;
      }
      .station-position {
        color: #8A8A8A;
        margin-top: 0.1rem;
      }
      .station-distance {
        color: #8A8A8A;
        /*width:0.8rem;*/
        /*overflow:hidden;*/
      }
      .station-img{
        img{
          width:0.72rem;
        }
      }
    }
    .load-box {
      text-align: center;
      margin-top: 0.025rem;
      .drop-down {
        background-color: white;
        height: 1rem;
        line-height: 1rem;
      }
      .img-box {
        height: 0.5rem;
        text-align: center;
        display:flex;
        justify-content:center;
        img{
          width:2rem;
        }
      }
    }
  }
</style>
