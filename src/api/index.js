/*
  各部分接口请求函数模块
 */

import { getStorage } from '../utils/storage'
import ajax from './ajax'
import axios from 'axios';

const BASE_URL = '/campus'
// 获取城市定位
export const reqCityPosition = () => ajax(BASE_URL + '/v1/cities', {type: 'guess'})
// 根据经纬度详细定位
export const reqCityDetailedInfo = (geohash) => ajax(`${BASE_URL}/v2/pois/${geohash}`)



// 食品分类列表
export const reqFoodTypes = () => ajax(BASE_URL + '/user/foodType/list')
// 获取商铺列表
export const reqShopList = () => ajax(BASE_URL + '/user/merchant/list')
// 获取登录的验证码图片
// export const reqCaptchas = () => ajax(BASE_URL + '/v1/captchas', {}, 'post')
// 用户密码登录
export const reqPwdLogin = ({username, password}) => ajax(BASE_URL + '/user/user/login', {username, password}, 'post')
// 用户名密码注册
export const reqAccountRegister = (username,password) => {
  return axios.post(BASE_URL + '/user/user/register', {username, password})
}
// 获取验证码
export const reqCaptchas = () => ajax(BASE_URL + '/user/user/code')
// 手机号码登录或注册
export const reqLoginByPhone = (phone,verificationCode) => ajax(BASE_URL + '/user/user/phone/register', {phone, verificationCode}, 'post')
// 获取用户信息
export const reqUserInfoAuto = () => {
  return ajax(BASE_URL + '/user/user/info', {}, 'get')
}
// 修改用户信息
export const editUserInfo = (userInfoEdit) => {
  console.log("userinfoedit",userInfoEdit)
  return axios.put(BASE_URL + `/user/user/edit`, userInfoEdit)
}
// 退出登录
export const reqLoginOut = () => ajax(BASE_URL + '/user/user/logout')
// 获取商家信息
export const reqShopInfo = (id) => ajax(`/user/merchant/details/${id}`)
// 获取商家评价数组
export const reqShopRatings = () => ajax('/ratings')
// 获取商家商品数组
export const reqShopGoods = (id) => ajax(BASE_URL + `/user/merchant/goods/${id}`)
// 商家信息
export const reqMerchantInto = (id) => ajax(BASE_URL + `/user/merchant/into/${id}`)
// 获取当前登录用户的地址列表
export const reqAddressList = () => ajax(BASE_URL + `/user/address/list`)
// 修改当前用户的地址信息
export const editAddressList = (address) => {
  console.log("addressfwdf::::",address)
  return axios.put(BASE_URL + `/user/address/edit`,address)
}
// 删除地址
export const delAddressList = (id) => {
  return axios.delete(
    BASE_URL + `/user/address/del/${id}`
  )
}
// 新增用户地址信息
export const addAddressList = (address) => ajax(BASE_URL + `/user/address/add`, address, 'post')
// 根据商品id查询全部食品列表
export const reqFoodList = (id) => ajax(BASE_URL + `/user/merchant/food/${id}`)
// 根据食品分类id查询全部商家列表
export const reqShopListByFoodType = (id) => ajax(BASE_URL + `/user/foodType/details/${id}`)
// 根据套餐id查询食品
export const reqFoodListBySetmealId = (id) => ajax(BASE_URL + `/user/merchant/setmeal/${id}`)
// 设置为默认地址
export const enableAddressDefault = (id) => {
  return axios.put(BASE_URL + `/user/address/enable/${id}`,{})
}
// 用户积分-获取优惠券列表
export const reqUserRecordCouponList = () => ajax(BASE_URL + `/user/coupon/list`)
// 用户积分-兑换优惠券
export const addCoupon = (AddCouponDTO) => ajax(BASE_URL + `/user/coupon/addCoupon`, AddCouponDTO,'post')
// 用户积分-兑换记录
export const reqUserRecordExchangeList = () => ajax(BASE_URL + `/user/record/list`)
// 用户优惠券列表
export const reqUserMyCouponList = () => ajax(BASE_URL + `/user/coupon/myCoupon`)
// 根据商家或美食名称搜索
export const reqUserSearchList = (keyword) => ajax(BASE_URL + `/user/search/list?keyword=${decodeURIComponent(keyword)}`)

export const get = (url, data = {}) => ajax(BASE_URL + url, data)
export const post = (url, data = {}) => ajax(BASE_URL + url, data, 'post')
