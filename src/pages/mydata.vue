<template>
 <div class="page">
     <div class="main-content">
         <div class="content-box my-avatar">
             <div class="txt">我的头像</div>
             <div class="img-box">
                 <img class="personal" :src='personalArr.avatar'>
                 <form class="avatar" id="form-avatar">
                   <input type="file" @change="fileImage" accept="image/jpeg,image/x-png,image/gif" id="" value="">
                 </form>
                 <img class="arrow" src="../assets/arrow.png">
             </div>
         </div>
         <div class="content-box cell-phone" @click="toMobilePhone()">
             <div class="txt">手机号</div>
             <div class="img-box">
              <div class="bind" :class="{seleted:personalArr.mobile === ''}">{{personalArr.mobile | mobileFilters}}</div>
              <img class="arrow" src="../assets/arrow.png">
             </div>
         </div>
         <div class="content-box my-name">
             <div class="txt">昵称</div>
             <div class="name">{{personalArr.name}}</div>
         </div>
         <div class="content-box">
             <div class="txt">性别</div>
             <div class="img-box">
              <div class="sex">女</div>
              <img class="arrow" src="../assets/arrow.png">
             </div>
         </div>
         <select>
                <option value="男">男</option>
                <option value="女">女</option>
         </select>
     </div>
 </div>
</template>

<script type="text/ecmascript-6">
import Cookies from 'js-cookie'
export default {
  name: '',
  data () {
    return {
      personalArr: []
    }
  },
  components: {

  },
  filters: {
    mobileFilters (value) {
      if (value === '') {
        return '未删减'
      } else {
        return value
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.loadPersonData()
    })
  },
  methods: {
    loadPersonData () {
      this.$ajax({
        method: 'post',
        url: 'https://dsn.apizza.net/mock/fb275314bc53ebc54f45a6b698d2433d/user_info'
      }).then((res) => {
        // console.log(res.data.user_info)
        this.personalArr = res.data.user_info
        this.showLoading = false
      })
    },
    toMobilePhone () {
      this.$router.push({path: '/mobilephone'})
    },
    fileImage (e) {
      var that = this
      var file = e.target.files[0]
      var imgSize = file.size / 1024
      if (imgSize > 200) {
        alert('请上传大小不要超过200KB的图片')
      } else {
        var reader = new FileReader()
        reader.readAsDataURL(file) 
        reader.onloadend = function () {
          console.log('123')
          var dataURL = reader.result
          that.personalArr.avatar = dataURL
          document.getElementById('form-avatar').reset()
          that.$ajax({
            method: 'post',
            url: 'https://dsn.apizza.net/mock/fb275314bc53ebc54f45a6b698d2433d/upload',
            data: JSON.stringify({
              token: Cookies.get('token'),
              img: dataURL
            })
          }).then((res) => {
            console.log(res.data.img_url)
            alert('图片上传成功！')
          })
        }
        // reader.onerror = function (err) {
        //   console.log(err)
        //   document.getElementById('form-avatar').reset()
        // }
      }
    }
  }
}
</script>

<style scoped lang="less">
.page{
    background-color: #f5f5f5;
    min-height: 100vh;
    // 防止塌陷
    overflow: hidden;
    .main-content{
        margin-top:0.2rem;
        .content-box{
            height: 0.88rem;
            border-bottom: 0.02rem solid #dfdfdf;
            background-color: white;
            padding-left:0.3rem;
            padding-right: 0.3rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .txt{
                color:#383838;
            }
            .name{
                    color:#848484;
                    margin-right: 0.6rem;
                }
            .img-box{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .avatar{
                  position:absolute;
                  display: flex;
                  align-items: center;
                  z-index:999;
                  >input{
                    // 透明度为0
                    // opacity:0;
                  }
                }
                .bind{
                    color: #848484;
                    &.seleted{
                        color:#ca3744;
                    }
                }
                .sex{
                    color:#848484;
                }
                .personal{
                    width: 0.72rem;
                    height: 0.72rem;
                    border-radius: 50%;
                }
                .arrow{
                    height: 0.5rem;
                    margin-left:0.1rem;
                }
            }
        }
    }
}
</style>
