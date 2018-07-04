<!--Created by hjx on 2018/7/4.-->
<template>
    <div class="wrapper-box">
      <div>你当前处在{{stationId}}</div>
    </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      stationId: ''
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

</style>
