<template>
  <div class="footer" v-show="this.$route.path === '/home'||this.$route.path === '/search'||this.$route.path === '/order'||this.$route.path === '/personal'">
    <van-tabbar v-model="active" route>
      <van-tabbar-item name="home" icon="home-o" :class="{onfootnav: '/home' === $route.path}" replace to="/home">首页</van-tabbar-item>
      <van-tabbar-item name="search" icon="search" dot :class="{onfootnav: '/search' === $route.path}" replace to="/search">搜索</van-tabbar-item>
      <van-tabbar-item name="order" icon="cart-o" badge="5" :class="{onfootnav: '/order' === $route.path}" replace to="/order">订单</van-tabbar-item>
      <van-tabbar-item name="personal" icon="setting-o" badge="20" :class="{onfootnav: '/personal' === $route.path}" replace to="/personal">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script> 
export default {
  name: 'footerNav',
  data () {
    return {
      active: 'home'
    }
  },
  methods: {
    goTo (path) {
      this.$router.replace(path)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scope>
  .footer
    position fixed
    z-index 100
    width 100%
    bottom 0
    box-shadow 0 0.1rem 0.2rem black
    color rgb(85, 85, 85)
    background-color white
    .myfooternav
      display flex
      justify-content space-around
      .footnav
        display flex
        flex-direction column
        text-align center
        width 25%
        padding 0.1rem 0
        &.onfootnav
          color: rgb(0, 164, 240)
        .footicon
          font-size 0.44rem
        span
          font-size 0.2rem
          margin-top 0.05rem
</style>
