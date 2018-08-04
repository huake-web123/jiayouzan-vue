<!--Created by hjx on 2018/7/9.-->
<template>
    <div class="wrapper-box">
      <div class="header">订单信息:</div>
      <div class="main-box">
        <div class="oil-type">{{gasModel}}#</div>
        <div class="money">&yen;{{money}}</div>
      </div>
      <div class="discount-box" @click="selectCounpon()">
        <div class="discount">优惠券</div>
        <div class="discount-txt">&yen;{{discountMoney}}</div>
      </div>
      <div class="bill-box" @click="addInvoice()">
        <div class="bill-title">发票抬头</div>
        <div class="img-box">
          <div class="bill-txt">{{invoiceName}}</div>
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
      <div class="pay-box" @click="toPay()">
        <div class="payment">去支付&yen;{{money-discountMoney}}</div>
        <div class="save">(已节省&yen;{{discountMoney}})</div>
      </div>
      <div class="coupon-box" v-if="isCounpon">
        <div class="main">
          <div class="head-title">
            <div class="txt">请选择优惠券</div>
            <div class="img-box" @click="closeCoupon()"><img src="../assets/ios-close-outline.png"></div>
          </div>
          <div class="coupon" v-for="(item,index) in couponsArr"
               :key="item.id"
               v-if="isAvaliableFlag(item)"
               @click="getCouponIndex(item,index)">
            <div class="content-left">
              <div class="img-box" :class='{selected:couponIndex == index}'></div>
              <div class="main-content">
                <div class="discount">
                  <span class="num">{{item | itemFilters}}</span>
                  <span class="txt">{{item.type | itemUnitFilters}}</span>
                  <span class="area">(武汉市)</span>
                </div>
                <div class="time-box">
                  <div class="valid">有效时间：</div>
                  <div class="time">{{item.start_time | timeFilters}}&nbsp;—&nbsp;{{item.end_time | timeFilters}}</div>
                </div>
                <div class="min-amount">满{{item.threshold}}元可用</div>
              </div>
              </div>
            <div class="content-right">{{item.type | typeFilters}}</div>
          </div>
        </div>
      </div>
      <div class="modal-box" v-if="invoice">
        <div class="message-box" v-if="addInvoiceHead">
          <div class="add-bill">
            <!-- <div v-if="editHead">编辑发票抬头</div> -->
            <div>添加发票抬头</div>
            <div class="img-box" @click="closeHead()"><img src="../assets/ios-close-outline.png"></div>
          </div>
          <div class="head-type">
            <div>抬头类型</div>
            <div class="select">
              <div @click="getType1()" :class="{selected:headType == 1}">个人</div>
              <div @click="getType2()" :class="{selected:headType == 2}">单位</div>
            </div>
          </div>
          <div class="head-box">
            <div class="head-txt">发票抬头</div>
            <input v-model="invoiceHead">
          </div>
          <div class="tax-box">
            <div class="tax-txt">税号</div>
            <input v-model="taxNumber">
          </div>
          <div class="save" :class="{preserve:invoiceHead!==''&&taxNumber!==''}" @click="saveInvoice()">保存</div>
          <div class="close" @click="closeHead">关闭</div>
        </div>
        <div class="message-box" v-if="editHead">
          <div class="add-bill">
            <!-- <div v-if="editHead">编辑发票抬头</div> -->
            <div>编辑发票抬头</div>
            <div class="img-box" @click="closeHead()"><img src="../assets/ios-close-outline.png"></div>
          </div>
          <div class="head-type">
            <div>抬头类型</div>
            <div class="select">
              <div @click="getInvoiceType1()" :class="{selected:invoiceType == 1}">个人</div>
              <div @click="getInvoiceType2()" :class="{selected:invoiceType == 2}">单位</div>
            </div>
          </div>
          <div class="head-box">
            <div class="head-txt">发票抬头</div>
            <input v-model="invoiceHeadEdit">
          </div>
          <div class="tax-box">
            <div class="tax-txt">税号</div>
            <input v-model="taxNumberEdit">
          </div>
          <div class="save" :class="{preserve:invoiceHead!==''&&taxNumber!==''}" @click="editInvoice()">保存</div>
          <div class="close" @click="closeHead">关闭</div>
        </div>
        <div class="invoice-box" v-if="invoiceList">
          <div class="select-head">
            <div>请选择发票抬头</div>
            <div class="img-box" @click="closeInvoice()"><img src="../assets/ios-close-outline.png"></div>
          </div>
          <div class="scroll">
            <div class="invoiceInfo" v-for="(item,index) in invoiceArr" v-bind:key="item.id">
              <div class="left"  v-on:click="getIndex(item,index)">
                <div class="img-box" :class='{selected:invoiceIndex == index}'></div>
                <div>
                  <div>{{item.name}}</div>
                  <div class="number">{{item.invoice_no}}</div>
                </div>
              </div>
              <div class="right" v-if="item.id !== 0">
                <div class="default-box" @click="changeDefault(item,index)">
                  <div class="img-box" :class='{selected:item.is_default}'></div>
                  <div class="txt">默认使用</div>
                </div>
                <div class="modify">
                  <div class="edit" @click="editItem(item ,index)">编辑</div>
                  <div class="delete" @click="deleteItem(index)">删除</div>
                </div>
              </div>
            </div>
          </div>
          <!--<div class="noInvoice">-->
            <!--<div class="img-box"><img src="../assets/check_normal.png"></div>-->
            <!--<div>不开发票</div>-->
          <!--</div>-->
          <div class="footer">
            <div class="invoice" @click="addHead()">
              <div class="img-box"><img src="../assets/add_invoice.png"></div>
              <div class="add-txt">添加发票抬头</div>
            </div>
          </div>

        </div>
      </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: '',
  data () {
    return {
      gasModel: '',
      money: '',
      invoice: false,
      addInvoiceHead: false,
      invoiceHead: '',
      invoiceId: '',
      taxNumber: '',
      discount: '',
      couponsArr: [],
      invoiceArr: [],
      headType: 2,
      coupon: '',
      couponIndex: -1,
      isCounpon: false,
      discountMoney: 0,
      discountCouponId: 0,
      invoiceIndex: 0,
      invoiceName: '',
      editHead: false,
      invoiceList: true,
      invoiceIdEdit: '',
      isDefault: '',
      invoiceType: '',
      currentIndex: ''
      // time: ''
    }
  },
  filters: {
    typeFilters (type) {
      let str = ''
      switch (type) {
        case 1:
          str = '满减券'
          break
        case 2:
          str = '折扣券'
          break
      }
      return str
    },
    timeFilters (time) {
      time = time.split(' ')[0]
      return time
    },
    itemFilters (value) {
      if (value.type === 1) {
        return value.amount
      } else {
        return value.ratio
      }
    },
    itemUnitFilters (value) {
      if (value === 1) {
        return '元'
      } else {
        return '折'
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.gasModel = this.$route.params.gasModel
      this.money = this.$route.params.money
      this.stationId = this.$route.params.id
      this.oilGun = this.$route.params.gas_gun
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
      this.invoiceList = true
      this.editHead = false
    },
    addHead () {
      this.addInvoiceHead = true
      this.invoiceList = false
    },
    selectCounpon () {
      this.isCounpon = true
    },
    closeCoupon () {
      this.isCounpon = false
    },
    getCouponsData () {
      return this.$ajax.get('https://dsn.apizza.net/mock/fb275314bc53ebc54f45a6b698d2433d/coupon_invoice')
    },
    getCoupons () {
      this.$ajax.all([this.getCouponsData()])
        .then((res) => {
          console.log(this)
          this.couponsArr = res[0].data.coupon
          console.log('this.couponsArr', this.couponsArr)
          this.invoiceArr = res[0].data.invoice
          this.invoiceName = this.invoiceArr[0].name
          this.invoiceArr.push({'id': 0, 'name': '不开发票', 'invoice_no': ''})
          this.calcDiscount()
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
    /*
    *  比较得到最优优惠券
    * */
    calcDiscount () {
      let arr = this.couponsArr
      for (var i = 0; i < arr.length; i++) {
        let timeFlag = this.isInAvailableTime(arr[i].start_time, arr[i].end_time)
        if (!timeFlag) {
          continue
        }
        let tempDiscountMoney = 0
        let tempId = 0
        let tempIndex = -1
        if (this.money >= arr[i].threshold) {
          tempId = arr[i].id
          tempIndex = i
          if (arr[i].type === 1) {
            tempDiscountMoney = arr[i].amount
          } else {
            tempDiscountMoney = Math.min(this.money * (100 - arr[i].ratio * 10) / 100, arr[i].max_discount)
          }
        }
        if (tempDiscountMoney > this.discountMoney) {
          this.discountMoney = tempDiscountMoney
          this.discountCouponId = tempId
          this.couponIndex = tempIndex
        }
      }
      if (this.discountMoney === 0) {
        this.discountMoney = '暂无可用红包'
      }
    },
    getType1 () {
      this.headType = 1
    },
    getType2 () {
      this.headType = 2
    },
    getInvoiceType1 () {
      this.invoiceType = 1
    },
    getInvoiceType2 () {
      this.invoiceType = 2
    },
    getIndex (item, index) {
      this.invoiceIndex = index
      this.invoiceName = item.name
      this.invoiceId = item.id
    },
    changeDefault (item, index) {
      for (let i = 0; i < this.invoiceArr.length; i++) {
        this.invoiceArr[i].is_default = false
      }
      item.is_default = true
    },
    editItem (item, index) {
      this.addHead()
      this.invoiceType = item.type
      this.invoiceHeadEdit = item.name
      this.taxNumberEdit = item.invoice_no
      this.invoiceIdEdit = item.id
      this.isDefault = item.is_default
      this.currentIndex = index
      this.editHead = true
      this.invoiceList = false
      this.addInvoiceHead = false
    },
    deleteItem (index) {
      this.invoiceArr.splice(index, 1)
      alert('删除成功')
    },
    saveInvoice () {
      this.$ajax({
        method: 'post',
        url: 'https://dsn.apizza.net/mock/fb275314bc53ebc54f45a6b698d2433d/invoice/add',
        data: JSON.stringify({
          token: Cookies.get('token'),
          invoice_type: this.headType,
          invoice_name: this.invoiceHead,
          invoice_tax_no: this.taxNumber
        })
      }).then((res) => {
        console.log(res.data.data.id)
        if (res.data.data.id) {
          // unshift可以将数据加到数组第一项
          this.invoiceArr.unshift({
            id: res.data.data.id,
            type: this.headType,
            name: this.invoiceHead,
            invoice_no: this.taxNumber,
            is_default: false
          })
        }
      })
    },
    editInvoice () {
      this.$ajax({
        method: 'post',
        url: 'https://dsn.apizza.net/mock/fb275314bc53ebc54f45a6b698d2433d/invoice/edit/' + this.invoiceIdEdit,
        data: JSON.stringify({
          token: Cookies.get('token'),
          invoice_type: this.invoiceType,
          invoice_name: this.invoiceHeadEdit,
          invoice_tax_no: this.taxNumber,
          invoice_id: this.invoiceIdEdit,
          is_default: this.isDefault
        })
      }).then((res) => {
        console.log(res.data.data.msg)
        // 后台改数据和前端显示无关，前端必须自己修改数组
        this.invoiceArr[this.currentIndex].type = this.invoiceType
        this.invoiceArr[this.currentIndex].name = this.invoiceHeadEdit
        this.invoiceArr[this.currentIndex].invoice_no = this.taxNumberEdit
        this.invoiceArr[this.currentIndex].is_default = this.isDefault
        this.invoiceArr[this.currentIndex].type = this.invoiceType
      })
    },
    getCouponIndex (item, index) {
      let timeFlag = this.isInAvailableTime(item.start_time, item.end_time)
      if (timeFlag) {
        if (this.money >= item.threshold) {
          this.couponIndex = index
          if (item.type === 1) {
            this.discountMoney = item.amount
          } else {
            this.discountMoney = Math.min(this.money * (100 - item.ratio * 10) / 100, item.max_discount)
          }
        }
      } else {
        this.discountMoney = '暂无可用红包'
      }
    },
    isAvaliableFlag (item) {
      let timeFlag = this.isInAvailableTime(item.start_time, item.end_time)
      if (timeFlag && this.money >= item.threshold) {
        return true
      }
      return false
    },
    toPay () {
      this.$ajax({
        method: 'post',
        url: 'https://dsn.apizza.net/mock/fb275314bc53ebc54f45a6b698d2433d/order',
        data: JSON.stringify({
          token: Cookies.get('token'),
          amount: this.money,
          discount_amount: this.discountMoney,
          pay_amount: this.money - this.discountMoney,
          station_id: this.stationId,
          gas_gun: this.oilGun,
          gas_no: this.gasModel,
          coupon_id: this.discountCouponId,
          invoice_id: this.invoiceId
        })
      }).then((res) => {
        let orderId = res.data.order_info.order_id
        this.$router.push({path: '/orderdetails/' + orderId})
      })
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
            margin-right:0.3rem;
            >div{
              width: 1.04rem;
              height:0.6rem;
              line-height: 0.6rem;
              text-align: center;
              border:1px solid #979797;
              border-radius: 0.1rem;
              font-size: 0.28rem;
              color:#979797;
              margin-left:0.2rem;
            }
            .selected{
              background-color: #e54856;
              color: white;
            }
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
          .head-txt{
            width: 1.46rem;
          }
          > input {
            height: 1rem;
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
          .tax-txt{
            width: 1.46rem;
          }
          > input {
            height: 1rem;
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
          &.preserve{
            background-color:#eb4553;
            color:white;
          }
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
        .scroll{
          height:10.1rem;
          overflow: auto;
          .invoiceInfo{
            height:1.4rem;
            display:flex;
            justify-content: space-between;
            align-items: center;
            background-color: white;
            margin-bottom:0.05rem;
            .left{
              margin-left:0.2rem;
              display: flex;
              align-items: center;
              font-size: 0.3rem;
              .img-box{
                width: 0.4rem;
                height:0.4rem;
                margin-right: 0.22rem;
                background-image: url("../assets/check_normal.png");
                background-size: 0.4rem;
                &.selected{
                  background-image: url("../assets/Checked_on.png");
                  background-size: 0.4rem;
                }
              }
              .number{
                color:#979797;
                margin-top:0.2rem;
              }
            }
            .right{
              display: flex;
              margin-right: 0.28rem;
              flex-direction: column;
              justify-content: center;
              color:#979797;
              font-size:0.26rem;
              .default-box{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .img-box{
                  height: 0.26rem;
                  width: 0.26rem;
                  margin-right: 0.2rem;
                  background-image: url("../assets/un_check.png");
                  background-size: 0.26rem;
                  &.selected{
                    background-image: url("../assets/check.png");
                  }
                }
              }
              .modify{
                display:flex;
                margin-top:0.2rem;
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
            .add-txt{
              color:white;
              margin-left:0.18rem;
            }
            .img-box{
              height:0.42rem;
              >img{
                height:0.42rem;
              }
            }
          }
        }
      }
    }
    .coupon-box{
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color:rgba(0,0,0,.4);
      z-index: 99;
      padding:0.28rem 0.18rem;
      .main{
        background-color:#e6e6e6;
        height:100%;
        border-radius: 0.1rem;
        .head-title{
          display:flex;
          justify-content:space-between;
          align-items:center;
          height:0.8rem;
          padding-left:0.3rem;
          background-color:#F5F5F5;
          border-radius: 0.1rem;
          .img-box{
            margin-right:0.25rem;
            float:right;
            >img{
              width:0.46rem;
              height:0.46rem;
            }
          }
        }
        .coupon{
          height:2rem;
          background: url("../assets/coupon.png") no-repeat;
          margin-top:0.2rem;
          margin-left:0.2rem;
          margin-right: 0.2rem;
          background-size:cover;
          /*让背景图自适应*/
          display:flex;
          justify-content: space-between;
          /*用insert键可以改变鼠标光标状态*/
          .content-left{
            display: flex;
            .img-box{
              width: 0.4rem;
              height:0.4rem;
              margin-left:0.2rem;
              margin-top:0.2rem;
              background-image: url("../assets/check_normal.png");
              background-size: 0.4rem;
              &.selected{
                background-image: url("../assets/select_coupon.png");
                background-size: 0.4rem;
              }
            }
            .main-content{
              margin-left: 0.2rem;
              .discount{
                /*display: flex;*/
                .num{
                  color:#F99E47;
                  font-size:0.5rem;
                }
                .area{
                  margin-left: 0.2rem;
                  color:#F99E47;
                }
              }
              .time-box{
                font-size:0.16rem;
                .valid{
                  color: #B1B1B1;
                }
                .time{
                  color:#F99E47;
                }
              }
              .min-amount{
                font-size:0.16rem;
                margin-top:0.1rem;
                color: #B1B1B1;
              }
            }
          }

          .content-right{
            width: 1.4rem;
            height:0.6rem;
            line-height: 0.6rem;
            color:white;
            text-align: center;
            background-color: #F99E47;
            margin-top:0.2rem;
          }
        }
      }

    }
  }
</style>
