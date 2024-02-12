// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* 入口js文件 */
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import store from './store'
import { Button } from 'mint-ui'
import { Popup } from 'mint-ui';
import { Field } from 'mint-ui';
import { Header } from 'mint-ui';
import install from "./components";
install()
Vue.component(Button.name, Button)
Vue.component(Popup.name, Popup)
Vue.component(Field.name, Field);
Vue.component(Header.name, Header);

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
