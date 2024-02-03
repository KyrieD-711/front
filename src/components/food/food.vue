<template>
  <div class="food" v-if="isShow">
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image">
        <p class="foodpanel-desc">{{food.setmealCategoryId ? food.info : ''}}</p>
        <div class="back" @click="toggleShow">
          <i class="iconfont iconjiantou-zuo"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.monthSales === null ? 0 : food.monthSales}}份</span>
          <!-- <span class="rating">好评率{{food.rating}}%</span> -->
        </div>
        <div class="price">
          <span class="now">￥{{food.price}}</span>
          <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper">
          <CartControl :food="food"/>
        </div>
      </div>
    </div>
    <div class="food-cover" @click="toggleShow"></div>
  </div>
</template>

<script>
import CartControl from '../CartControl/CartControl.vue'
export default {
  props: {
    food: Object
  },
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    toggleShow () {
      this.isShow = !this.isShow
    }
  },
  components: {
    CartControl
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .food
    position: fixed
    left: 0
    top: 0
    bottom: 0.96rem
    z-index: 101
    width: 100%
    font-size 0.3rem
    &.fade-enter-active, &.fade-leave-active
      transition opacity .5s
    &.fade-enter, &.fade-leave-to
      opacity 0
    .food-content
      position absolute
      left 50%
      top 50%
      transform translate(-50%, -50%)
      width 80%
      height 65%
      z-index 66
      background #fff
      border-radius 0.1rem
      .image-header
        position relative
        width 100%
        height 62%
        img
          position: absolute
          top 0
          left 0
          width 100%
          height 100%
        .foodpanel-desc
          font-size 0.2rem
          color #ddd
          letter-spacing 0
          position absolute
          bottom 0
          left 0
          right 0
          padding 0 0.2rem 0.2rem
        .back
          position: absolute
          top: 0.1rem
          left: 0
          .iconjiantou-zuo
            display: block
            padding: 0.2rem
            font-size: 0.5rem
            color: #fff
      .content
        position: relative
        padding: 0.36rem
        .title
          line-height: 0.28rem
          margin-bottom: 0.16rem
          font-size: 0.28rem
          font-weight: 700
          color: rgb(7, 17, 27)
        .detail
          margin-bottom: 0.36rem
          line-height: 0.2rem
          height: 0.2rem
          font-size: 0
          .sell-count, .rating
            font-size: 0.2rem
            color: rgb(147, 153, 159)
          .sell-count
            margin-right: 0.24rem
        .price
          font-weight: 700
          line-height: 0.48rem
          .now
            margin-right: 0.16rem
            font-size: 0.28rem
            color: rgb(240, 20, 20)
          .old
            text-decoration: line-through
            font-size: 0.2rem
            color: rgb(147, 153, 159)
        .cartcontrol-wrapper
          position: absolute
          right: 0.24rem
          bottom: 0.24rem
        .buy
          position: absolute
          right: 0.36rem
          bottom: .36rem
          z-index: 10
          height: 0.48rem
          line-height: 0.48rem
          padding: 0 0.24rem
          box-sizing: border-box
          border-radius: 0.24rem
          font-size: 0.2rem
          color: #fff
          background: rgb(0, 160, 220)
          &.fade-transition
            transition: all 0.2s
            opacity: 1
          &.fade-enter, &.fade-leave
            opacity: 0
    .food-cover
      position absolute
      top 0
      right 0
      bottom -0.96rem
      left 0
      z-index 55
      background-color rgba(0, 0, 0, 0.5)
</style>
