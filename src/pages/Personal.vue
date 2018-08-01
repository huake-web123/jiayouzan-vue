<!--Created by hjx on 2018/6/22.-->
<template>
    <div class="wrapper-box">
      <loading :loadStatus="showLoading"></loading>
      <div class="header-box">
        <div class="personal-box">笑笑</div>
        <div class="total">
          <div class="fuel-box add-box">
            <div>0&nbsp;L</div>
            <div class="add-txt">累计加油量</div>
          </div>
          <div class="consume-box add-box">
            <div>&yen;&nbsp;0</div>
            <div class="add-txt">累计消费金额</div>
          </div>
          <div class="save-box">
            <div>&yen;&nbsp;0</div>
            <div class="add-txt">累计节省金额</div>
          </div>
        </div>
      </div>
      <div class="add-car">
        <div class="img-box">
          <div class="car-img"><img src="../assets/add.png"></div>
          <div>添加我的爱车</div>
        </div>
        <div class="arrow"><img src="../assets/arrow.png"></div>
      </div>
      <div class="membership-box">
        <div class="membership">
          <div class="img-box"><img src="../assets/huangguanvip.png"></div>
          <div class="member-discription">
            <div class="card">特权会员卡</div>
            <div class="discount">全年八折停车，98折加油，共享汽车服务会员价</div>
          </div>
        </div>
        <div class="arrow"><img src="../assets/arrow.png"></div>
      </div>
      <div class="invite-box menu">
          <div class="img-box">
            <div class="img"><img src="../assets/myinvitaition.png"></div>
            <div class="img-txt">邀请好友赢大礼</div>
          </div>
          <div class="arrow"><img src="../assets/arrow.png"></div>
        </div>
      <div class="my-order menu" @click="openOrderList()">
        <div class="img-box">
          <div class="img"><img src="../assets/order.png"></div>
          <div class="img-txt">我的订单</div>
        </div>
        <div class="arrow"><img src="../assets/arrow.png"></div>
      </div>
      <div class="goods-order menu">
        <div class="img-box">
          <div class="img"><img src="../assets/order.png"></div>
          <div class="img-txt">商品订单</div>
        </div>
        <div class="arrow"><img src="../assets/arrow.png"></div>
      </div>
      <div class="coupon menu">
        <div class="img-box">
          <div class="img"><img src="../assets/redpack.png"></div>
          <div class="img-txt">我的优惠券</div>
        </div>
        <div class="arrow"><img src="../assets/arrow.png"></div>
      </div>
      <div class="my-colletion menu">
        <div class="img-box">
          <div class="img"><img src="../assets/mycollect.png"></div>
          <div class="img-txt">我的收藏</div>
        </div>
        <div class="arrow"><img src="../assets/arrow.png"></div>
      </div>
      <div class="bind-cellphone menu">
        <div class="img-box">
          <div class="img"><img src="../assets/bindmobile.png"></div>
          <div class="img-txt">绑定手机号</div>
        </div>
        <div class="arrow"><img src="../assets/arrow.png"></div>
      </div>
      <div class="build-box">
        <div class="img-box"><img src="../assets/building.png"></div>
        <div class="img-txt">App努力开发中，敬请期待......</div>
      </div>
    </div>
</template>

