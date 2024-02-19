<template>
  <div class="cartcontrol">
    <transition name="move">
      <i class="iconfont iconremove1" v-if="food.count" @click.stop="changeCount(false)"></i>
    </transition>
    <div class="cart-count" v-if="food.count">{{ food.count }}</div>
    <i class="iconfont iconjia-tianchong" @click.stop="changeCount(true)"></i>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { addShoppingCart, subShoppingCart } from '../../api'
export default {
  props: {
    food: Object,
    shoppingCart: Object,
    merchantId: Number
  },
  methods: {
    changeCount (isAdd) {
      // this.$store.dispatch('changeCount', {isAdd, food: this.food})
      if (isAdd) {
        console.log('food:',this.food)
        console.log('shoppingCart',this.shoppingCart)
        console.log('merchantId',this.merchantId)
        const req = {
          merchantId: this.merchantId,
          shoppingCartId: this.shoppingCart.id,
          name: this.food.name,
          foodOrSetmealId: this.food.id,
        }
        console.log('req:',req)
        addShoppingCart(req).then(res => {
          if (res.code === 200) {
            Toast.success('添加成功')
          }
        })
      } else {
        const req = {
          merchantId: this.merchantId,
          shoppingCartId: this.shoppingCart.id,
          foodOrSetmealId: this.food.id,
        }
        console.log('req:',req)
        subShoppingCart(req).then(res => {
          if (res.code === 200) {
            Toast.success('减少成功')
          }
        })
      }
    } 
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0.3rem
    .cart-decrease
      display: inline-block
      padding: 0.1rem
      line-height: 0.3rem
      font-size: 0.3rem
      color: rgb(0, 160, 220)
    .iconremove1
      display: inline-block
      padding 0.1rem
      line-height 0.3rem
      font-size 0.3rem
      color $blue
      &.move-enter-active, &.move-leave-active
        transition all .3s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)
    .cart-count
      display: inline-block
      width: 0.2rem
      text-align center
      font-size 0.2rem
      line-height 0.3rem
      color: rgb(147, 153, 159)
    .iconjia-tianchong
      display inline-block
      padding 0.1rem
      line-height 0.3rem
      font-size 0.3rem
      color $blue
</style>
