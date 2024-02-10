<template>
  <div class="shop-header">
    <!-- <nav class="shop-nav" :style="{backgroundImage: `url(${mD.bgImg})`}">
      <a class="back" @click="$router.replace('/home')">
      <a class="back" @click="$router.go(-1)">
        <i class="iconfont iconjiantou-zuo"></i>
      </a>
    </nav> -->
    <van-nav-bar
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="shop-content" @click="toggleShopShow">
      <img class="content-image" :src="mD.avatar">
      <div class="header-content">
        <h2 class="content-title">
          <span class="content-tag">
            <span class="mini-tag">品牌</span>
          </span>
          <span class="content-name">{{mD.name}}</span>
          <i class="content-icon"></i>
        </h2>
        <div class="shop-message">
          <span class="shop-message-detail">{{mD.rating}}</span>
          <span class="shop-message-detail">月售{{mD.monthSales}}单</span>
          <span class="shop-message-detail">
            {{mD.description}}
            <span>约{{ 30 }}分钟</span>
          </span>
          <span class="shop-message-detail">距离{{ 800 }} 米</span>
        </div>
      </div>
    </div>

    <div class="shop-header-discounts" v-if="mD.supports" @click="toggleSupportShow">
      <div class="discounts-left">
        <div class="activity" :class="supportClasses[mD.supports[0].type]">
          <span class="content-tag">
            <span class="mini-tag">{{mD.supports[0].name}}</span>
          </span>
          <span class="activity-content ellipsis">{{mD.supports[0].content}}</span>
        </div>
      </div>
      <div class="discounts-right">
        {{mD.supports.length}}个优惠
      </div>
    </div>

    <transition name="fade">
      <div class="shop-brief-modal" v-show="shopShow">
        <div class="brief-modal-content">
          <h2 class="content-title">
          <span class="content-tag">
            <span class="mini-tag">品牌</span>
          </span>
            <span class="content-name">{{mD.name}}</span>
          </h2>
          <ul class="brief-modal-msg">
            <li>
              <h3>{{mD.rating}}</h3>
              <p>评分</p>
            </li>
            <li>
              <h3>{{mD.monthSales}}单</h3>
              <p>月售</p>
            </li>
            <li>
              <h3>{{mD.description}}</h3>
              <p>约{{info.deliveryTime}}分钟</p>
            </li>
            <li>
              <h3>{{ 2 }}元</h3>
              <p>配送费用</p>
            </li>
            <li>
              <h3>{{ 777 }}</h3>
              <p>距离</p>
            </li>
          </ul>
          <h3 class="brief-modal-title">
            <span>公告</span>
          </h3>
          <div class="brief-modal-notice">
            {{mD.bulletin}}
          </div>
          <div class="mask-footer" @click="toggleShopShow">
            <span class="iconfont iconguanbi"></span>
          </div>
        </div>
        <div class="brief-modal-cover"></div>
      </div>
    </transition>

    <transition name="fade">
      <div class="activity-sheet" v-show="supportShow">
        <div class="activity-sheet-content">
          <h2 class="activity-sheet-title">优惠活动</h2>
          <ul class="list">
            <li class="activity-item" v-for="(support, index) in info.supports"
                :key="index" :class="supportClasses[support.type]">
            <span class="content-tag">
                <span class="mini-tag">{{support.name}}</span>
              </span>
              <span class="activity-content">{{support.content}}</span>
            </li>
          </ul>
          <div class="activity-sheet-close" @click="toggleSupportShow">
            <span class="iconfont iconguanbi"></span>
          </div>
        </div>
        <div class="activity-sheet-cover"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {get} from "../../api";
