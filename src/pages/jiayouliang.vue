<!--Created by hjx on 2018/7/4.-->
<template>
    <div class="wrapper-box">
      <div class="current-station">你当前处在{{stationId}}</div>
      <div class="oil-gun">
        <span>油枪</span>
        <input v-model="oilGun" placeholder="请输入油枪号">
      </div>
      <div class="money-box">
        <span>金额</span>
        <input v-model="money" placeholder="最大999">
      </div>
      <!--ctrl+Y删除当前行，ctrl+F查找代码-->
      <div class="confirm">确认订单</div>
    </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      stationId: '',
      oilGun: '',
      money: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.stationId = this.$route.params.id
    })
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
    font-size: 0.38rem;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
  }
  .oil-gun {
    background-color: white;
    height: 1.2rem;
    diaplay: flex;
    > input {
      height: 1.2rem;
      margin-left: 0.3rem;
      border:0;
    }
  }
  .money-box {
    background-color: white;
    height: 1.2rem;
    diaplay: flex;
    margin-top:0.05rem;
    > input {
      height: 1.2rem;
      margin-left: 0.3rem;
      border:0;
    }
  }
  .confirm{
    background-color: #8A8A8A;
    height:1.2rem;
    margin-top:0.5rem;
    text-align: center;
    color:white;
    line-height: 1.2rem;
    margin-left:0.3rem;
    margin-right:0.3rem;
  }
}
</style>
