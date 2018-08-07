<template>
 <div class="page">
     <div class="mobile-box">
         <div class="left">
            <img src="../assets/mobile3.png">
            <input type="number" pattern="[0-9]*" v-model="phoneNumber" placeholder="请输入手机号">
         </div>
         <div v-show="codeShow" class='verification-code' :class="{selected:flag}" @click="getVerificationCode()">获取验证码</div>
         <div v-show="!codeShow" class='verification-code'>{{count}}s</div>
     </div>
     <div class="code-box">
         <img src="../assets/lock1.png">
         <input type="number" pattern="[0-9]*" v-model="verificationCode" placeholder="输入6位验证码" :disabled="!flag">
     </div>
     <div class="save-box" :class="{selected:flag && codeFlag}" @click="saveMobileNum()">保存</div>
 </div>
</template>

<script type="text/ecmascript-6">
import Cookies from 'js-cookie'
export default {
  name: '',
  data () {
    return {
      flag: '',
      codeFlag: '',
      phoneNumber: '',
      verificationCode: '',
      count: '',
      codeShow: true,
      timer: null
    }
  },
  components: {

  },
  watch: {
    phoneNumber (newValue, oldValue) {
      //  ===  判断包括 类型的判断，所以要将input的值转换成数值
      newValue = Number(newValue)
      //   <!-- 以1开头，11位手机号码验证 -->
      var reg = /^1[345789][0-9]{9}$/
      this.flag = reg.test(newValue)
    },
    verificationCode (newValue, oldValue) {
      newValue = Number(newValue)
      //   <!-- 判断六位数字 -->
      var reg = /^[0-9]{6}$/
      this.codeFlag = reg.test(newValue)
    }
  },
  methods: {
    getVerificationCode () {
      this.$ajax({
        method: 'post',
        url: 'https://dsn.apizza.net/mock/fb275314bc53ebc54f45a6b698d2433d/msg_code'
      }).then((res) => {
        // console.log(res.data.data.status)
        if (res.data.data.status) {
          alert('获取验证码成功！')
        } else {
          alert('获取验证码失败!')
        }
      })
      const TIME_COUNT = 59
      if (!this.timer) {
        this.count = TIME_COUNT
        this.codeShow = false
        // setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.codeShow = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    saveMobileNum () {
      this.$ajax({
        method: 'post',
        url: 'https://dsn.apizza.net/mock/fb275314bc53ebc54f45a6b698d2433d/bind_mobile',
        data: JSON.stringify({
          token: Cookies.get('token'),
          mobile: this.phoneNumber,
          code: this.verificationCode
        })
      }).then((res) => {
        console.log(res.data.data.status)
        if (res.data.data.status) {
          alert('绑定成功！')
        } else {
          alert('绑定失败！')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.page{
    background-color: #F5F5F5;
    min-height: 100vh;
    padding-top: 0.4rem;
    box-sizing: border-box;
    border: none;
    .mobile-box{
        height: 0.9rem;
        background-color: white;
        margin-left:0.3rem;
        margin-right: 0.3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 0.1rem;
        .left{
            display: flex;
            align-items: center;
            img{
                margin-left:0.2rem;
                height: 0.5rem;
                }
            input{
                border: none;
                outline: none;
                height: 0.6rem;
                margin-left: 0.35rem;
            }
        }
        .verification-code{
            margin-right: 0.1rem;
            height: 0.6rem;
            line-height: 0.6rem;
            width: 1.5rem;
            background-color: #8A8A8A;
            font-size: 0.26rem;
            border-radius: 0.1rem;
            color:white;
            text-align: center;
            pointer-events: none;
            &.selected{
                background-color: #eb4553;
                color:white;
                pointer-events: auto;
            }
        }
    }
    .code-box{
        height: 0.9rem;
        background-color: white;
        margin-top:0.3rem;
        margin-left:0.3rem;
        margin-right: 0.3rem;
        display: flex;
        align-items: center;
        border-radius: 0.1rem;
        img{
            margin-left:0.2rem;
            height: 0.5rem;
        }
        input{
            border: none;
            outline: none;
            height: 0.6rem;
            margin-left: 0.35rem;
            background-color: white;
        }
    }
    .save-box{
        height: 0.88rem;
        line-height: 0.88rem;
        margin: 0.3rem 0.3rem 0 0.3rem;
        text-align: center;
        background-color: #8A8A8A;
        border-radius: 0.1rem;
        color:white;
        font-size: 0.3rem;
        pointer-events: none;
        &.selected{
                background-color: #eb4553;
                color:white;
                pointer-events: auto;
            }
    }
}
</style>
