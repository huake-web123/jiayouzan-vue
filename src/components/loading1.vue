Vue.component('isLoading', {
  data: function () {
    return {
      showLoading: true
    }
  },
  template: '
    <div class="loading-box" :class="{active:showLoading}">
      <img src="../assets/loading.svg">
      <span>加载中......</span>
    </div>'
})