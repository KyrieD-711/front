<template>
  <div id="app">
    <router-view/>
    <footerNav/>
  </div>
</template>

<script>
import footerNav from './components/footerNav/footerNav'
import {mapActions, mapState} from 'vuex'
import {getStorage} from "./utils/storage";
export default {
  name: 'App',
  components: {
    footerNav
  },
  mounted () {
    // this.getCityPosition()
    // this.getUserInfoAuto()
    console.log(getStorage('token'))
  },
  computed: {
    ...mapState(['cityPosition'])
  },
  methods: {
    ...mapActions(['getCityPosition', 'getCityDetailedInfo', 'getShopList', 'getUserInfoAuto'])
  },
  watch: {
    cityPosition (value) {
      this.$nextTick(() => {
       /* this.getCityDetailedInfo()
        this.getShopList()*/
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scope>
#app
  width 100%
  height 100%
</style>
