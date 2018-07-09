<!--Created by hjx on 2018/7/4.-->
<template>
    <div class="wrapper-box">
      <div class="current-station">你当前在：{{stationName}}</div>
      <div class="oil-gun">
        <span>油枪</span>
        <!--type="number"控制手机在使用input输入时弹出数字键盘-->
        <input type="number" pattern="\d*" v-model="oilGun" placeholder="请输入油枪号">
        <!--动态绑定class-->
        <div :class="{gastxt: gasModel=='油枪错误'}">{{ gasModel}}</div>
      </div>
      <div class="money-box">
        <span>金额</span>
        <!--判断是双等号，一个等号是赋值，还有变量选gasModel，而不是oilGun.-->
        <input type="number" v-model="money" placeholder="最大999" :disabled="gasModel==''||gasModel=='油枪错误'">
        <div>{{oilAmount}}</div>
      </div>
      <!--ctrl+Y删除当前行，ctrl+F查找代码-->
      <div class="money-type" v-if="gasModel!==''&gasModel!=='油枪错误'">
        <!--关于数据当前index与数组里面所有数据index的匹配思想，如果不用index将会全部加上相同class-->
        <div class="amount" v-for="(item, index) in moneyArr" :class='{selected:selectMoneyIndex == index}' @click="changeMoney(item, index)" >{{item}}元</div>
      </div>
      <div class="order" :class="{confirm:gasModel!==''&&oilAmount!==''}">确认订单</div>
    </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      stationId: '',
      stationName: '',
      gasModel: '',
      gasPrice: '',
      oilGun: '',
      money: '',
      gunArr: '',
      oilAmount: '',
      moneyArr: [100, 200, 300, 400],
      selectMoney: false,
      selectMoneyIndex: -1
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.stationId = this.$route.params.id
      this.getStationDetails()
    })
  },
  watch: {
    oilGun (newOilGun, oldOilGun) {
      for (var i = 0; i < this.gunArr.length; i++) {
        if (Number(newOilGun) === this.gunArr[i].id) {
          this.gasModel = this.gunArr[i].gas_no
          this.gasPrice = this.gunArr[i].price
          break
        } else {
          this.gasModel = '油枪错误'
          this.gasPrice = ''
        }
      }
    },
    money (newValue, oldValue) {
      newValue = Number(newValue) //  ===  判断包括 类型的判断，所以要将input的值转换成数值
      // 将选中值比如400元样式取消
      for (var i = 0; i < this.moneyArr.length; i++) {
        if (newValue === this.moneyArr[i]) {
          this.selectMoneyIndex = i
          break
        } else {
          this.selectMoneyIndex = -1
        }
      }
      if (newValue !== '') {
        this.oilAmount = (newValue / this.gasPrice).toFixed(2) + 'L'
      } else {
        this.oilAmount = ''
      }
    }
  },
  methods: {
    loadStation () {
      return this.$ajax.get('https://dsn.apizza.net/mock/fb275314bc53ebc54f45a6b698d2433d/station_info/' + this.stationId)
    },
    getStationDetails () {
      this.$ajax.all([this.loadStation()])
        .then((res) => {
          this.stationName = res[0].data.data.name
          this.gunArr = res[0].data.data.gun_arr
        })
    },
    changeMoney (value, index) {
      this.money = value
      // this.selectMoneyIndex = index
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
    display: flex;
    align-items: center;
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
      flex:1;
      /*占据剩余空间*/
      font-size:0.3rem;
    }
    >div{
      padding-right:0.5rem;
      width:1.4rem;
      text-align:right;
      /*width:1.4rem;*/
      /*text-align: center;*/
      &.gastxt{
        color:red;
      }
    }
  }
  .money-box {
    background-color: white;
    height: 1.05rem;
    display: flex;
    align-items: center;
    margin-top:0.05rem;
    >span{
      margin-left:0.3rem;
      color:#010101;
    }
    > input {
      height: 1.05rem;
      margin-left: 0.5rem;
      background-color:white;
      border:none;
      outline: none;
      /*去掉点击时的黄色边框*/
      padding:0;
      flex:1;
      font-size:0.3rem;
    }
    >div{
      padding-right:0.5rem;
      width:1.4rem;
      text-align:right;
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
      background-color:#ffffff;
      width:1.5rem;
      text-align: center;
      border-radius: 5px;
      font-size:0.28rem;
      &.selected{
        background-color:#eb4553;
        color:white;
      }
    }
  }
  .order{
    background-color: #8A8A8A;
    height:0.88rem;
    margin-top:0.4rem;
    text-align: center;
    color:white;
    line-height: 0.88rem;
    margin-left:0.3rem;
    margin-right:0.3rem;
    border-radius:0.1rem;
    &.confirm{
      background-color:#eb4553;
      color:white
    }
  }
}
</style>
