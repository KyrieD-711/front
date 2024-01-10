/*
  各部分接口请求函数模块
 */

import ajax from './ajax'
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
export const reqCaptchas = () => ajax(BASE_URL + '/v1/captchas', {}, 'post')
// 用户密码登录
// eslint-disable-next-line
export const reqPwdLogin = ({username, password}) => ajax(BASE_URL + '/user/user/login', {username, password}, 'post')
// 获取用户信息
export const reqUserInfoAuto = () => {
  return ajax(BASE_URL + '/user/user/info', {}, 'get')
}
// 退出登录
export const reqLoginOut = () => ajax(BASE_URL + '/user/user/logout')
// 获取商家信息
export const reqShopInfo = (id) => ajax('/user/merchant/details/${id}')
// 获取商家评价数组
export const reqShopRatings = () => ajax('/ratings')
// 获取商家商品数组
export const reqShopGoods = (id) => ajax(BASE_URL +`/user/merchant/goods/${id}`)

// 根据商品id查询全部食品列表
export const reqFoodList = (id) => ajax(BASE_URL + `/user/merchant/food/${id}`)

export const get = (url, data = {}) => ajax(BASE_URL + url, data)
export const post = (url, data = {}) => ajax(BASE_URL + url, data, 'post')
