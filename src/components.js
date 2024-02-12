import Vue from "vue";
import { Skeleton ,NumberKeyboard,Empty ,NoticeBar ,
  Search , SwipeCell , Cell, CellGroup , CouponCell, CouponList,
  AddressList , Tabbar, TabbarItem, Card, Image, Divider, List ,
  NavBar ,ContactList, Tag ,Checkbox ,CheckboxGroup ,
  Field as VanField , Popup as vanPopup ,Image as VanImage,Form as VanForm,
  Button as VanButton, Dialog as VanDialog
} from 'vant';
const com=[
  Skeleton ,NumberKeyboard,Empty ,NoticeBar ,
  Search , SwipeCell , Cell, CellGroup , CouponCell, CouponList,
  AddressList , Tabbar, TabbarItem, Card, Image, Divider, List ,
  NavBar ,ContactList, Tag ,Checkbox ,CheckboxGroup,VanField,
  vanPopup,VanImage,VanForm,VanButton,VanDialog
]
const install=()=>com.forEach(it=>Vue.use(it))
export default install
