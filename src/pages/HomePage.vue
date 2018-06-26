<!--Created by hjx on 2018/6/21.-->
<template>
  <div class="whole-box">
    <div class="loading" v-if="isLoading">加载中......</div>
    <div class="head-box" v-else>
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
      goodsArr: [],
      loadArr: [],
      page: '1',
      isLoading: true,
      allLoaded: false,
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
      this.loadMoreGoodsData()
    },
    loadBannerData () {
      return this.$ajax.get('https://www.easy-mock.com/mock/5b2e1206d901cc25e7df4de5/jiayouzan/banner')
    },
    loadGoodsData () {
      return this.$ajax.get('https://www.easy-mock.com/mock/5b2e1206d901cc25e7df4de5/jiayouzan/goods/' + this.page + '/6')
    },
    loadData () {
      this.$ajax.all([this.loadGoodsData(), this.loadBannerData()])
        .then((res) => {
          let goodsData = res[0]
          let bannerData = res[1]
          this.banners = bannerData.data.data
          this.goodsArr = goodsData.data.data
          this.isLoading = false
        })
    },
    loadMoreGoodsData () {
      this.$ajax.all([this.loadGoodsData()])
        .then((res) => {
          let goodsData = res[0]
          if (goodsData.data.data.length === 0) {
            this.allLoaded = true
          } else {
            this.goodsArr.push(...goodsData.data.data)
          }
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
  .loading{
    position:absolute;
    top:50%;
    left:50%
  }
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
  .menu-box {
    background-color: #dfdfdf;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    width: 100%;
    .img-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 0.28rem;
      text-decoration: none;
      > div {
        width: 0.5rem;
        height: 0.5rem;
        background-size: 0.5rem 0.5rem;
      }
      span {
        color: #8A8A8A;
      }
      .home-page {
        background-image: url('../assets/menu/home.png');
      }
      .gas-page {
        background-image: url('../assets/menu/gas.png');
      }
      .car-page {
        background-image: url('../assets/menu/car.png');
      }
      .personal-page {
        background-image: url('../assets/menu/my.png');
      }
      &.selected .home-page {
        background-image: url("../assets/menu/home@selected.png");
      }
      &.selected span {
        color: red;
      }
      &.selected .gas-page {
        background-image: url('../assets/menu/gas@selected.png');
      }
      &.selected .car-page {
        background-image: url('../assets/menu/car@selected.png');
      }
      &.selected .personal-page {
        background-image: url('../assets/menu/my@selected.png');
      }
    }
  }
</style>
