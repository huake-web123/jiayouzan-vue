<template>
 <div class="page">
     <div class="head">订单详情</div>
     <div class="content">
         <div class="left-content">验证码：</div>
         <div class="right-content">{{orderArr.code}}</div>
     </div>
     <div class="content">
         <div class="left-content">加油站名称：</div>
         <div class="right-content">{{orderArr.station_name}}</div>
     </div>
     <div class="content">
         <div class="left-content">商品名称：</div>
         <div class="right-content">{{orderArr.gas_gun}}号枪-{{orderArr.gas_no}}#，挂牌价：{{orderArr.price}}元</div>
     </div>
     <div class="content">
         <div class="left-content">实付金额：</div>
         <div class="right-content">{{orderArr.pay_amount}}元&nbsp;（节省{{orderArr.discount_amount}}元）</div>
     </div>
     <div class="content">
         <div class="left-content">发票抬头：</div>
         <div class="right-content">{{orderArr.invoice_name}}</div>
     </div>
     <div class="content">
         <div class="left-content">统一社会信用码：</div>
         <div class="right-content">{{orderArr.invoice_no}}</div>
     </div>
 </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  data () {
    return {
      stationName: '',
      orderId: '',
      orderArr: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.orderId = this.$route.params.id
      this.getDetails()
    })
  },
  methods: {
    getDetails () {
      this.$ajax({
        method: 'get',
        url: 'https://dsn.apizza.net/mock/fb275314bc53ebc54f45a6b698d2433d/order_detail/' + this.orderId
      }).then((res) => {
        this.orderArr = res.data.data
        // console.log(this.orderArr)
      })
    }
  }
}
</script>

<style scoped lang="less">
.page{
    background-color:#F5F5F5;
    min-height: 100vh;
    .head{
        height: 0.8rem;
        line-height: 0.8rem;
        margin-left: 0.3rem;
    }
    .content{
        height: 0.8rem;
        line-height: 0.8rem;
        background-color: white;
        display: flex;
        justify-content: space-between;
        margin-top:0.025rem;
        font-size: 0.3rem;
        .left-content{
            margin-left: 0.3rem;
        }
        .right-content{
            margin-right: 0.3rem;
            color: #8A8A8A;
        }
    }
}
</style>
