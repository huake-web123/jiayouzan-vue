<!--Created by hjx on 2018/6/22.-->
<template>
    <div class="wrapper-box">
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
      <div class="add-car">添加我的爱车</div>
      <div class="membership-box">
        <div class="img-box">vip</div>
        <div class="member-discription">
          <div class="card">特权会员卡</div>
          <div class="discount">全年八折停车，98折加油，共享汽车服务会员价</div>
        </div>
        <div cladd="more">jian</div>
      </div>
      <div class="invite-box menu">
          <div class="img-box">
            <div class="img">tupian</div>
            <div class="img-txt">邀请好友赢大礼</div>
          </div>
          <div class="more">jiantou</div>
        </div>
      <div class="my-order menu">
        <div class="img-box">
          <div class="img">tupian</div>
          <div class="img-txt">我的订单</div>
        </div>
        <div class="more">jiantou</div>
      </div>
      <div class="goods-order menu">
        <div class="img-box">
          <div class="img">tupian</div>
          <div class="img-txt">商品订单</div>
        </div>
        <div class="more">jiantou</div>
      </div>
      <div class="coupon menu">
        <div class="img-box">
          <div class="img">tupian</div>
          <div class="img-txt">我的优惠券</div>
        </div>
        <div class="more">jiantou</div>
      </div>
      <div class="my-colletion menu">
        <div class="img-box">
          <div class="img">tupian</div>
          <div class="img-txt">我的收藏</div>
        </div>
        <div class="more">jiantou</div>
      </div>
      <div class="bind-cellphone menu">
        <div class="img-box">
          <div class="img">tupian</div>
          <div class="img-txt">绑定手机号</div>
        </div>
        <div class="more">jiantou</div>
      </div>
    </div>
</template>

<script>
export default {
  name: ''
}
</script>

<style lang="less" scoped>
.wrapper-box{
  background-color: #F5F5F5;
  min-height: 100vh;
  box-sizing: border-box;
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
      >div{
        display:flex;
        flex-direction: column;
        align-items: center;
      }
      .add-txt{
        font-size:0.28rem;
        margin-top:0.15rem;
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
  .add-car{
    background-color: white;
    width:90%;
    height:1.5rem;
    line-height: 1.5rem;
    position:relative;
    top:-0.5rem;
    left:0.35rem;
  }
  .membership-box{
    background-color: white;
    height:1.6rem;
    display:flex;
    justify-content: space-around;
    align-items: center;
    .member-discription{
     .card{
       font-size:0.26rem;
     }
      .discount{
        font-size:0.2rem;
        color:#878787;
        margin-top:0.2rem;
      }
    }
  }
  .menu{
    height:0.8rem;
    display:flex;
    justify-content: space-between;
    background-color: white;
    margin-top:0.03rem;
  }
}
</style>
