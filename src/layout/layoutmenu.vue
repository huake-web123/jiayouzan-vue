<template>
  <div id="app">
    <router-view/>
    <div class="menu-box">
      <router-link tag="a"  to="/homepage/index" class="img-box" active-class="selected">
        <div class="home-page"></div>
        <span>首页</span>
      </router-link>
      <router-link  tag="a" to="/gas/index" class="img-box" active-class="selected">
        <div class="gas-page"></div>
        <span>加油</span>
      </router-link>
      <router-link  tag="a" to="/CarService" class="img-box" active-class="selected">
        <div class="car-page"></div>
        <span>汽车服务</span>
      </router-link>
      <router-link  tag="a" to="/Personal" class="img-box" active-class="selected">
        <div class="personal-page"></div>
        <span>我</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import '../assets/js/flexible'
export default {
  name: 'App'
}
</script>

<style lang="less">
body{
  margin: 0;
}
  .menu-box {
    background-color: #dfdfdf;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    width: 100%;
    .img-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 0.28rem;
      text-decoration: none;
      > div {
        width: 0.5rem;
        height: 0.5rem;
        background-size: 0.5rem 0.5rem;
      }
      span {
        color: #8A8A8A;
      }
      .home-page {
        background-image: url('../assets/menu/home.png');
      }
      .gas-page {
        background-image: url('../assets/menu/gas.png');
      }
      .car-page {
        background-image: url('../assets/menu/car.png');
      }
      .personal-page {
        background-image: url('../assets/menu/my.png');
      }
      &.selected .home-page {
        background-image: url("../assets/menu/home@selected.png");
      }
      &.selected span {
        color: red;
      }
      &.selected .gas-page {
        background-image: url('../assets/menu/gas@selected.png');
      }
      &.selected .car-page {
        background-image: url('../assets/menu/car@selected.png');
      }
      &.selected .personal-page {
        background-image: url('../assets/menu/my@selected.png');
      }
    }
  }
</style>