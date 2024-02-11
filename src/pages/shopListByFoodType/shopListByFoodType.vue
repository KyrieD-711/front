<template>
  <div class="msite_shop_list" >
    <!-- <mt-nav-left>
        <router-link to="/home">
          <mt-button icon="back"></mt-button>
        </router-link>
    </mt-nav-left> -->
    <mt-header title="商家列表">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="shop_header">
      <i class="iconfont iconxuanxiang" style="color: #999"></i>
      <span class="shop_header_title">食堂商家</span>
    </div>
    <div class="shop_container">
      <ul class="shop_list" v-if="shopList.length">
        <li class="shop_li border-1px" v-for="(shop, index) in shopList" :key="index" @click="$router.push({
        name:'shopGoods',
        params:{
          id:shop.id
        }
        })">
          <a>
            <div class="shop_left">
             <img class="shop_img" :src="shop.avatar">
            </div>
            <div class="shop_right">
              <section class="shop_detail_header">
                <h4 class="shop_title ellipsis">{{ shop.name }}</h4>
                <ul class="shop_detail_ul">
                  <li class="supports" v-for="(support, index) in shop.supports" :key="index">{{ support.icon_name }}</li>
                </ul>
              </section>
              <section class="shop_rating_order">
                <section class="shop_rating_order_left">
                  <star :size="24" :score="shop.rating"></star>
                  <div class="rating_section">{{ shop.rating }}</div>
                  <div class="order_section">月售{{ shop.monthSales }}单</div>
                </section>
                <section class="shop_rating_order_right">
                  <span class="delivery_style delivery_right">商家自送</span>
                </section>
              </section>
              <section class="shop_distance">
                <p class="shop_delivery_msg">
                  <span>¥{{ shop.deliveryAmount }}起送</span>
                  <span class="segmentation">/</span>
                  <span>{{ shop.description }}</span>
                </p>
              </section>
            </div>
          </a>
        </li>
      </ul>
      <ul v-else>
        <li v-for="(item, index) in 6" :key="index"><img src="./imgs/shop_back.svg" alt="back"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import star from '../../components/stars/star'
import {reqShopListByFoodType} from '../../api'
export default {
  name: 'shopListByFoodType',
  data () {
    return {
      shopList: [
        {
          id: 1,
          avatar: 'https://th.bing.com/th?id=OIP.CDCQavJOTg19lfYGZK72_gHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2',
          name: '好饭来',
          rating: 3.5,
          monthSales: 3332,
          deliveryAmount: 10,
          description: '还行',
        },
      ]
    }
  },
  computed: {

  },
  mounted () {
    // console.log("foodfasdf "+this.$route.query.id)
    reqShopListByFoodType(this.$route.query.id).then(v => {
      console.log("id:"+this.$route.query.id)
      console.log("data:"+v.data)
      this.shopList = v.data
    })
  },
  methods: {
    
  },
  components: {
    star
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scope>
  @import '../../common/stylus/mixins.styl'
  .msite_shop_list
    top-border-1px(#e4e4e4)
    margin-top 0.2rem
    background #fff
    .shop_header
      padding 0.2rem 0.2rem 0
      font-size 0.3rem
      .shop_icon
        margin-left 0.1rem
        color #999
      .shop_header_title
        color #999
        font-size 0.3rem
    .shop_container
      margin-bottom 1rem
      .shop_list
        .shop_li
          bottom-border-1px(#f1f1f1)
          width 100%
          >a
            clearFix()
            display block
            box-sizing border-box
            padding 0.2rem 0.15rem
            width 100%
            .shop_left
              float left
              box-sizing border-box
              width 30%
              height 1.7rem
              padding-right 0.2rem
              .shop_img
                display block
                width 100%
                height 100%
            .shop_right
              float right
              width 70%
              .shop_detail_header
                clearFix()
                width 100%
                .shop_title
                  float left
                  width 4rem
                  color #333
                  font-size 0.3rem
                  line-height 0.35rem
                  font-weight 700
                  &::before
                    content '品牌'
                    display inline-block
                    font-size 0.2rem
                    line-height 0.2rem
                    color #333
                    background-color #ffd930
                    padding 0.01rem 0.01rem
                    border-radius 2px
                    margin-right 0.1rem
                .shop_detail_ul
                  float right
                  margin-top 0.05rem
                  .supports
                    float left
                    font-size 0.3rem
                    color #999
                    border 1px solid #f1f1f1
                    padding 0 0.01rem
                    border-radius 2px
              .shop_rating_order
                clearFix()
                width 100%
                margin-top 0.2rem
                margin-bottom 0.2rem
                .shop_rating_order_left
                  float left
                  color #ff9a0d
                  .rating_section
                    float left
                    font-size 0.2rem
                    color #ff6000
                    margin-left 0.05rem
                  .order_section
                    float left
                    font-size 0.2rem
                    color #666
                    transform scale(.8)
                .shop_rating_order_right
                  float right
                  font-size 0
                  .delivery_style
                    transform-origin 0.7rem 0
                    transform scale(.7)
                    display inline-block
                    font-size 0.25rem
                    padding 0.02rem
                    border-radius 2px
                  .delivery_left
                    color #fff
                    margin-right -0.2rem
                    background-color #02a774
                    border 1px solid #02a774
                  .delivery_right
                    color #02a774
                    border 1px solid #02a774
              .shop_distance
                clearFix()
                width 100%
                font-size 0.25rem
                .shop_delivery_msg
                  float left
                  transform-origin 0
                  transform scale(.9)
                  color #666
                .segmentation
                  color #ccc
</style>
