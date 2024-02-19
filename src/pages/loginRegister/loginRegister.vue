<template>
  <div class="loginRegister">
    <topHeader title="点击返回" @click.native="$router.push('/home')">
      <span class="loginBack" slot="left"><i class="iconfont iconjiantou-zuo"></i></span>
      <span slot="right"></span>
    </topHeader>
    <div class="loginContent">
      <h3 class="login_title">校园外卖</h3>
      <div class="login_types">
        <span class="login_msg" :class="{on:loginWay}" @click="loginWay = true">短信登录</span>
        <span class="login_pwd" :class="{on:!loginWay}" @click="loginWay = false">密码登录</span>
      </div>
      <div class="login_content">
        <form :class="{on_form:loginWay}" @submit.prevent="login">
          <section class="phone_num">
            <!-- <input type="tel" placeholder="手机号" class="num_input" maxlength="11" v-model="phone">
            <button class="send_verification" :disabled="!rightPhone" :class="{right_phone:rightPhone,computed_time:computedFlag}" @click.prevent="getCode">
              {{computeTime ? `已发送${computeTime}s`:'发送验证码'}}
            </button> -->
            <van-field v-model="phone" label="手机号" placeholder="请输入手机号" />
          </section>
          <section class="verification_num">
            <!-- <input type="tel" placeholder="验证码" class="receive_verification" maxlength="6" v-model="code"> -->
            <van-field
              v-model="code"
              center
              clearable
              label="短信验证码"
              placeholder="请输入短信验证码"
            >
              <template #button>
                <van-button size="small" type="primary" @click="getVerificationCode">发送验证码</van-button>
              </template>
            </van-field>
            <div class="some_info">温馨提示：未注册过帐号的手机号，登录时将自动注册，且代表已同意<span>《用户服务协议》</span></div>
          </section>
          <section class="login_submit">
            <button class="login_btn" @click="loginByPhone">登录</button>
            <a href="javascript: void(0)" class="about_me">关于我们</a>
            <a href="javascript: void(0)" class="about_me" @click="goRegister()" style="color: blue; cursor: pointer;">注册</a>
          </section>
        </form>
        <form :class="{on_form:!loginWay}" @submit.prevent="login">
          <section class="phone_num">
            <input type="tel" placeholder="用户名" class="num_input" maxlength="20" v-model="username">
          </section>
          <section class="pwd_num">
            <input type="password" placeholder="密码" class="receive_verification" maxlength="25" v-model="password" v-if="showPwd === false">
            <input type="text" placeholder="密码" class="receive_verification" maxlength="25" v-model="password" v-else>
            <div class="switch_button" @click="ifShowpwd" :class="{on_btn:showPwd,off_btn:!showPwd}">
              <div class="switch_circle"></div>
              <span class="switch_text">显示密码</span>
            </div>
          </section>
          <section class="verification_num">
            <!-- <input type="tel" placeholder="验证码" class="receive_verification" maxlength="4" v-model="captcha_code"> 
            <img :src="captchas.code" class="verification_img" @click="getCaptchas"> -->
           <div class="some_info">温馨提示：用户名登录，默认已同意<span>《用户服务协议》</span>
           </div>
          </section>
          <section class="login_submit">
            <button class="login_btn">登录</button>
            <a href="javascript: void(0)" class="about_me">关于我们</a>
            <a href="javascript: void(0)" class="about_me" @click="goRegister()" style="color: blue; cursor: pointer;">注册</a>
          </section>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import topHeader from '../../components/topHeader/topHeader'
import { MessageBox } from 'mint-ui'
import { mapActions, mapState } from 'vuex'
import {reqCaptchas, reqLoginByPhone, reqPwdLogin, reqUserInfoAuto} from '../../api'
import {setStorage} from "../../utils/storage";

