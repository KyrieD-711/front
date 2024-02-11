<template>
  <nav class="msite_nav">
    <div class="swiper-container" v-if="foodTypes.length">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(foodtypes, outIndex) in foodTypesArr" :key="outIndex">
          <span @click="enDetail(foodType.id)" class="link_to_food" v-for="(foodType, innerIndex) in mergeTypes.slice(0,8)" :key="innerIndex">
            <div class="food_container">
              <img :src="foodType.image" />
            </div>
            <span>{{ foodType.name }}</span>
          </span>
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
    <div class="swiper-container" v-else>
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <span @click="enDetail(index + 1)" class="link_to_food" v-for="(image, index) in images.slice(0,8)" :key="index">
            <div class="food_container" >
              <img :src="image" />
              <!-- <img  :src="require('../../assets/imgs/rice.png')" alt="msite_back">
              <img  :src="require('../../assets/imgs/hot_pot.png')" alt="msite_back">
              <img  :src="require('../../assets/imgs/noodle.png')" alt="msite_back">
              <img  :src="require('../../assets/imgs/shop.png')" alt="msite_back">
              <img  :src="require('../../assets/imgs/buffet.png')" alt="msite_back">
              <img  :src="require('../../assets/imgs/basket.png')" alt="msite_back">
              <img  :src="require('../../assets/imgs/hamburg.png')" alt="msite_back">
              <img  :src="require('../../assets/imgs/milk_tea.png')" alt="msite_back"> -->
            </div>
            <span>
              {{names[index]}}
            </span>
          </span>
        </div>
      </div>
    </div>
    
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
        require('../../assets/imgs/rice.png'),
        require('../../assets/imgs/hot_pot.png'),
        require('../../assets/imgs/noodle.png'),
        require('../../assets/imgs/shop.png'),
        require('../../assets/imgs/bread.png'),
        require('../../assets/imgs/buffet.png'),
        require('../../assets/imgs/basket.png'),
        require('../../assets/imgs/hamburg.png'),
        require('../../assets/imgs/milk_tea.png'),
      ],
      names: [
        '米饭',
        '火锅',
        '面食',
        '便利店',
        '面包',
        '自助',
        '水果',
        '汉堡',
        '奶茶',
      ]
    }
  },
  mounted () {
    this.getFoodTypes()
  },
  computed: {
    ...mapState(['foodTypes']),
    mergeTypes(){
      return this.foodTypes.map((it,innerIndex)=>({
        ...it,image:this.images[innerIndex]
      }))
    },
    foodTypesArr () {
      const {foodTypes} = this
      const bigArr = []
      let smallArr = []
      foodTypes.forEach((element,innerIndex) => {
        element.image = this.images[innerIndex]
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
    enDetail(id){
      console.log(id)
      this.$router.push({
        path:'/shopListByFoodType',
        query:{
          id: id
        }
        // params:{}
      })
    },
    
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
