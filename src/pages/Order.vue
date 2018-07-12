<!--Created by hjx on 2018/7/9.-->
<template>
    <div class="wrapper-box">
      <div class="header">订单信息:</div>
      <div class="main-box">
        <div class="oil-type">{{this.gasModel}}#</div>
        <div class="money">&yen;{{this.money}}</div>
      </div>
      <div class="discount-box">
        <div class="discount">优惠券</div>
        <div class="discount-txt">暂无可用红包</div>
      </div>
      <div class="bill-box">
        <div class="bill-title">发票抬头</div>
        <div class="img-box">
          <div class="bill-txt">哈哈啊</div>
          <div class="arrow"><img src="../assets/arrow.png"></div>
        </div>
      </div>
      <div class="advertisement">
        <div class="content-left">
          <div class="huang-guan"><img src="../assets/huangguanvip.png"></div>
          <div>会员价</div>
          <div class="discount-price">加油98折</div>
          <div>加入特权会员一年可省600元</div>
        </div>
        <div class="arrow"><img src="../assets/arrow.png"></div>
      </div>
      <div class="pay-box">
        <div class="payment">去支付&yen;{{this.money}}</div>
        <div class="save">(已节省&yen;0)</div>
      </div>

    </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      gasModel: '',
      money: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.gasModel = this.$route.params.gasModel
      this.money = this.$route.params.money
    })
  }
}
</script>

<style lang="less" scoped>
  .wrapper-box {
    background-color: #F5F5F5;
    padding-bottom: 3rem;
    min-height: 100vh;
    box-sizing: border-box;
    .header{
      background-color: #F5F5F5;
      font-size: 0.3rem;
      height: 0.8rem;
      line-height: 0.8rem;
      padding-left:0.3rem;
      color:#262626;
    }
    .main-box{
      display:flex;
      justify-content:space-between;
      background-color: white;
      height:1rem;
      align-items: center;
      padding-left:0.3rem;
      padding-right:0.3rem;
      .money{
        color:#8B8B8B;
      }
    }
    .discount-box{
      margin-top:0.2rem;
      display:flex;
      justify-content:space-between;
      background-color: white;
      height:1rem;
      align-items: center;
      padding-left:0.3rem;
      padding-right:0.3rem;
      .discount-txt{
        color:#8B8B8B;
      }
    }
    .bill-box{
      margin-top:0.05rem;
      display:flex;
      justify-content:space-between;
      background-color: white;
      height:1rem;
      align-items: center;
      padding-left:0.3rem;
      padding-right:0.3rem;
      .img-box{
        display:flex;
        align-items: center;
        .bill-txt{
          color:#8B8B8B;
          font-size:0.3rem;
        }
        .arrow{
          display:flex;
          >img{
            height:0.42rem;
          }
        }
      }
    }
    .advertisement{
      margin-top:0.05rem;
      display:flex;
      justify-content:space-between;
      background-color: white;
      height:1rem;
      align-items: center;
      padding-left:0.3rem;
      padding-right:0.3rem;
      font-size: 0.28rem;
      .content-left{
        display:flex;
        align-items: center;
        .huang-guan{
          img{
            width:0.5rem;
          }
        }
        .discount-price{
          color:#EB4553;
        }
      }
      .arrow{
        display:flex;
        >img{
          height:0.42rem;
        }
      }
    }
    .pay-box{
      margin-top:0.3rem;
      margin-left:0.3rem;
      margin-right:0.3rem;
      display:flex;
      justify-content: center;
      align-items: center;
      background-color: #EB4553;
      color:white;
      height:1rem;
      border-radius: 0.1rem;
      letter-spacing:0.05rem;
      .payment{
        margin-right:0.3rem;
      }
    }
  }
</style>
