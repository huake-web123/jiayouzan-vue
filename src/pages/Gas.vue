<!--Created by hjx on 2018/6/22.-->
<template>
  <div class="wrapper-box">
    <swiper :options="swiperOptions" class="swiper-box">
      <swiper-slide v-for="item in banners" v-bind:key="item.id">
        <div class="img-box"><img :src="item.img_url"></div>
      </swiper-slide>
    </swiper>
    <div class="swiper-pagination"></div>
      <!--v-if判断是否有值，有值为真-->
    <div class="gas-station" v-if="nearbyStation" @click="gasMessage(nearbyStation.id, nearbyStation.name)">
      <div>
        <div class="station-name">{{nearbyStation.name}}</div>
          <!--nearbyStation是对象，直接调用，注意和数组的区别。v-for是用来循环的，如果只有一个对象就不能循环。-->
          <div class="station-location">{{nearbyStation.location}}</div>
        </div>
        <div class="station-distance">{{nearbyStation.distance | distanceFilters}}km</div>
      </div>
    <div class="midcontent">
      <div class="pay-box" @click="gasMessage(nearbyStation.id, nearbyStation.name)">
        <div class="pay-img"><img src="../assets/zhifu.png"></div>
        <div class="pay">支付</div>
      </div>
      <div class="navigation-box">
        <div class="navigation-img"><img src="../assets/daohang.png"></div>
        <div class="navigation">导航</div>
      </div>
    </div>
    <div class="more-station" v-if="loading">
      <div class="load-more" v-for="item in loadArr" v-bind:key="item.id"
           @click="gasMessage(item.id, item.name)">
        <div>
          <div class="station-name">{{item.name}}</div>
          <div class="station-location">{{item.location}}</div>
        </div>
        <div>
          <div class="station-distance">{{item.distance | distanceFilters}}km</div>
          <div class="station-img"><img src="../assets/daohang.png"></div>
        </div>
      </div>
    </div>
    <div class="load-box" @click="loadMore">
      <div class="drop-down" v-if="!allLoaded">点击下拉获取更多加油站</div>
      <div class="complete" v-if="allLoaded">加载完毕</div>
      <div class="img-box" v-if="!allLoaded"><img src="../assets/jiantou.png"></div>
    </div>
    <div class="modal-box" v-if="message">
      <div class="message-box">
        <div class="img-box" @click="closeMessage">X</div>
        <div class="confirm-station">请向加油员确认当前加油站名称</div>
        <div class="station-name">{{stationName}}</div>
        <div class="confirm-refueling" @click="jiaYou">确定加油</div>
        <div class="select-error">如因站点选择错误给你带来不便，</div>
        <div class="disclaimer">加油站概不负责</div>
      <!--快速复制当前行Ctrl+D-->
    </div>
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
      stationName: '',
      stationId: '',
      message: false,
      page: '1',
      stationArr: [],
      allLoaded: false,
      loading: false,
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
  filters: {
    distanceFilters: function (value) {
      let num = parseFloat(value.split('km')[0])
      // split是js字符串转数组实现方法，parseFloat是js字符串转数字方法。
      value = num.toFixed(2)
      // toFixed是js保留两位小数方法
      return value
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.loadData()
    })
  },
  methods: {
    loadMore () {
      this.loadMoreStationData()
      this.page++
      // 先执行方法，再改变page的值
    },
    loadBanner () {
      return this.$ajax.get('https://www.easy-mock.com/mock/5b2e1206d901cc25e7df4de5/jiayouzan/station_banner')
    },
    loadNearbyStation () {
      return this.$ajax.get('https://dsn.apizza.net/mock/fb275314bc53ebc54f45a6b698d2433d/neaby_station')
    },
    loadMoreStation () {
      return this.$ajax.get('https://dsn.apizza.net/mock/fb275314bc53ebc54f45a6b698d2433d/station_list/' + this.page + '/10')
    },

    loadData () {
      this.$ajax.all([this.loadBanner(), this.loadNearbyStation()])
        .then((res) => {
          this.banners = res[0].data.data
          this.nearbyStation = res[1].data.data
        })
    },
    loadMoreStationData () {
      this.$ajax.all([this.loadMoreStation()])
        .then((res) => {
          this.loading = true
          if (res[0].data.stationArr.length === 0) {
            this.allLoaded = true
          } else {
            this.loadArr.push(...res[0].data.stationArr)
          }
        })
    },
    gasMessage (id, name) {
      this.stationName = name
      this.stationId = id
      this.message = true
    },
    closeMessage () {
      this.message = false
    },
    jiaYou () {
      this.$router.push({path: '/jiayouliang/' + this.stationId})
    }
  }
}
</script>

<style  lang="less" scoped>
  .wrapper-box {
    background-color: #F5F5F5;
    padding-bottom:3rem;
    min-height: 100vh;
    box-sizing: border-box;
    .swiper-box{
      height:3rem;
      .img-box {
      height: 3rem;
      img {
        height: 100%;
        width: 100%;
      }
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
      .station-location {
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
          width: 0.64rem;
        }
      }
    }
    .more-station{
      margin-top:0.25rem;
    }
    .load-more{
      height: 1.8rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 0.25rem;
      padding-right: 0.35rem;
      background-color: white;
      margin-top: 0.025rem;
      .station-name {
        color: #222222;
        font-size: 0.38rem;
      }
      .station-location {
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
          width:0.54rem;
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
      .complete{
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
    .modal-box {
      position:absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0,0,0,.5);
      z-index: 99;
      .message-box {
        width: 5.5rem;
        height: 5rem;
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        background-color: white;
        font-size:0.3rem;
        text-align: center;
        display:flex;
        flex-direction:column;
        align-items:center;
        .img-box{
          margin-left:4.6rem;
          margin-top:0.2rem;
        }
        .confirm-station{
          margin-top:0.3rem;
        }
        .station-name{
          margin-top:0.3rem;
          color:red;
          font-size:0.36rem;
        }
        .confirm-refueling{
          margin-top:0.3rem;
          width:4.5rem;
          height:0.7rem;
          line-height:0.7rem;
          background-color: red;
          color:white;
        }
        .select-error{
          margin-top:0.2rem;
        }
        .disclaimer{
          margin-top:0.2rem;
          color:red;
        }
      }
    }
  }
</style>
