<!--Created by hjx on 2018/7/9.-->
<template>
    <div class="wrapper-box">
      <div class="header">订单信息:</div>
      <div class="main-box">
        <div class="oil-type">{{gasModel}}#</div>
        <div class="money">&yen;{{money}}</div>
      </div>
      <div class="discount-box">
        <div class="discount">优惠券</div>
        <div class="discount-txt">{{discountMoney}}</div>
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
        <div class="payment">去支付&yen;{{money-discountMoney}}</div>
        <div class="save">(已节省&yen;{{discountMoney}})</div>
      </div>
      <div class="modal-box" v-if="invoice">
        <div class="message-box" v-if="addInvoiceHead">
          <div class="add-bill">
            <div>添加发票抬头</div>
            <div class="img-box" @click="closeHead()"><img src="../assets/ios-close-outline.png"></div>
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
          <div class="close" @click="closeHead">关闭</div>
        </div>
        <div class="invoice-box" v-if="!addInvoiceHead">
          <div class="select-head">
            <div>请选择发票抬头</div>
            <div class="img-box" @click="closeInvoice()"><img src="../assets/ios-close-outline.png"></div>
          </div>
          <div class="invoiceInfo">
            <div class="content-left">
              <div class="select"><img src="../assets/Checked_on.png"></div>
              <div>
                <div>哈哈啊</div>
                <div>1234567</div>
              </div>
            </div>
            <div class="content-right">
              <div class="default-box">
                <div class="img-box"><img src="../assets/check.png"></div>
                <div class="txt">默认使用</div>
              </div>
              <div class="modify">
                <div class="edit">编辑</div>
                <div class="delete">删除</div>
              </div>
            </div>
          </div>
          <div class="noInvoice">
            <div class="img-box"><img src="../assets/check_normal.png"></div>
            <div>不开发票</div>
          </div>
          <div class="footer">
            <div class="invoice" @click="addHead()">
              <div class="img-box"><img src="../assets/add_invoice.png"></div>
              <div>添加发票抬头</div>
            </div>
          </div>

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
      addInvoiceHead: false,
      invoiceHead: '',
      taxNumber: '',
      discount: '',
      couponsArr: [],
      coupon: '',
      discountMoney: 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.gasModel = this.$route.params.gasModel
      this.money = this.$route.params.money
      this.getCoupons()
    })
  },
  methods: {
    addInvoice () {
      this.invoice = true
    },
    closeInvoice () {
      this.invoice = false
    },
    closeHead () {
      this.addInvoiceHead = false
    },
    getCouponsData () {
      return this.$ajax.get('https://dsn.apizza.net/mock/fb275314bc53ebc54f45a6b698d2433d/coupon_invoice')
    },
    getCoupons () {
      this.$ajax.all([this.getCouponsData()])
        .then((res) => {
          console.log(this)
          let arr = res[0].data.coupon
          this.couponsArr = res[0].data.coupon
          console.log('this.couponsArr', this.couponsArr)
          for (var i = 0; i < arr.length; i++) {
            let timeFlag = this.isInAvailableTime(arr[i].start_time, arr[i].end_time)
            if (!timeFlag) {
              continue
            }
            let tempDiscountMoney = 0
            if (this.money >= arr[i].threshold) {
              if (arr[i].type === 1) {
                tempDiscountMoney = arr[i].amount
              } else {
                tempDiscountMoney = Math.min(this.money * (100 - arr[i].ratio * 10) / 100, arr[i].max_discount)
              }
            }
            if (tempDiscountMoney > this.discountMoney) {
              this.discountMoney = tempDiscountMoney
            }
          }
          if (this.discountMoney === 0) {
            this.discountMoney = '暂无可用红包'
          }
        })
    },
    // getCoupons1 () {
    //   var that = this
    //   this.$ajax.all([this.getCouponsData()])
    //     .then(function (res) {
    //       console.log(this)
    // }ES5的方法，外面的this和里面的this不是同一个。
    isInAvailableTime (sTime, eTime) {
      var timestamp = (Date.parse(new Date())) / 1000
      var startTime = (Date.parse(sTime)) / 1000
      var endTime = (Date.parse(eTime)) / 1000
      if (timestamp >= startTime && timestamp <= endTime) {
        return true
      } else {
        return false
      }
    },
    addHead () {
      this.addInvoiceHead = true
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
      background-color:rgba(0,0,0,.4);
      z-index: 99;
      padding:0.28rem 0.18rem;
      .message-box{
        /*position: absolute;*/
        /*top: 0.28rem;*/
        /*bottom: 0.28rem;*/
        /*left: 0.18rem;*/
        /*right: 0.18rem;*/
        background-color: #F5F5F5;
        height:100%;
        .add-bill{
          display:flex;
          justify-content:space-between;
          align-items:center;
          height:0.8rem;
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
      .invoice-box{
        /*position: absolute;*/
        /*top: 0.3rem;*/
        /*bottom: 0.3rem;*/
        /*left: 0.2rem;*/
        /*right: 0.2rem;*/
        height:100%;
        background-color: #F5F5F5;
        .select-head{
          display:flex;
          justify-content:space-between;
          align-items:center;
          height:0.8rem;
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
        .invoiceInfo{
          height:1.4rem;
          display:flex;
          justify-content: space-between;
          align-items: center;
          background-color: white;
          .content-left{
            margin-left:0.2rem;
            display: flex;
            align-items: center;
            .select{
              height:0.4rem;
              margin-right: 0.22rem;
              >img{
                height:0.4rem;
              }
            }
          }
          .content-right{
            display: flex;
            margin-right: 0.28rem;
            flex-direction: column;
            justify-content: center;
            color:#979797;
            .default-box{
              display: flex;
              justify-content: space-between;
              .img-box{
                margin-right: 0.2rem;
                >img{
                  width: 0.26rem;
                }
              }
            }
            .modify{
              display:flex;
              margin-top:0.1rem;
              >div{
                padding:0.08rem 0.12rem;
                border:0.01rem solid #979797;
                border-radius: 0.1rem;
              }
              .edit{
                margin-right: 0.12rem;
              }
          }
          }

        }
        .noInvoice{
          margin-top:0.2rem;
          background-color: #ffffff;
          display:flex;
          align-items: center;
          height:1.4rem;
          .img-box{
            height:0.4rem;
            margin-right: 0.22rem;
            margin-left:0.2rem;
            >img{
              height:0.4rem;
            }
          }
        }
        .footer{
          position:absolute;
          background-color: white;
          left:0.18rem;
          right:0.18rem;
          bottom:0.28rem;
          height: 1.3rem;
          .invoice{
            margin-left:0.3rem;
            margin-right:0.3rem;
            height:0.88rem;
            background-color: #ea4652;
            margin-top:0.2rem;
            border-radius: 0.1rem;
            /*position: absolute;*/
            /*top: 50%;*/
            /*left: 50%;*/
            /*transform: translate(-50%, -50%);*/
            display:flex;
            justify-content: center;
            align-items: center;
            .img-box{
              >img{
                height:0.42rem;
              }
            }
          }
        }
      }
    }
  }
</style>
