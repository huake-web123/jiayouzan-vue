<template>
    <div class="loading-box" :class="{active:loadStatus}">
      <img src="../assets/loading.svg">
      <span>加载中......</span>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  props: ['loadStatus'],
  data () {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped lang="less">
.loading-box{
    padding: 20px 10px;
    position: fixed;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    display: none;
    background-color: rgba(0,0,0,.7);
    border-radius: 10px;
    &.active{
      display: flex;
    }
    img{
      animation: rotate 1s steps(12) infinite;
      height: 30px;
      width: 30px;
      margin-bottom:3px;
    }
    span{
      font-size:12px;
      color:#fff;
    }
  }
  @keyframes rotate {
    100%{
      transform: rotate(360deg);
    }
  }
</style>
