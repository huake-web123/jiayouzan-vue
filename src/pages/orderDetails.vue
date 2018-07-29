<template>
 <div class="page">
     <div class="head">订单详情</div>
     <div class="content">
         <div class="left-content">验证码：</div>
         <div class="right-content">12</div>
     </div>
     <div class="content">
         <div class="left-content">加油站名称</div>
         <div class="right-content">加油站</div>
     </div>
     <div class="content">
         <div class="left-content">商品名称：</div>
         <div class="right-content">2号枪</div>
     </div>
     <div class="content">
         <div class="left-content">实付金额：</div>
         <div class="right-content">元</div>
     </div>
     <div class="content">
         <div class="left-content">发票抬头：</div>
         <div class="right-content">哈哈哈</div>
     </div>
     <div class="content">
         <div class="left-content">统一社会信用码：</div>
         <div class="right-content">1234</div>
     </div>
 </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  data () {
    return {

    }
  },
  components: {
  }
}
</script>

<style scoped lang="less">
.page{
    background-color:#F5F5F5;
    min-height: 100vh;
    .head{
        height: 0.8rem;
        line-height: 0.8rem;
        margin-left: 0.3rem;
    }
    .content{
        height: 0.8rem;
        line-height: 0.8rem;
        background-color: white;
        display: flex;
        justify-content: space-between;
        margin-top:0.025rem;
        font-size: 0.3rem;
        .left-content{
            margin-left: 0.3rem;
        }
        .right-content{
            margin-right: 0.3rem;
        }
    }
}
</style>
