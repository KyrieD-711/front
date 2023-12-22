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
      path: '/loginRegister',
      name: 'loginRegister',
      component: loginRegister
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