export default {
  name: 'loginRegister',
  data () {
    return {
      loginWay: false, // 切换登录方式，true显示短信登录界面
      computeTime: 0, // 验证码倒计时
      computedFlag: false, // 计数标志，当计数时切换到不可点击的按钮颜色
      phone: '', // 手机号
      password: '123456', // 密码
      showPwd: false, // 是否显示密码
      code: '', // 短信验证码
      username: 'admin', // 用户名
      // eslint-disable-next-line
      captcha_code: '' // 图形验证码
    }
  },
  mutations: {
    
  },
  computed: {
    rightPhone () {
      return /^1[345789]\d{9}$/.test(this.phone)
    },
    ...mapState(['captchas'])
  },
  mounted () {
    this.getCaptchas()
  },
  methods: {
    goRegister () {
      this.$router.push('/register');
    },
    loginByPhone(){
      console.log('phone',this.phone,'code',this.code)
      reqLoginByPhone(this.phone, this.code).then(res => {
        console.log(res.data)
        if (res.code === 200) {
          // 登录成功
          // 保存用户信息
          console.log('fwefjnweifghie')
          setStorage('token','Bearer_' + res.data)
          this.$store.dispatch('getUserInfoAuto')
          MessageBox('欢迎', '登录成功').then(action => {
            this.$router.replace('/home')
          })
        }
      })
    },
    // 异步请求图片验证码
    // ...mapActions(['getCaptchas']),
    getVerificationCode(){
      reqCaptchas().then(res => {
        console.log(res.data)
        this.code = res.data
      })
    },
    // 异步获取短信验证码及等待时间
    // getCode () {
    //   if (!this.computeTime) {
    //     this.computedFlag = true
    //     this.computeTime = 30
    //     const computedNum = setInterval(() => { // 设置已发送验证码的等待时间
    //       this.computeTime -= 1
    //       if (this.computeTime === 0) {
    //         clearInterval(computedNum)
    //         this.computedFlag = false
    //       }
    //     }, 1000)
    //   }
    // },
    // 是否显示密码
    ifShowpwd () {
      if (this.showPwd) {
        this.showPwd = false
      } else {
        this.showPwd = true
      }
    },
    // 异步登录
    async login ({commit}) {
      // 前台表单验证
      if (this.loginWay) {
        // 短信登录
        // const {rightPhone, code} = this
        const {rightPhone} = this
        if (!rightPhone) {
          MessageBox('提示', '手机号输入不正确')
        }
        // else if (!/^\d{6}$/.test(code)) {
        //   MessageBox('提示', '验证码输入不正确')
        // }
      } else {
        const {username, password, captcha_code} = this
        if (!username) {
          MessageBox('提示', '帐号输入不正确')
        } else if (!password) {
          MessageBox('提示', '密码输入不正确')
        }
        // else if (!captcha_code) {
        //   MessageBox('提示', '验证码输入不正确')
        // }
        const result = await reqPwdLogin({username, password})
        if (result.code === 400) {
          MessageBox('提示', result.errorMsg).then(action => {
            // this.getCaptchas()
            
          })
        } else if (result.code === 200){
          setStorage('token','Bearer_' + result.data.token)
          this.$store.dispatch('getUserInfoAuto')
          // commit('setUser',result.data)
          MessageBox('欢迎', '登录成功').then(action => {
            this.$router.replace('/home')
          })
        }
      }
    }
  },
  components: {
    topHeader,
    MessageBox
  },
  watch: {
    loginWay (value) {
      if (this.loginWay === true) {
        // MessageBox('提示', '暂未开通手机验证码登录！')
        // MessageBox('提示',)
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scope>
  .loginRegister
    width 100%
    height 100%
    .loginBack
      font-size 0.3rem
    .loginContent
      width 100%
      height 100%
      text-align center
      display flex
      justify-content center
      align-items center
      flex-direction column
      .login_title
        margin-top 0.5rem
        padding 0.5rem 0
        font-size 0.7rem
        font-weight bold
        color #3a8fe6
      .login_types
        font-size 0.25rem
        .login_msg
          font-size 0.25rem
          margin-right 0.3rem
          padding 0.1rem 0
        .login_pwd
          font-size 0.25rem
          margin-left 0.3rem
          padding 0.1rem 0
        .on
          color #3a8fe6
          border-bottom 2px solid #3a8fe6
      .login_content
        margin-top 0.1rem
        width 80%
        margin-top 0.5rem
        font-size 0.3rem
        form
          display none
        .phone_num
          width 100%
          position relative
          .num_input
            width 100%
            height 0.7rem
            border 1px solid #c0c4cc
            border-radius 0.1rem
            box-sizing border-box
            padding-left 0.2rem
            font-size 0.3rem
          .send_verification
            position absolute
            border none
            outline none
            top 18%
            right 3%
            background-color #c0c4cc
            color #909399
            padding 0.1rem
            font-size 0.2rem
            border-radius 0.1rem
            &.right_phone
              background-color #3a8fe6
              color white
            &.computed_time
              background-color #c0c4cc
              color #909399
        .verification_num,
        ,.pwd_num
          margin-top 0.2rem
          width 100%
          position relative
          .receive_verification
            width 100%
            height 0.7rem
            border 1px solid #c0c4cc
            border-radius 0.1rem
            box-sizing border-box
            padding-left 0.2rem
            font-size 0.3rem
          .switch_button
            font-size 0.24rem
            border 1px solid #ddd
            border-radius 0.16rem
            transition background-color .3s,border-color .3s
            padding 0 0.04rem
            padding-right 0.2rem
            width 0.6rem
            height 0.32rem
            line-height 0.32rem
            color #fff
            position absolute
            top 50%
            right 0.2rem
            transform translateY(-50%)
            &.off_btn
              background #ffffff
            &.on_btn
              background #02a774
              .switch_text
                color #ddd
              .switch_circle
                transform translateX(0.62rem)
            >.switch_circle
              position absolute
              top -0.02rem
              left -0.02rem
              width 0.32rem
              height 0.32rem
              border 1px solid #ddd
              border-radius 50%
              background #fff
              box-shadow 0 0.04rem 0.08rem 0 rgba(0,0,0,.1)
              transition transform .3s
          .verification_img
            position absolute
            display block
            top 0
            right 0.1rem
            width 36%
          .some_info
            padding 0.2rem
            color #909399
            line-height 0.3rem
            font-size 0.2rem
            span
              color #38ab00
        .login_submit
          width 100%
          .login_btn
            width 100%
            border none
            outline none
            background-color #3a8fe6
            padding 0.15rem 0
            border-radius 0.1rem
            font-weight bold
            color white
            font-size 0.3rem
          .about_me
            display block
            text-decoration none
            color #909399
            font-size 0.2rem
            margin-top 0.3rem
      .on_form
        display block !important
</style>
