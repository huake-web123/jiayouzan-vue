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
      <div class="bill-box" @click="addInvoice">
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
      <div class="modal-box" v-if="invoice">
        <div class="message-box">
          <div class="add-bill">
            <div>添加发票抬头</div>
            <div class="img-box"><img src="../assets/ios-close-outline.png"></div>
          </div>
          <div class="head-type">
            <div>抬头类型</div>
            <div class="select">
              <div>个人</div>
              <div>单位</div>
            </div>
          </div>
          <div class="head-box">
            <div class="head-txt">发票抬头</div>
            <input v-model="invoiceHead">
          </div>
          <div class="tax-box">
            <div class="head-txt">税号</div>
            <input v-model="taxNumber">
          </div>
          <div class="save">保存</div>
          <div class="close" @click="closeInvocie">关闭</div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      gasModel: '',
      money: '',
      invoice: false,
      invoiceHead: '',
      taxNumber: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.gasModel = this.$route.params.gasModel
      this.money = this.$route.params.money
    })
  },
  methods: {
    addInvoice () {
      this.invoice = true
    },
    closeInvocie () {
      this.invoice = false
    }
  }
}
</script>

<style lang="less" scoped>
  .wrapper-box {
    background-color: #F5F5F5;
    padding-bottom: 3rem;
    min-height: 100vh;
    box-sizing: border-box;
    .header {
      background-color: #F5F5F5;
      font-size: 0.3rem;
      height: 0.8rem;
      line-height: 0.8rem;
      padding-left: 0.3rem;
      color: #262626;
    }
    .main-box {
      display: flex;
      justify-content: space-between;
      background-color: white;
      height: 1rem;
      align-items: center;
      padding-left: 0.3rem;
      padding-right: 0.3rem;
      .money {
        color: #8B8B8B;
      }
    }
    .discount-box {
      margin-top: 0.2rem;
      display: flex;
      justify-content: space-between;
      background-color: white;
      height: 1rem;
      align-items: center;
      padding-left: 0.3rem;
      padding-right: 0.3rem;
      .discount-txt {
        color: #8B8B8B;
      }
    }
    .bill-box {
      margin-top: 0.05rem;
      display: flex;
      justify-content: space-between;
      background-color: white;
      height: 1rem;
      align-items: center;
      padding-left: 0.3rem;
      padding-right: 0.3rem;
      .img-box {
        display: flex;
        align-items: center;
        .bill-txt {
          color: #8B8B8B;
          font-size: 0.3rem;
        }
        .arrow {
          display: flex;
          > img {
            height: 0.42rem;
          }
        }
      }
    }
    .advertisement {
      margin-top: 0.05rem;
      display: flex;
      justify-content: space-between;
      background-color: white;
      height: 1rem;
      align-items: center;
      padding-left: 0.3rem;
      padding-right: 0.3rem;
      font-size: 0.28rem;
      .content-left {
        display: flex;
        align-items: center;
        .huang-guan {
          img {
            width: 0.5rem;
          }
        }
        .discount-price {
          color: #EB4553;
        }
      }
      .arrow {
        display: flex;
        > img {
          height: 0.42rem;
        }
      }
    }
    .pay-box {
      margin-top: 0.3rem;
      margin-left: 0.3rem;
      margin-right: 0.3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #EB4553;
      color: white;
      height: 1rem;
      border-radius: 0.1rem;
      letter-spacing: 0.05rem;
      .payment {
        margin-right: 0.3rem;
      }
    }
    .modal-box {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: #7B7B7B;
      z-index: 99;
      .message-box {
        position: absolute;
        top: 0.3rem;
        bottom: 0.3rem;
        left: 0.2rem;
        right: 0.2rem;
        background-color: #F5F5F5;
        .add-bill{
          display:flex;
          justify-content:space-between;
          align-items:center;
          height:0.88rem;
          padding-left:0.3rem;
          .img-box{
            margin-right:0.25rem;
            float:right;
            >img{
              width:0.46rem;
              height:0.46rem;
            }
          }
        }
        .head-type{
          height:1rem;
          display:flex;
          justify-content:space-between;
          align-items:center;
          background-color: white;
          padding-left:0.3rem;
          .select{
            display:flex;
          }
        }
        .head-box{
          height:1rem;
          display:flex;
          justify-content:space-between;
          align-items:center;
          background-color: white;
          margin-top:0.05rem;
          padding-left:0.3rem;
          > input {
            height: 1.05rem;
            margin-left: 0.5rem;
            border:none;
            outline: none;
            padding:0;
            flex:1;
            /*占据剩余空间*/
          }
        }
        .tax-box{
          height:1rem;
          display:flex;
          justify-content:space-between;
          align-items:center;
          background-color: white;
          margin-top:0.05rem;
          padding-left:0.3rem;
          > input {
            height: 1.05rem;
            margin-left: 0.5rem;
            border:none;
            outline: none;
            padding:0;
            flex:1;
            /*占据剩余空间*/
          }
        }
        .save{
          margin-top:0.4rem;
          margin-left:0.3rem;
          margin-right:0.3rem;
          background-color: #8A8A8A;
          height:1rem;
          line-height: 1rem;
          border-radius: 0.1rem;
          text-align: center;
          color:white;
        }
        .close{
          margin-top:0.2rem;
          margin-left:0.3rem;
          margin-right:0.3rem;
          background-color: #F5F5F5;
          height:1rem;
          line-height: 1rem;
          border-radius: 0.1rem;
          text-align: center;
          border:0.01rem solid #8A8A8A;
          color:#8A8A8A;
        }
      }
    }
  }
</style>
