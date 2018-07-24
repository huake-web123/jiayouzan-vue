<!--Created by hjx on 2018/7/25.-->
<template>
    <div class="wrapper-box">
      <div class="head-box">账号密码登录</div>
      <div class="user-box">
        <div class="user">
          <img src="../assets/user.png">
          <input type="text" v-model="userName">
        </div>
        <div class="pass">
          <img src="../assets/user.png">
          <input type="password" v-model="passWord">
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      userName: '',
      passWord: ''
    }
  }
}
</script>

<style lang="less" scoped>
  .wrapper-box{

  }
</style>
