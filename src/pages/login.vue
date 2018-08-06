<!--Created by hjx on 2018/7/25.-->
<template>
    <div class="wrapper-box" :class="{disappear:success}">
      <div class="main-content">
        <div class="login-token"><img  src="../assets/login_token.png"></div>
        <div class="head-box">账号密码登录</div>
        <div class="user-box">
          <div class="user">
            <img src="../assets/user.png">
            <input type="text" v-model="userName">
          </div>
          <div class="pass">
            <img src="../assets/lock.png">
            <input type="password" v-model="passWord">
          </div>
        </div>
        <div class="login-box" :class="{selected:userName&&passWord !== ''}"
        @click="entry()">登录</div>
      </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: '',
  data () {
    return {
      userName: '',
      passWord: '',
      success: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.isJump()
    })
  },
  methods: {
    isJump () {
      if (Cookies.get('token') !== undefined) {
        // console.log(Cookies.get('token'))
        this.$router.push({path: '/HomePage'})
      } else {
      }
    },
    entry () {
      this.$ajax({
        method: 'post',
        url: 'https://dsn.apizza.net/mock/fb275314bc53ebc54f45a6b698d2433d/login',
        data: JSON.stringify({
          account: this.userName,
          password: this.passWord
        })
      }).then((res) => {
        // console.log(res.data.token)
        Cookies.set('token', res.data.token, { expires: 7, path: '' })
        this.success = true
        setTimeout(() => {
          this.$router.push({path: '/HomePage'})
        }, 500)
        // this.$router.push({path: '/HomePage'})
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .wrapper-box{
    display: flex;
    min-height: 100vh;
    box-sizing: border-box;
    justify-content: center;
    background-color: #F5F5F5;
    transition: all 0.5s ease-in-out;
    &.disappear{
      transform:translateY(-100vh);
    }
    .main-content{
      /*height: 3rem;*/
      /*width: 4rem;*/
      margin-top: 0.8rem;
      .login-token{
        margin: 0 auto;
        text-align:center;
        >img{
          height: 2.5rem;
        }
      }
      .head-box{
        height: 1rem;
        font-size: 0.4rem;
        font-weight:bold;
        margin-top: 0.5rem;
      }
      .user-box{
        .user{
          height: 1rem;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #ccc;
          >img{
            height: 0.5rem;
            width: 0.5rem;
            margin-right: 0.3rem;
          }
          >input{
            border:none;
            outline: none;
            height: 0.8rem;
            width: 4.5rem;
            background-color: #F5F5F5;
          }
        }
        .pass{
          height: 1rem;
          display: flex;
          margin-top: 0.1rem;
          align-items: center;
          border-bottom: 1px solid #ccc;
          >img{
            height: 0.5rem;
            width: 0.5rem;
            margin-right: 0.3rem;
          }
          >input{
            border:none;
            outline: none;
            height: 0.8rem;
            width: 4.5rem;
            background-color: #F5F5F5;
          }
        }
      }
      .login-box{
        margin-top: 0.8rem;
        height: 1rem;
        line-height: 1rem;
        text-align:center;
        border-radius: 0.1rem;
        background-color: #ccc;
        pointer-events: none;
        &.selected{
          color: white;
          background-color: #eb4652;
          pointer-events: auto;
        }
      }
    }
  }
</style>
