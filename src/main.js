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
import { NoticeBar ,Image as VanImage} from 'vant'
import { Skeleton ,NumberKeyboard,Form as VanForm,Empty , Search , SwipeCell , Cell, CellGroup , Field as VanField , Popup as vanPopup , CouponCell, CouponList, AddressList , Button as VanButton, Dialog as VanDialog, Tabbar, TabbarItem, Card, Image, Divider, List , NavBar ,ContactList, Tag ,Checkbox ,CheckboxGroup } from 'vant';
// import './mock/mockServer'

Vue.use(Skeleton);
Vue.use(NumberKeyboard);
Vue.use(VanForm);
Vue.use(Empty);
Vue.use(SwipeCell);
Vue.use(Search);
Vue.use(vanPopup);
Vue.use(CouponCell);
Vue.use(CouponList);
Vue.use(VanField);
Vue.use(CellGroup);
Vue.use(VanDialog);
Vue.use(AddressList);
Vue.use(VanButton);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(VanImage);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(NoticeBar)
Vue.use(Tag);
Vue.use(ContactList);
Vue.use(NavBar)
Vue.use(Cell);
Vue.use(Card);
Vue.use(Image);
Vue.use(Divider);
Vue.use(List);
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
