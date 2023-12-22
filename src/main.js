// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* 入口js文件 */
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import store from './store'
import { Button } from 'mint-ui'
import { NoticeBar } from 'vant'
// import './mock/mockServer'

Vue.use(NoticeBar)
Vue.component(Button.name, Button)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
