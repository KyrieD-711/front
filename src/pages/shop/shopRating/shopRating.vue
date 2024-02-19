<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="ratingselect">
        <div class="rating-type border-1px">
          <span class="block positive" @click="selectType=i" v-for="(a,i) in attitude" :key="i"
                :class="{active: (selectType === i)}">
            {{a.t}}<span class="count">{{filterD[a.k]}}</span>
          </span>
        </div>
        <!-- <div class="switch" :class="{on: onlyShowText}" @click="toggleOnlyShowText">
          <span class="iconfont iconqueding"></span>
          <span class="text">只看有内容的评价</span>
        </div> -->
      </div>

      <!-- <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(rating, index) in filterRatings" :key="index">
            <div class="avatar">
              <img :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{ rating.username }}</h1>
              <div class="star-wrapper">
                <star :score="rating.score" :size="24" />
                <span class="delivery">{{ rating.deliveryTime }}</span>
              </div>
              <p class="text">{{ rating.text }}</p>
              <div class="recommend">
                <span class="iconfont" :class="rating.rateType === 0 ? 'icontuijiansel':'icontucao-tianchong'"></span>
                <span class="item" v-for="(item, index) in rating.recommend" :key="index">{{ item }}</span>
              </div>
              <div class="time">{{ rating.rateTime }}</div>
            </div>
          </li>
        </ul>
      </div> -->
      <div v-if="loading">
        <van-skeleton :row="3" :loading="loading" avatar/>
      </div>
      <div v-else>
        <van-cell-group>
          <!-- 评论列表 -->
          <!--          <van-list v-model="reviewList" :finished="finished">-->
          <van-cell
            v-for="(item, index) in filterList"
            :key="index"
            :title="item.username"
            :label="item.content"
            :icon="item.userAvatar"
            @click="onDetail(item.reviewId)"
          >
            {{ item.createTime }}
          </van-cell>
          <!--          </van-list>-->
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import rice from '../../../assets/imgs/rice.png'
import BScroll from 'better-scroll'
import {mapState, mapGetters} from 'vuex'
import star from '../../../components/stars/star'
const attitude=[
  {k:'all',t:'全部'},
  {k:'satisfy',t:'满意'},
  {k:'dissatisfy',t:'不满意'}]
