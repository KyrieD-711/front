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
export const reqFoodTypes = () => ajax(BASE_URL + '/v2/index_entry')
// 获取商铺列表
export const reqShopList = () => ajax(BASE_URL + '/user/merchant')
// 获取登录的验证码图片
export const reqCaptchas = () => ajax(BASE_URL + '/v1/captchas', {}, 'post')
// 用户密码登录
// eslint-disable-next-line
export const reqPwdLogin = ({username, password}) => ajax(BASE_URL + '/user/user/login', {username, password}, 'post')
// 获取用户信息
export const reqUserInfoAuto = () => ajax(BASE_URL + '/user/user')
// 退出登录
export const reqLoginOut = () => ajax(BASE_URL + '/v2/signout')
// 获取商家信息
export const reqShopInfo = () => ajax('/user/merchant/details' + 'id')
// 获取商家评价数组
export const reqShopRatings = () => ajax('/ratings')
// 获取商家商品数组
export const reqShopGoods = () => ajax('/goods')

// 查询全部食品列表或搜索
export const reqFoodList = () => ajax(BASE_URL + `/user/food`)
