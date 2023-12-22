/*
  状态更新方法对象
  */
import {
  RECEIVE_CITYPOSITION,
  RECEIVE_CITYDETAILEDINFO,
  RECEIVE_FOODTYPES,
  RECEIVE_SHOPLIST,
  RECEIVE_CAPTCHAS,
  RECEIVE_USERINFO,
  RESET_USERINFO,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  INCREASE_COUNT,
  DECREASE_COUNT,
  CLEAR_CART
} from './mutation-types'
import Vue from 'vue'

export default {
  [RECEIVE_CITYPOSITION] (state, {cityPosition}) {
    state.cityPosition = cityPosition
    state.latitude = cityPosition.latitude
    state.longitude = cityPosition.longitude
  },
  [RECEIVE_CITYDETAILEDINFO] (state, {cityDetailedInfo}) {
    state.cityDetailedInfo = cityDetailedInfo
  },
  [RECEIVE_FOODTYPES] (state, {foodTypes}) {
    state.foodTypes = foodTypes
  },
  [RECEIVE_SHOPLIST] (state, {shopList}) {
    state.shopList = shopList
  },
  [RECEIVE_CAPTCHAS] (state, {captchas}) {
    state.captchas = captchas
  },
  [RECEIVE_USERINFO] (state, userinfo) {
    state.userInfo = userinfo
  },
  [RESET_USERINFO] (state) {
    state.userInfo = {}
  },
  [RECEIVE_INFO] (state, {info}) {
    state.info = info
  },
  [RECEIVE_RATINGS] (state, {ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_GOODS] (state, {goods}) {
    state.goods = goods
  },
  [INCREASE_COUNT] (state, {food}) {
    if (!food.count) {
      Vue.set(food, 'count', 1)
      state.cartFoods.push(food)
    } else {
      food.count++
    }
  },
  [DECREASE_COUNT] (state, {food}) {
    if (food.count) { // 只有有值才去减
      food.count--
      if (food.count === 0) {
        // 将food从cartFoods中移除
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },
  [CLEAR_CART] (state) {
    // 清除food中的count
    state.cartFoods.forEach(food => {
      food.count = 0
      return food.count
    })
    // 移除购物车中所有购物项
    state.cartFoods = []
  }
}
