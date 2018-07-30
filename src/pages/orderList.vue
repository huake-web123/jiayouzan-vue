<!--Created by hjx on 2018/7/24.-->
<template>
    <div class="wrapper-box">
      <div class="header">
        <div class="selected">全部</div>
        <div>待付款</div>
        <div>待使用</div>
        <div>退款中</div>
      </div>
      <div class="order-list">
        <div class="main-content" v-for="item in orderArr" :key="item.id">
          <div class="gas-station">
            <div class="station-box">
              <div class="img-box"><img src="../assets/gas_station.png"></div>
              <div class="station-name">{{item.station_info.name}}</div>
            </div>
            <div class="state">已完成</div>
          </div>
          <div class="oil-box">
            <div class="oil-gun"><img src="../assets/oil_gun.png"></div>
            <div>{{item.gun_id}}号油枪 - {{item.gas_no}}#</div>
          </div>
          <div class="pay-box">
            <span>实付：</span>
            <span class="money">&yen;{{item.amount}}</span>
            <a :href="getHref(item.id)">查看详情</a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: '',
  data  () {
    return {
      page: 1,
      orderArr: '',
      orderId: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.loadOrderData()
    })
  },
  methods: {
    loadOrder () {
      return this.$ajax.get('https://dsn.apizza.net/mock/fb275314bc53ebc54f45a6b698d2433d/order_list/' + this.page + '/10')
    },
    loadOrderData () {
      this.$ajax.all([this.loadOrder()])
        .then((res) => {
          console.log(res[0].data.order_list)
          this.orderArr = res[0].data.order_list
        })
    },
    getHref (orderId) {
      return '#/orderdetails/' + orderId
    }
  }
}
</script>
<style lang="less" scoped>
  .wrapper-box{
    background-color: #F5F5F5;
    min-height: 100vh;
    padding-bottom: 2rem;
    box-sizing: border-box;
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
          a{
            float: right;
          }
        }
      }
    }

  }
</style>