export default {
  data () {
    return {
      supportClasses: ['activity-green', 'activity-red', 'activity-orange'],
      shopShow: false,
      supportShow: false,
      mD: {}
    }
  },
  computed: {
    ...mapState(['info'])
  },
  mounted() {
    this.getMerchant()
  },
  methods: {
    toggleShopShow () {
      this.shopShow = !this.shopShow
    },
    toggleSupportShow () {
      this.supportShow = !this.supportShow
    },
    async getMerchant(){
      const res = await get(`/user/merchant/details/${this.$route.params.id}`)
      this.mD = res.data
    },
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .shop-header
    height 100%
    position relative
    background #fff
    color #fff
    overflow hidden
    font-size 0.3rem
    .shop-nav
      background-size cover
      background-repeat no-repeat
      height 0.7rem
      padding 0.1rem 0.2rem
      position relative
      &::before
        content ""
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        background-color rgba(119, 103, 137, .43)
      .back
        position: absolute
        top: 0.2rem
        left: 0
        .iconjiantou-zuo
          display: block
          padding: 0.1rem
          font-size: 0.4rem
          color: #fff
    .shop-content
      padding 0.6rem 0.4rem 0.1rem 0.2rem
      position relative
      display flex
      background #fff
      text-align center
      img
        box-shadow: 0 0 0.4vw 0 rgba(0, 0, 0, .2);
        position: absolute;
        top: 0;
        left: 50%;
        width: 1.2rem
        height: 1.2rem
        border-radius: 2px
        margin-left -0.66rem
        margin-top -0.65rem
      .header-content
        flex 1
        width 72%
        .content-title
          font-size 0.4rem
          line-height 0.48rem
          font-weight 700
          white-space nowrap
          position relative
          display flex
          align-items center
          justify-content center
          color #333
          .content-tag
            border-radius 2px
            background-image linear-gradient(90deg, #fff100, #ffe339)
            width 0.72rem
            height: 0.36rem
            margin-right 0.2rem
            color #6a3709
            font-style normal
            font-weight 700
            position relative
            .mini-tag
              position absolute
              left 0
              top 0
              right -100%
              bottom -100%
              font-size 0.48rem
              font-weight 600
              transform scale(.5)
              transform-origin 0 0
              display flex
              align-items center
              justify-content center
          .content-name
            font-weight 700
            text-align left
            overflow hidden
            text-overflow ellipsis
          .content-icon
            width 0.4rem
            position relative
            height 0.32rem
            &::after
              content ""
              border-style solid
              border-width: 0.12rem 0 0.12rem 0.14rem
              border-color transparent transparent transparent rgba(0, 0, 0, .67)
              position absolute
              left 0.16rem
              top 0.06rem
      .shop-message
        white-space nowrap
        height 0.24rem
        margin-top 0.16rem
        font-size 0.22rem
        color #333
        .shop-message-detail:not(:last-child)::after
          content " \B7 "
          opacity .2
      .shop-notice
        width 63%
        font-size 0.22rem
        font-weight 300
        color #999
        overflow hidden
        text-overflow ellipsis
        margin 0.16rem auto 0.2rem
        white-space nowrap
    .shop-header-discounts
      display flex
      background #fff
      border-radius 0.02rem
      border 1px solid #eee
      padding 0.1rem 0.14rem
      font-size 0.22rem
      color #666
      margin 0 0.6rem
      align-items center
      .discounts-left
        flex 1
        overflow hidden
        .activity
          display flex
          align-items center
          .content-tag
            border-radius 0.02rem
            width 0.5rem
            height 0.26rem
            margin-right 0.1rem
            color #fff
            font-style normal
            font-weight 700
            position relative
            background-color rgb(112, 188, 70)
            .mini-tag
              position absolute
              left 0
              top 0
              right -100%
              bottom -100%
              font-size 0.36rem
              font-weight 600
              transform scale(.5)
              transform-origin 0 0
              display flex
              align-items center
              justify-content center
      .discounts-right
        width 1rem
        flex-shrink 0
        position relative
        padding-right 0.2rem
        text-align right
        &::after
          content ""
          display block
          border-style solid
          border-width 0.08rem 0.08rem 0
          border-color rgba(0, 0, 0, .57) transparent transparent
          position absolute
          top 50%
          transform translateY(-50%)
          right 0
    .shop-brief-modal
      position fixed
      top 0
      left 0
      right 0
      bottom 0
      display flex
      justify-content center
      align-items center
      z-index 52
      flex-direction column
      color #333
      &.fade-enter-active,&.fade-leave-active
        transition opacity .5s
      &.fade-enter,&.fade-leave-to
        opacity 0
      .brief-modal-cover
        position absolute
        width 100%
        height 100%
        top 0
        left 0
        background-color rgba(0, 0, 0, .5)
        z-index 1
      .brief-modal-content
        position relative
        width 80%
        padding 0.5rem 0.4rem
        border-radius 0.1rem
        background #fff
        z-index 99
        display flex
        flex-direction column
        .content-title
          font-size 0.4rem
          line-height 0.48rem
          font-weight 700
          white-space nowrap
          position relative
          display flex
          align-items center
          justify-content center
          > span
            font-weight 600
          .content-tag
            border-radius 0.04rem
            background-image linear-gradient(90deg, #fff100, #ffe339)
            width 0.72rem
            height: 0.36rem
            margin-right 0.2rem
            color #6a3709
            font-style normal
            position relative
            .mini-tag
              position absolute
              left 0
              top 0
              right -100%
              bottom -100%
              font-size 0.48rem
              transform scale(.5)
              transform-origin 0 0
              display flex
              align-items center
              justify-content center
        .brief-modal-msg
          display flex
          margin 0.4rem -0.2rem 0
          > li
            flex 1
            text-align center
            > h3
              font-size 0.3rem
              font-weight 600
              color #333
              margin-bottom 0.16rem
            > p
              font-size 0.24rem
              color #999
        .brief-modal-title
          position relative
          text-align center
          margin 0.3rem auto 0.3rem
          width 1.7rem
          background-image linear-gradient(90deg, #fff, #333 50%, #fff)
          background-size 100% 0.02rem
          background-position 50%
          background-repeat no-repeat
          > span
            font-size 0.24rem
            padding 0 0.12rem
            color #999
            background-color #fff
        .brief-modal-notice
          font-size 0.26rem
          line-height 1.54
          color #333
          overflow-y auto
        .mask-footer
          position absolute
          bottom -1.2rem
          left 50%
          padding 0.12rem
          border 1px solid rgba(255, 255, 255, .7)
          border-radius 50%
          transform translateX(-50%)
          span
            font-size 0.32rem
            color rgba(255, 255, 255, .7)
    .activity-sheet
      position fixed
      top 0
      left 0
      width 100%
      height 100%
      z-index 99
      .activity-sheet-content
        position absolute
        background-color #f5f5f5
        box-shadow 0 -0.02rem 0.1rem 0 rgba(0, 0, 0, .4)
        bottom 0
        left 0
        right 0
        z-index 100
        padding 0.4rem 0.6rem
        box-sizing border-box
        transition transform .2s
        will-change transform
        color #333
        .activity-sheet-title
          text-align center
          font-size 0.4rem
          font-weight 600
          margin-bottom 0.4rem
        .list
          font-size 0.32rem
          height 3.2rem
          overflow-y auto
          .activity-item
            margin-bottom 0.24rem
            display flex
            font-size 0.26rem
            align-items center
            &.activity-green
              .content-tag
                background-color rgb(112, 188, 70)
            &.activity-red
              .content-tag
                background-color rgb(240, 115, 115)
            &.activity-orange
              .content-tag
                background-color: rgb(241, 136, 79)
            .content-tag
              display inline-block
              border-radius 0.04rem
              width 0.72rem
              height 0.36rem
              margin-right 0.2rem
              color #fff
              font-style normal
              position relative
              .mini-tag
                position absolute
                left 0
                top 0
                right -100%
                bottom -100%
                font-size 0.48rem
                transform scale(.5)
                transform-origin 0 0
                display flex
                align-items center
                justify-content center
        .activity-sheet-close
          position absolute
          right 0.12rem
          top 0.2rem
          width 0.5rem
          height 0.5rem
          > span
            font-size 0.4rem
      .activity-sheet-cover
        position absolute
        width 100%
        height 100%
        top 0
        left 0
        background-color rgba(0, 0, 0, .5)
</style>
