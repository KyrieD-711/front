/*
  状态对象
  */
import {getStorage} from "../utils/storage";

export default {
  latitude: null, // 纬度
  longitude: null, // 经度
  cityPosition: {}, // 定位城市对象
  cityDetailedInfo: {}, // 城市的具体信息
  foodTypes: [], // 食品分类数组
  shopList: [], // 商品列表数组
  captchas: {}, // 图片验证码对象
  userInfo: getStorage('userInfo')||{}, // 用户信息
  goods: [], // 商品列表
  ratings: [], // 商家评价列表
  info: {}, // 商家信息
  cartFoods: [] // 购物车中食物的列表
}
