<template>
  <div class="personal">
    <topHeader title="个人中心"></topHeader>
    <router-link class="personInfo" :to="userInfo.id? '/userInfo':'/loginRegister'">
      <img :src="userInfo.avatar">
      <span class="login_text">{{ userInfo.id? userInfo.name:'登录/注册' }}</span>
      <span class="notbind"><i class="iconfont iconshouji" style="font-size: 0.2rem"></i>暂未绑定手机</span>
      <i class="iconfont iconjiantou-you personal_you"></i>
    </router-link>
    <div class="personalContent">
      <p class="personalP"><span class="personalNum">0.00<i style="font-size:0.2rem;color:black">元</i></span><span class="numText">我的余额</span></p>
      <p class="personalP"><span class="personalNum" style="color: rgb(0, 164, 240)">0<i style="font-size:0.2rem;color:black">个</i></span><span class="numText">我的优惠</span></p>
      <p class="personalP"><span class="personalNum" style="color: green">0<i style="font-size:0.2rem;color:black">分</i></span><span class="numText">我的积分</span></p>
    </div>
    <div class="otherThings">
      <p @click="goTo('/order')"><i class="iconfont icondingdan2 othericon" style="color: #00a4f0"></i>我的订单</p>
      <p><i class="iconfont iconjifen othericon" style="color: green"></i>我的积分</p>
      <p><i class="iconfont iconweibiaoti-- othericon" style="color: orange"></i>我的会员</p>
    </div>
    <div class="someServe">
      <p><i class="iconfont iconfuwu othericon" style="color: #ff2e2e"></i>服务中心</p>
    </div>
    <div class="loginOut" v-if="userInfo.id">
      <mt-button type="danger" style="width: 100%;display: inherit;" @click="loginOut">退出登录</mt-button>
    </div>
  </div>
</template>

<script>
import { MessageBox, Toast } from 'mint-ui'
import topHeader from '../../components/topHeader/topHeader'
import {mapState} from 'vuex'
export default {
  name: 'personal',
  components: {
    topHeader
  },
  methods: {
    goTo (path) {
      this.$router.replace(path)
    },
    loginOut () {
      MessageBox.confirm('确定退出登录吗？', '提示').then(action => {
        this.$store.dispatch('loginOut')
        Toast({
          message: '退出成功',
          iconClass: 'iconfont iconqueding',
          duration: 1000
        })
      }, () => {})
    }
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scope>
  @import "../../common/stylus/mixins.styl"
  .personal
    width 100%
    height 100%
    .personInfo
      text-decoration none
      background-color rgb(0, 164, 240)
      color white
      width 100%
      display block
      margin-top 0.1rem
      padding 0.2rem 0
      position relative
      img
        position relative
        left 0.7rem
        top 0.05rem
        width 15%
        height 15%
        border-radius 50%
      .login_text
        position relative
        display inline-block
        width 60%
        left 0.7rem
        top -0.55rem
        font-weight bold
        font-size 0.3rem
        text-overflow ellipsis
        overflow hidden
        white-space: nowrap
      .notbind
        position absolute
        top 0.9rem
        left 1.9rem
        font-size 0.2rem
      .personal_you
        font-size 0.5rem
        position relative
        right -0.5rem
        top -0.18rem
    .personalContent
      display flex
      flex-wrap nowrap
      justify-content space-around
      .personalP
        background-color #f9f9f9
        font-size 0.23rem
        display flex
        flex-direction column
        width (100/3)%
        justify-content center
        align-items center
        padding 0.2rem 0
        border 1px solid #efefef
        .personalNum
          color orange
          font-size 0.5rem
        .numText
          padding-top 0.2rem
    .otherThings
      font-size 0.3rem
      p
        padding 0.2rem 0.4rem
        border 1px solid #efefef
        border-top none
        background-color #f9f9f9
        .othericon
          font-size: 0.4rem
          margin-right:0.2rem
    .someServe
      font-size 0.3rem
      margin-top 0.2rem
      p
        padding 0.2rem 0.4rem
        border 1px solid #efefef
        background-color #f9f9f9
        .othericon
          font-size: 0.4rem
          margin-right:0.2rem
    .loginOut
      margin-top 0.1rem
</style>
