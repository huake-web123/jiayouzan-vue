<!--Created by hjx on 2018/6/21.-->
<template>
  <div class="whole-box">
    <loading-box :loadStatus="showLoading"></loading-box>
    <div class="head-box" v-if="pageLoaded">
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
          <div class="goods-type" v-for="item in goodsArr" v-bind:key="item.id">
            <div class="img-box"><img :src="item.imgUrl"></div>
            <div class="desc">{{item.name}}</div>
            <div class="buy-box">
              <div class="price">&yen;{{item.price}}</div>
              <div class="buy">购买</div>
            </div>
          </div>
        </div>
        <div class="more" @click="loadMore" v-if="!allLoaded">加载更多</div>
        <div class="complete" v-else>加载完毕</div>
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import loading23132 from '@/components/loading'
export default {
  name: '',
  data () {
    return {
      banners: [],
      goodsArr: [],
      loadArr: [],
      page: '1',
      pageLoaded: false,
      allLoaded: false,
      showLoading: true,
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
    'swiper-slide': swiperSlide,
    'loading-box': loading23132
  },
  mounted () {
    this.$nextTick(() => {
      this.loadData()
    })
  },
  methods: {
    loadMore () {
      this.page++
      this.loadMoreGoodsData()
    },
    loadBannerData () {
      return this.$ajax.get('https://dsn.apizza.net/mock/fb275314bc53ebc54f45a6b698d2433d/banner')
    },
    loadGoodsData () {
      return this.$ajax.get('https://dsn.apizza.net/mock/fb275314bc53ebc54f45a6b698d2433d/goods/' + this.page + '/6')
    },
    loadData () {
      this.$ajax.all([this.loadGoodsData(), this.loadBannerData()])
        .then((res) => {
          let goodsData = res[0]
          let bannerData = res[1]
          this.banners = bannerData.data.data
          this.goodsArr = goodsData.data.data
          this.pageLoaded = true
          this.showLoading = false
        })
    },
    loadMoreGoodsData () {
      this.showLoading = true
      this.$ajax.all([this.loadGoodsData()])
        .then((res) => {
          let goodsData = res[0]
          if (goodsData.data.data.length === 0) {
            this.allLoaded = true
          } else {
            this.goodsArr.push(...goodsData.data.data)
          }
          this.showLoading = false
        })
    }
    // loadData () {
    //   let that = this
    //   this.$ajax({
    //     method: 'get',
    //     url: 'https://www.easy-mock.com/mock/5b2e1206d901cc25e7df4de5/jiayouzan/goods/' + this.page + '/6'
    //   }).then((res) => {
    //     console.log(res)
    //     this.goodsArr.push(...res.data.data)
    //     // 往下面滚动
    //     that.a = true
    //     that.loadArr = res.data.data
    //   })
    // },
    // getSwiper () {
    //   // this.banners
    //   let that = this
    //   this.$ajax({
    //     method: 'get',
    //     url: 'https://www.easy-mock.com/mock/5b2e1206d901cc25e7df4de5/jiayouzan/banner'
    //   }).then((res) => {
    //     // res是变量
    //     that.banners = res.data.data
    //     that.b = true
    //   })
    // }
  }
}
</script>

<style lang="less" scoped>
.whole-box{
 .head-box{
    background-color:#F5F5F5;
  }
  .swiper-box{
    height:3.5rem;
    .banner-bg{
      width:100%;
      height:3.5rem;
    }
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
  .content-box {
    height: 1.6rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 1rem;
      margin-bottom: 0.2rem;
    }
  }
  .main-content {
    /*height: 6.7rem;*/
    margin-top: 0.2rem;
    padding-bottom:1rem;
    .content-title {
      height: 0.8rem;
      background-color: white;
      text-align: center;
      line-height: 0.8rem;
      font-size:0.28rem;
    }
    /*css3::after伪类*/
    .content-title:before{
      content:"———";
      margin-right:0.2rem;
      color:#8A8A8A
    }
    .content-title:after{
      content:"———";
      margin-left:0.2rem;
      color:#8A8A8A
    }
    .more{
      text-align:center;
      height:0.8rem;
      line-height:0.8rem;
      font-size:0.28rem;
    }
    .complete{
      text-align:center;
      height:0.8rem;
      line-height:0.8rem;
      font-size:0.28rem;
    }
    .goods{
      margin-top:0.05rem;
      display:flex;
      justify-content:space-between;
      flex-wrap:wrap;
      .goods-type {
        width: 3.6rem;
        height: 5rem;
        background-color: white;
        margin-top:0.25rem;
        /*display:flex;*/
        /*flex-direction:column;*/
        /*justify-content:space-around;*/
        /*align-items:center;*/
        .img-box{
          display:flex;
          justify-content:center;
          align-items:center;
          height:3.2rem;
          img{
            width:2rem;
            height:2.5rem;
          }
        }
        .desc{
          margin-top:0.2rem;
          font-size:0.28rem;
          margin-left:0.25rem;
          height:0.75rem;
          overflow:hidden;
        }
        .buy-box{
          display:flex;
          justify-content:space-between;
          color:red;
          margin-left:0.2rem;
          margin-right:0.2rem;
          margin-top:0.25rem;
          font-size:0.28rem;
          .price{
            padding:0.05rem;
          }
          .buy{
            border:1px solid #F5F5F5;
            padding:0.05rem;
          }
        }
      }
    }
  }
}
</style>
