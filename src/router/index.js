import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home/home'
import search from '@/pages/search/search'
import order from '@/pages/order/order'
import personal from '@/pages/personal/personal'
import loginRegister from '@/pages/loginRegister/loginRegister'
import shop from '@/pages/shop/shop'
import shopGoods from '@/pages/shop/shopGoods/shopGoods'
import shopRating from '@/pages/shop/shopRating/shopRating'
import shopInfo from '@/pages/shop/shopInfo/shopInfo'
import address from '@/pages/address/address'
import shopListByFoodType from '@/pages/shopListByFoodType/shopListByFoodType'
import userInfo from '@/pages/userInfo/userInfo'
import record from '@/pages/record/record'
import myCoupon from '@/pages/coupon/myCoupon'
import register from '@/pages/register/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/personal',
      name: 'personal',
      component: personal
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: userInfo
    },
    {
      path: '/address',
      name: 'address',
      component: address
    },
    {
      path: '/record',
      name: 'record',
      component: record
    },
    {
      path: '/myCoupon',
      name: 'myCoupon',
      component: myCoupon
    },
    {
      path: '/shopListByFoodType',
      name: 'shopListByFoodType',
      component: shopListByFoodType
    },
    {
      path: '/loginRegister',
      name: 'loginRegister',
      component: loginRegister
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop,
      children: [
        {
          path: '/shop/shopGoods/:id',
          name: 'shopGoods',
          component: shopGoods
        },
        {
          path: '/shop/shopRating',
          name: 'shopRating',
          component: shopRating
        },
        {
          path: '/shop/shopInfo',
          name: 'shopInfo',
          component: shopInfo
        },
        {
          path: '',
          redirect: '/shop/shopGoods'
        }
      ]
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})