export default {
  data() {
    return {
      onlyShowText: true, // 是否只显示有评价的
      selectType: 2,// 选择的评价类型（0满意，1不满意，2全部
      reviewList: [
        {
          reviewId: 1,
          username: 'mascot',
          userAvatar: rice,
          content: '这个麻辣香锅真的很好吃',
          createTime: '2024-07-12 12:23:34',
          rating: 3.8,
        },
        {
          reviewId: 2,
          username: 'ky',
          userAvatar: rice,
          content: '第一次点就踩雷，集美们不要点，千万不要点',
          createTime: '2024-02-11 09:23:34',
          rating: 2.1,
        }
      ],
      loading: false,
      finished: true,
      attitude
    }
  },
  mounted() {
    // this.$store.dispatch('getShopRatings', () => {
    //   this.$nextTick(() => {
    //     // eslint-disable-next-line
    //     new BScroll(this.$refs.ratings, {
    //       click: true
    //     })
    //   })
    // })
  },
  components: {
    star
  },
  computed: {
    filterList() {
      switch (this.selectType) {
        case 1:
          return this.reviewList.filter(it=>it.rating<=3)
        case 2:
          return this.reviewList.filter(it=>it.rating>3)
        default:
          return this.reviewList;
      }
    },
    filterD(){
      return this.attitude.reduce((pre,cur)=>{
        if (cur.k==='all') pre[cur.k]=this.reviewList.length
        else if (cur.k==='satisfy') pre[cur.k]=this.reviewList.filter(it=>it.rating>3).length
        else pre[cur.k]=this.reviewList.filter(it=>it.rating<=3).length
        return pre
      },{})
    }
    // ...mapState(['info', 'ratings']),
    // ...mapGetters(['positiveSize']),
    // filterRatings () {
    //   const {ratings, onlyShowText, selectType} = this
    //   // 产生过滤后的评论数组
    //   return ratings.filter(rating => {
    //     const {rateType, text} = rating
    //     return (selectType === 2 || selectType === rateType) && (!onlyShowText || text.length > 0)
    //   })
    // }
  },
  methods: {
    // toggleOnlyShowText () {
    //   this.onlyShowText = !this.onlyShowText
    // }
    onDetail(id){
      console.log(id)
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
.comment-item {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ddd;
  margin-right: 10px;
}

.comment-content {
  flex: 1;
}

.user-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;  /* 圆形头像的样式 */
}

.comment-text {
  font-size: 14px;
}
  @import "../../../common/stylus/mixins.styl"
  .ratings
    position: absolute
    top: 3.65rem
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    background: #fff
    .overview
      display: flex
      padding: 0.2rem 0
      .overview-left
        flex: 0 0 2.5rem
        padding: 0.1rem 0
        width: 2.5rem
        border-right: 0.02rem solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 2.2rem
          width: 2.2rem
        .score
          margin-bottom: 0.12rem
          line-height: 0.56rem
          font-size: 0.48rem
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 0.16rem
          line-height: 0.24rem
          font-size: 0.24rem
          color: rgb(7, 17, 27)
        .rank
          line-height: 0.2rem
          font-size: 0.2rem
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 0.12rem 0 0.12rem 0.15rem
        @media only screen and (max-width: 320px)
          padding-left: 0.12rem
        .score-wrapper
          margin-bottom: 0.16rem
          font-size: 0
          .title
            display: inline-block
            line-height: 0.36rem
            vertical-align: top
            font-size: 0.24rem
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            margin: 0 0.24rem
            vertical-align: top
          .score
            display: inline-block
            line-height: 0.36rem
            vertical-align: top
            font-size: 0.24rem
            color: rgb(255, 153, 0)
        .delivery-wrapper
          font-size: 0
          .title
            line-height: 0.36rem
            font-size: 0.24rem
            color: rgb(7, 17, 27)
          .delivery
            margin-left: 0.24rem
            font-size: 0.24rem
            color: rgb(147, 153, 159)
    .split
      width: 100%
      height: 0.1rem
      border-top: 0.02rem solid rgba(7, 17, 27, 0.1)
      border-bottom: 0.02rem solid rgba(7, 17, 27, 0.1)
      background: #f3f5f7
    .ratingselect
      .rating-type
        padding: 0
        margin: 0 0.36rem
        border-1px(rgba(7, 17, 27, 0.1))
        font-size 0.3rem
        .block
          display: inline-block
          padding: 0.16rem 0.24rem
          margin-right: 0.16rem
          line-height: 0.32rem
          border-radius: 0.05rem
          font-size: 0.24rem
          color: rgb(77, 85, 93)
          background: rgba(77, 85, 93, 0.2)
          &.active
            background: $blue
            color: #fff
          .count
            margin-left: 0.04rem
            font-size: 0.16rem
      .switch
        padding: 0.24rem 0.36rem
        line-height: 0.48rem
        border-bottom: 0.02rem solid rgba(7, 17, 27, 0.1)
        color: rgb(147, 153, 159)
        font-size: 0
        &.on
          .iconqueding
            color: $blue
        .iconqueding
          display: inline-block
          vertical-align: top
          margin-right: 0.08rem
          font-size: 0.48rem
        .text
          display: inline-block
          vertical-align: top
          font-size: 0.24rem
    .rating-wrapper
      padding: 0 0.36rem
      .rating-item
        display: flex
        padding: 0.36rem 0
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 0.56rem
          width: 0.56rem
          margin-right: 0.24rem
          img
            border-radius: 50%
            width 0.56rem
            height 0.56rem
        .content
          position: relative
          flex: 1
          .name
            margin-bottom: 0.08rem
            line-height: 0.24rem
            font-size: 0.2rem
            color: rgb(7, 17, 27)
          .star-wrapper
            margin-bottom: 0.12rem
            font-size: 0
            .star
              display: inline-block
              margin-right: 0.12rem
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height: 0.24rem
              font-size: 0.2rem
              color: rgb(147, 153, 159)
          .text
            margin-bottom: 0.16rem
            line-height: 0.36rem
            color: rgb(7, 17, 27)
            font-size: 0.24rem
          .recommend
            line-height: 0.32rem
            font-size: 0
            .icontuijiansel, .icontucao-tianchong, .item
              display: inline-block
              margin: 0 0.16rem 0.08rem 0
              font-size: 0.18rem
            .icontuijiansel
              color: $yellow
            .icontuijiansel
              color: rgb(147, 153, 159)
            .item
              padding: 0 0.12rem
              border: 0.02rem solid rgba(7, 17, 27, 0.1)
              border-radius: 0.02rem
              color: rgb(147, 153, 159)
              background: #fff
          .time
            position: absolute
            top: 0
            right: 0
            line-height: 0.24rem
            font-size: 0.2rem
            color: rgb(147, 153, 159)
</style>
