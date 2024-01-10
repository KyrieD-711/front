<template>
  <nav class="msite_nav">
    <div class="swiper-container" v-if="foodTypes.length">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(foodtypes, index) in foodTypesArr" :key="index">
          <span @click="enDetail(l.merchantId)" class="link_to_food" v-for="(l, index) in mergeTypes.slice(0,8)" :key="index">
            <div class="food_container">
              <img :src="l.image"/>
            </div>
            <span>{{ l.name }}</span>
          </span>

        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
    <img v-else src="./imgs/msite_back.svg" alt="msite_back">
  </nav>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import {mapActions, mapState} from 'vuex'
export default {

  name: 'foodTypes',
  data () {
    return {
      images:[
        require('../../assets/imgs/hot_pot.png'),
        require('../../assets/imgs/milk_tea.png'),
        require('../../assets/imgs/shop.png'),
        require('../../assets/imgs/noodle.png'),
        require('../../assets/imgs/hamburg.png'),
        require('../../assets/imgs/buffet.png'),
        require('../../assets/imgs/bread.png'),
        require('../../assets/imgs/basket.png'),
      ]
    }
  },
  mounted () {
    this.getFoodTypes()
  },
  computed: {
    ...mapState(['foodTypes']),
    mergeTypes(){
      return this.foodTypes.map((it,index)=>({
        ...it,image:this.images[index]
      }))
    },
    foodTypesArr () {
      const {foodTypes} = this
      const bigArr = []
      let smallArr = []
      foodTypes.forEach((element,index) => {
        element.image=this.images[index]
        if (smallArr.length < 8) {
          smallArr.push(element)
        }
        if (smallArr.length === 8) {
          bigArr.push(smallArr)
          smallArr = []
        }
      })
      return bigArr
    }
  },
  methods: {
    ...mapActions(['getFoodTypes']),
    enDetail(l){
      /*this.$router.push({
        path:'login',
        query:{
          id:l
        }
        // params:{}
      })*/
    }
  },
  watch: {
    foodTypes (value) {
      this.$nextTick(() => {
        /* eslint-disable no-new */
        new Swiper('.swiper-container', {
          loop: true,
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scope>
  .msite_nav
    margin-top 0.1rem
    background #fff
    .swiper-container
      width 100%
      height 100%
      padding-bottom 0.3rem
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            text-decoration none
            .food_container
              display block
              width 100%
              text-align center
              img
                display inline-block
                width 1rem
                height 1rem
            span
              display block
              text-align center
              font-size 0.2rem
              color #666
      .swiper-pagination
        position absolute
        bottom -0.1rem
        >span.swiper-pagination-bullet-active
          background #00a4f0
</style>
