<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight: totalCount}">
              <i class="iconfont icongouwuche" :class="{highlight: totalCount}"></i>
            </div>
            <div class="num" v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight: totalCount}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{info.deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">
            {{payText}}
          </div>
        </div>
      </div>
      <transition name="move">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearCart">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food" v-for="(food, index) in cartFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price"><span>￥{{food.price}}</span></div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food"/>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import BScroll from 'better-scroll'
import { mapState, mapGetters } from 'vuex'
import CartControl from '../CartControl/CartControl'
import { reqShopInfo } from '../../api'

export default {
  data () {
    return {
      isShow: false
    }
  },
  computed: {
    ...mapState(['cartFoods', 'info']),
    ...mapGetters(['totalCount', 'totalPrice']),
    payClass () {
      const {totalPrice} = this
      const {minPrice} = this.info
      return totalPrice >= minPrice ? 'enough' : 'not-enough'
    },
    payText () {
      const {totalPrice} = this
      const {minPrice} = this.info
      if (totalPrice === 0) {
        return `￥${minPrice}元起送`
      } else if (totalPrice < minPrice) {
        return `还差￥${minPrice - totalPrice}元起送`
      } else {
        return '结算'
      }
    },
    listShow () {
      // 如果总数量为0, 直接不显示
      const that = this
      if (this.totalCount === 0) {
        that.isShow = false
        return false
      }
      if (this.isShow) {
        this.$nextTick(() => {
          // 实现BScroll的实例是一个单例
          if (!this.scroll) {
            that.scroll = new BScroll('.list-content', {
              click: true
            })
          } else {
            that.scroll.refresh() // 让滚动条刷新一下: 重新统计内容的高度
          }
        })
      }
      return this.isShow
    }
  },
  methods: {
    toggleShow () {
      // 只有当总数量大于0时切换
      if (this.totalCount > 0) {
        this.isShow = !this.isShow
      }
    },
    clearCart () {
      MessageBox.confirm('确定清空购物车吗?').then(action => {
        this.$store.dispatch('clearCart')
      }, () => {})
    }
  },
  mounted () {
    reqShopInfo()
  },
  components: {
    CartControl
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 0.96rem
    .content
      display flex
      background #141d27
      font-size 0
      color rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          vertical-align top
          position relative
          top -0.2rem
          margin 0 0.24rem
          padding 0.12rem
          width 1.12rem
          height 1.12rem
          box-sizing border-box
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background #2b343c
            &.highlight
              background $blue
            .icongouwuche
              line-height 0.88rem
              font-size 0.48rem
              color #80858a
              &.highlight
                color #fff
          .num
            position absolute
            top 0
            right 0
            width 0.48rem
            height 0.32rem
            line-height 0.32rem
            text-align center
            border-radius 0.32rem
            font-size 0.18rem
            font-weight 700
            color #ffffff
            background rgb(240, 20, 20)
            box-shadow 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top
          margin-top 0.1rem
          line-height 0.48rem
          padding-right 0.24rem
          box-sizing border-box
          font-size 0.32rem
          font-weight 700
          color #fff
          &.highlight
            color #fff
        .desc
          display inline-block
          vertical-align bottom
          margin-bottom 0.3rem
          margin-left -0.9rem
          font-size 0.2rem
      .content-right
        flex 0 0 2.1rem
        width 2.1rem
        .pay
          height 0.96rem
          line-height 0.96rem
          text-align center
          font-size 0.24rem
          font-weight 700
          color #fff
          &.not-enough
            background #2b333b
          &.enough
            background #00b7ea
            color #fff
    .ball-container
      .ball
        position fixed
        left 0.64rem
        bottom 0.44rem
        z-index 200
        transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width 0.32rem
          height 0.32rem
          border-radius 50%
          background $green
          transition all 0.4s linear
    .shopcart-list
      position absolute
      left 0
      top 0
      z-index -1
      width 100%
      transform translateY(-100%)
      &.move-enter-active, &.move-leave-active
        transition transform .3s
      &.move-enter, &.move-leave-to
        transform translateY(0)
      .list-header
        height 0.8rem
        line-height 0.8rem
        padding 0 0.36rem
        background #f3f5f7
        border-bottom 0.02rem solid rgba(7, 17, 27, 0.1)
        .title
          float left
          font-size 0.28rem
          color rgb(7, 17, 27)
        .empty
          float right
          font-size 0.24rem
          color rgb(0, 160, 220)
      .list-content
        padding 0 0.36rem
        max-height 4.34rem
        overflow hidden
        background #fff
        .food
          position relative
          padding 0.24rem 0
          box-sizing border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height 0.48rem
            font-size 0.28rem
            color rgb(7, 17, 27)
          .price
            position absolute
            right 1.8rem
            bottom 0.24rem
            line-height 0.48rem
            font-size 0.28rem
            font-weight 700
            color rgb(240, 20, 20)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 0.23rem
  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    backdrop-filter blur(10px)
    opacity 1
    background rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity 0
      background rgba(7, 17, 27, 0)
</style>
