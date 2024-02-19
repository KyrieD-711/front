<template>
  <div class="shop">
    <shopHeader></shopHeader>
    <div class="tab">
      <div class="tab-item">
        <router-link :to="{name: 'shopGoods', params:{id: this.shop.id} }">点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/shopRating">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/shopInfo">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { reqShopInfo } from '../../api'
import shopHeader from '../../components/shopHeader/shopHeader'
export default {
  name: 'shop',
  data () {
    return {
      shop: {
        id: 1,
      }
    }
  },
  components: {
    shopHeader
  },
  mounted () {
    // this.$store.dispatch('getShopInfo')
    console.log('shop id:',this.$route.params.id)
    reqShopInfo(this.$route.params.id).then(res => {
      if (res.code === 200) {
        // console.log('res:', res)
        this.shop.id = res.data.id
      }else {
        this.shop.id = this.$route.params.id
      }
    })
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .tab
    height 0.7rem
    line-height 0.7rem
    background #fff
    font-size 0.3rem
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 0.28rem
      color rgb(77, 85, 93)
      a
        display block
        position relative
        text-decoration none
        &.router-link-active
          color #3a8fe6
          &::after
            content ''
            position absolute
            left 50%
            bottom 0.02rem
            width 0.7rem
            height 0.04rem
            transform translateX(-50%)
            background #3a8fe6
</style>
