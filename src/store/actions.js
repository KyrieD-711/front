/*
  通过mutation间接更新状态的对象
  */

import {
  RECEIVE_CITYPOSITION,
  RECEIVE_CITYDETAILEDINFO,
  RECEIVE_FOODTYPES,
  RECEIVE_SHOPLIST,
  RECEIVE_CAPTCHAS,
  RECEIVE_USERINFO,
  RESET_USERINFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  DECREASE_COUNT,
  INCREASE_COUNT,
  CLEAR_CART
} from './mutation-types'

import {
  reqCityPosition,
  reqCityDetailedInfo,
  reqFoodTypes,
  reqShopList,
  reqCaptchas,
  reqUserInfoAuto,
  reqLoginOut,
  reqShopRatings,
  reqShopGoods,
  reqShopInfo
} from '../api'
import {clearStorage, setStorage} from "../utils/storage";
import router from "../router";

export default {
  // 异步获取城市位置
  async getCityPosition ({commit}) {
    const cityPosition = await reqCityPosition()
    console.log(cityPosition)
    commit(RECEIVE_CITYPOSITION, {cityPosition})
  },
  // 异步获取城市详细信息
  async getCityDetailedInfo ({commit, state}) {
    const geohash = state.latitude + ',' + state.longitude
    const cityDetailedInfo = await reqCityDetailedInfo(geohash)
    commit(RECEIVE_CITYDETAILEDINFO, {cityDetailedInfo})
  },
  // 异步获取食品分类列表
  async getFoodTypes ({commit}) {
    const foodTypes = await reqFoodTypes()
    commit(RECEIVE_FOODTYPES, {foodTypes})
  },
  // 异步获取商家列表
  async getShopList ({commit, state}) {
    const shopList = await reqShopList()
    commit(RECEIVE_SHOPLIST, {shopList:shopList.data})
  },
  // 异步获取验证码
  async getCaptchas ({commit}) {
    const captchas = await reqCaptchas()
    commit(RECEIVE_CAPTCHAS, {captchas})
  },
  // 同步获取用户信息
  getUserInfo ({commit}, userInfo) {
    commit(RECEIVE_USERINFO, {userInfo})
  },
  async getUserInfoAuto ({commit}) {
    const userInfo = await reqUserInfoAuto()
    setStorage('userInfo',userInfo.data)
    commit(RECEIVE_USERINFO, userInfo.data)
  },
  async loginOut ({commit}) {
    clearStorage()
    router.replace('/loginRegister')
    commit(RESET_USERINFO)
    // const outResult = await reqLoginOut()
    // if (outResult.status === 1) {
    //   commit(RESET_USERINFO)
    // }
  },
  // 异步获取商家信息
  async getShopInfo ({commit}) {
    const result = await reqShopInfo(id)
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
    }
  },
  // 异步获取商家评价列表
  async getShopRatings ({commit}, callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
      // 数据更新了, 通知一下组件
      callback && callback()
    }
  },
  // 异步获取商家商品列表
  async getShopGoods ({commit}, id) {
    const result = await reqShopGoods(id)
    if (result.code === 200) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      // 数据更新了, 通知一下组件
      // callback && callback()
    }
  },
  // 同步更新food里的商品个数
  changeCount ({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(INCREASE_COUNT, {food})
    } else {
      commit(DECREASE_COUNT, {food})
    }
  },
  // 同步清空购物车
  clearCart ({commit}) {
    commit(CLEAR_CART)
  }
}