<script>
import loading from '@/components/loading'
export default {
  name: '',
  data () {
    return {
      showLoading: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.showLoading = false
    })
  },
  components: {
    'loading': loading
  },
  methods: {
    openOrderList () {
      this.$router.push({path: '/orderList'})
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper-box{
  background-color: #F5F5F5;
  min-height: 100vh;
  box-sizing: border-box;
  padding-bottom: 2rem;
  .header-box{
    height:3.5rem;
    background-color:#F8515F;
    .personal-box{
      height:1.5rem;
      line-height:1.5rem;
    }
    .total{
      display:flex;
      justify-content:space-around;
      height:0.85rem;
      >div{
        display:flex;
        flex-direction: column;
        align-items: center;
      }
      .add-txt{
        font-size:0.28rem;
        margin-top:0.1rem;
      }
      .add-box {
        position: relative;
        &:after {
          content: '';
          display: block;
          width: 1px;
          height: 70%;
          background-color: white;
          position:absolute;
          top:0.15rem;
          right:-0.45rem;
        }
      }
    }
  }
  .add-car {
    background-color: white;
    width: 90%;
    height: 1.4rem;
    line-height: 1.4rem;
    position: relative;
    top: -0.5rem;
    /*left:0.35rem;*/
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    .img-box {
      display:flex;
      align-items: center;
      .car-img {
        margin-left: 0.3rem;
        margin-right: 0.2rem;
        width: 0.8rem;
        height: 0.8rem;
        /*-webkit-border-radius: 50%;*/
        /*-moz-border-radius: 50%;*/
        border-radius: 50%;
        display: flex;
        > img {
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
        }
      }
    }
    .arrow{
      margin-right:0.32rem;
      width:0.5rem;
      height: 0.6rem;
      line-height: 0.6rem;
      >img{
        width:0.5rem;
        height: 0.6rem;
      }
    }
  }
  .membership-box{
    background-color: white;
    height:1.6rem;
    display:flex;
    justify-content: space-between;
    align-items: center;
    .arrow{
      margin-right: 0.32rem;
      width:0.5rem;
      height: 0.6rem;
      line-height: 0.6rem;
      >img{
        width:0.5rem;
        height: 0.6rem;
      }
    }
    .membership{
      display:flex;
      margin-left:0.32rem;
    }
    .member-discription{
      margin-left:0.2rem;
     .card{
       font-size:0.26rem;
       color:#333333;
     }
      .discount{
        font-size:0.2rem;
        color:#777777;
        margin-top:0.2rem;
      }
    }
  }
  .menu{
    height:0.88rem;
    display:flex;
    justify-content: space-between;
    background-color: white;
    margin-top:0.03rem;
    align-items:center;
    &.invite-box{
      margin-top:0.3rem;
      margin-bottom: 0.3rem;
    }
    &.bind-cellphone{
      margin-top:0.2rem;
    }
    .img-box{
      display:flex;
      margin-left:0.32rem;
      align-items: center;
      .img{
        >img{
          width:0.5rem;
          height:0.5rem;
        }
      }
      .img-txt{
        margin-left:0.2rem;
      }
    }
    .arrow{
      margin-right: 0.32rem;
      width:0.5rem;
      height: 0.6rem;
      line-height: 0.6rem;
      >img{
        width:0.5rem;
        height: 0.6rem;
      }
    }
  }
  .build-box{
    margin-top:0.38rem;
    height:1rem;
    display:flex;
    justify-content: center;
    color:#8a8a8a;
    align-items: center;
    .img-box{
      >img{
        width: 0.5rem;
        height: 0.5rem;
      }
    }
    .img-txt{
      margin-left:0.2rem;
    }
  }
  .modal-box{
    position:absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #F5F5F5;
    z-index: 99;
    overflow: auto;
    .header{
      height:0.88rem;
      background-color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 0.3rem;
      padding-right: 0.3rem;
      >div{
        height: 0.88rem;
        line-height: 0.88rem;
        &.selected{
          color: #eb4652;
          border-bottom:3px solid #eb4652;
        }
      }
    }
    .order-list{
      .main-content{
        /*height: 2.5rem;*/
        font-size: 0.3rem;
        margin-top:0.2rem;
        .gas-station{
          height: 0.7rem;
          background-color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-left: 0.3rem;
          padding-right: 0.3rem;
          .station-box{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .img-box{
              margin-right: 0.2rem;
              height:0.4rem;
              >img{
                height:0.4rem;
              }
            }
          }
          .state{
            color: #EC8349;
          }
        }
        .oil-box{
          height: 1.5rem;
          background-color: white;
          margin-top: 0.05rem;
          padding-left: 0.3rem;
          padding-right: 0.3rem;
          display: flex;
          align-items: center;
          .oil-gun{
            margin-right: 0.2rem;
            >img{
              height: 1.2rem;
            }
          }
        }
        .pay-box{
          height: 0.7rem;
          line-height: 0.7rem;
          background-color: white;
          margin-top: 0.05rem;
          padding-left: 0.3rem;
          padding-right: 0.3rem;
          .money{
            color:#eb4652;
          }
        }
      }
    }

  }
}
</style>
