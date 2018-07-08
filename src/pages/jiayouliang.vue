<!--Created by hjx on 2018/7/4.-->
<template>
    <div class="wrapper-box">
      <div class="current-station">你当前在：{{stationName}}</div>
      <div class="oil-gun">
        <span>油枪</span>
        <input v-model="oilGun" placeholder="请输入油枪号">
      </div>
      <div class="money-box">
        <span>金额</span>
        <input v-model="money" placeholder="最大999">
      </div>
      <!--ctrl+Y删除当前行，ctrl+F查找代码-->
      <div class="money-type">
        <div class="amount">100元</div>
        <div class="amount">200元</div>
        <div class="amount">300元</div>
        <div class="amount">400元</div>
      </div>
      <div class="confirm">确认订单</div>
    </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      stationId: '',
      stationName: '',
      oilGun: '',
      money: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.stationId = this.$route.params.id
      this.getStationDetails()
    })
  },
  methods: {
    loadStation () {
      return this.$ajax.get('https://dsn.apizza.net/mock/fb275314bc53ebc54f45a6b698d2433d/station_info/' + this.stationId)
    },
    getStationDetails () {
      this.$ajax.all([this.loadStation()])
        .then((res) => {
          this.stationName = res[0].data.data.name
        })
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper-box {
  background-color: #F5F5F5;
  padding-bottom:3rem;
  min-height: 100vh;
  box-sizing: border-box;
  .current-station {
    background-color: #F5F5F5;
    font-size: 0.3rem;
    height: 0.8rem;
    line-height: 0.8rem;
    padding-left:0.3rem;
    color:#262626;
  }
  .oil-gun {
    background-color: white;
    height: 1.05rem;
    diaplay: flex;
    >span{
      margin-left:0.3rem;
      color:#010101;
    }
    > input {
      height: 1.05rem;
      margin-left: 0.5rem;
      border:none;
      outline: none;
      padding:0;
    }
  }
  .money-box {
    background-color: white;
    height: 1.05rem;
    diaplay: flex;
    margin-top:0.05rem;
    >span{
      margin-left:0.3rem;
      color:#010101;
    }
    > input {
      height: 1.05rem;
      margin-left: 0.5rem;
      border:none;
      outline: none;
      /*去掉点击时的黄色边框*/
      padding:0;
    }
  }
  .money-type{
    height:0.6rem;
    line-height:0.6rem;
    margin:0.4rem 0.3rem 0.2rem 0.3rem;
    /*margin:上 右 下 左*/
    display:flex;
    justify-content:space-between;
    .amount{
      background-color:white;
      width:1.5rem;
      text-align: center;
    }
  }
  .confirm{
    background-color: #8A8A8A;
    height:0.88rem;
    margin-top:0.4rem;
    text-align: center;
    color:white;
    line-height: 0.88rem;
    margin-left:0.3rem;
    margin-right:0.3rem;
    border-radius:0.1rem;
  }
}
</style>
