<template>
  <div class="shopGoods">
    <div class="goods" :style="{height: screenHeight}">
      <div class="menu-wrapper">
        <ul>
          <li class="menu-item" v-for="(good, index) in goods" :key="index"
           :class="{current: index === currentIndex}" @click="clickMenuItem(index)">
            <span class="text">
              <img :src="good.icon" v-if="good.icon">
              {{ good.name }}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook"  v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{ good.name }}</h1>
            <ul>
              <li class="food-item" v-for="(food, index) in good.foods"
               :key="index" @click="showFood(food)">
                <div class="icon">
                  <img :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span class="count">月售{{ food.sellCount }}份</span>
                    <span>好评率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{ food.price }}</span>
                    <span class="old" v-if="food.oldPrice">￥{{ food.oldPrice }}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
    <food :food="food" ref="food"></food>
  </div>
</template>

<script>
import CartControl from '../../../components/CartControl/CartControl'
import ShopCart from '../../../components/ShopCart/ShopCart'
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
import food from '../../../components/food/food'
import {get} from "../../../api/index";
export default {
  data () {
    return {
      scrollY: 0,
      tops: [],
      screenHeight: window.screen.height,
      food: {}, // 需要显示的food
      mD:{}
    }
  },
  computed: {
    ...mapState(['goods']),
    // 计算当前分类的下标
    currentIndex () {
      // 得到条件数据
      const {scrollY, tops} = this
      // 根据条件计算产生一个结果
      const index = tops.findIndex((top, index) => {
        if (scrollY >= top && scrollY < tops[index + 1]) {
          return true
        }
      })
      // 返回结果
      return index
    }
  },
  mounted () {
    if (this.screenHeight > 800 && this.screenHeight <= 1000) {
      this.screenHeight = (window.screen.height / 85) + 'rem'
    } else if (this.screenHeight > 1000) {
      this.screenHeight = (window.screen.height / 230) + 'rem'
    } else {
      this.screenHeight = (window.screen.height / 80) + 'rem'
    }
    window.onresize = () => {
      this.screenHeight = (window.screen.height / 80) + 'rem'
    }
    this.$store.dispatch('getShopGoods', () => {
      this.$nextTick(() => {
        this._initScroll()
        this._initTops()
      })
    })
  },
  methods: {
    _initScroll () {
      // 数据更新之后使用better-scroll组件
      // eslint-disable-next-line
      const menuScroll = new BScroll('.menu-wrapper', {
        click: true
      })
      this.foodsScroll = new BScroll('.foods-wrapper', {
        probeType: 2,
        click: true
      })
      // 右侧列表绑定scroll监听
      this.foodsScroll.on('scroll', ({x, y}) => {
        this.scrollY = Math.abs(y)
      })
      this.foodsScroll.on('scrollEnd', ({x, y}) => {
        this.scrollY = Math.abs(y)
      })
    },
    _initTops () {
      const tops = []
      let top = 0
      tops.push(top)
      // 找到所有分类的li
      const lis = this.$refs.foodsUl.children
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight
        tops.push(top)
      })
      this.tops = tops
    },
    clickMenuItem (index) {
      // 使用右侧列表滑动到对应位置
      const scrolly = this.tops[index]
      // 立即让点击的分类为当前分类
      this.scrollY = scrolly
      this.foodsScroll.scrollTo(0, -scrolly, 300)
    },
    showFood (food) {
      this.food = food
      // 显示food组件（在父组件中调用子组件对象方法）
      this.$refs.food.toggleShow()
    }
  },
  components: {
    CartControl,
    ShopCart,
    food
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .shopGoods
    width 100%
    height 100%
    .goods
      display flex
      width 100%
      overflow hidden
      font-size 0.4rem
      margin-bottom 0.96rem
      .menu-wrapper
        width 1.6rem
        background-color #ececec
        flex: 0 0 1.6rem
        .current
          background-color white !important
        .menu-item
          padding 0.2rem 0
          border-bottom 0.01rem solid #ddd
          text-align center
          .text
            font-size 0.25rem
            img
               width 0.3rem
      .foods-wrapper
        flex 1
        font-size 0.3rem
        .title
          padding-left: 0.28rem
          height: 0.52rem
          line-height: 0.52rem
          border-left: 0.04rem solid #d9dde1
          font-size: 0.24rem
          color: rgb(147, 153, 159)
          background: #f3f5f7
        .food-item
          display: flex
          margin: 0.3rem
          padding-bottom: 0.3rem
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
            margin-bottom: 0
          .icon
            flex: 0 0 1rem
            margin-right: 0.2rem
            img
              width 1.14rem
              height 1.14rem
          .content
            flex: 1
            .name
              margin: 0 0 0.16rem 0
              height: 0.28rem
              line-height: 0.28rem
              font-size: 0.28rem
              color: rgb(7, 17, 27)
              text-overflow ellipsis
              white-space nowrap
            .desc, .extra
              line-height: 0.2rem
              font-size: 0.2rem
              color: rgb(147, 153, 159)
            .desc
              line-height: 0.24rem
              margin-bottom: 0.16rem
            .extra
              .count
                margin-right: 0.2rem
            .price
              font-weight: 700
              line-height: 0.48rem
              .now
                margin-right: 0.1rem
                font-size: 0.28rem
                color: rgb(240, 20, 20)
              .old
                text-decoration: line-through
                font-size: 0.2rem
                color: rgb(147, 153, 159)
            .cartcontrol-wrapper
              position: absolute
              right: 0
              bottom: 0.2rem
</style>
