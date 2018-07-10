<!--Created by hjx on 2018/7/9.-->
<template>
    <div class="wrapper-box">
      <div class="header">订单信息:</div>
      <div class="main-box">
        <div class="oil-type">{{this.gasModel}}</div>
        <div class="money">&yen;{{this.money}}</div>
      </div>
      <div class="discount-box">
        <div class="discount">优惠券</div>
        <div class="discount-txt"></div>
      </div>
      <div class="bill-box">
        <div class="bill-title">发票抬头</div>
        <div class="img-box">
          <div class="bill-txt">哈哈</div>
          <div class="arrow"></div>
        </div>
      </div>
      <div class="advertisement">
        <div class="content-left">
          <div class="huang-guan"><img></div>
          <div>会员价</div>
          <div>加油98折</div>
          <div>加入特权会员一年可省600元</div>
        </div>
        <div class="arrow"><img></div>
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
  /*.wrapper-box {*/
    /*background-color: #F5F5F5;*/
    /*padding-bottom: 3rem;*/
    /*min-height: 100vh;*/
    /*box-sizing: border-box;*/
    /*.header{*/
      /*background-color: #F5F5F5;*/
      /*font-size: 0.3rem;*/
      /*height: 0.8rem;*/
      /*line-height: 0.8rem;*/
      /*padding-left:0.3rem;*/
      /*color:#262626;*/
    /*}*/
  /*}*/
</style>
