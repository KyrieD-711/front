<template>
  <div class="home">
    <topHeader :title="cityDetailedInfo.address">
      <span class="header_iconsousuo" slot="left" @click="goTo('/search')">
        <i class="iconfont iconsousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <router-link to="/personal" v-if="userInfo.id"><i class="iconfont icongeren2" style="color: #3a8fe6; font-size:0.4rem"></i></router-link>
        <router-link to="/loginRegister" v-else>登录/注册</router-link>
      </span>
    </topHeader>
    <div class="homeContent">
      <foodTypes></foodTypes>
      <div>
        <van-notice-bar background=#33c3451f scrollable text="食堂营业时间: 周一至周五: 7:30-21:00,周末: 8:00-20:00" />
      </div>
      <shopList></shopList>
    </div>
  </div>
</template>

<script>
import topHeader from '../../components/topHeader/topHeader'
import shopList from '../../components/shopList/shopList'
import foodTypes from '../../components/foodTypes/foodTypes'
import {mapActions, mapState} from 'vuex'
export default {
  name: 'home',
  components: {
    topHeader,
    shopList,
    foodTypes
  },
  computed: {
    ...mapState(['cityDetailedInfo', 'userInfo']),
  },
  methods: {
    goTo (path) {
      this.$router.replace(path)
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scope>
  @import '../../common/stylus/mixins.styl'
  .home
    width 100%
    height 100%
    .header_iconsousuo
      margin 0
      padding 0
      font-size 0.3rem
      width 15%
      height 100%
      .iconsousuo
        font-size 0.4rem
        margin 0
        padding 0
    .header_login
      margin 0
      padding 0
      font-size 0.3rem
      display block
      width 25%
      a
        text-decoration none
        font-size 0.24rem
    .homeContent
      width 100%
      height 100%
</style>
