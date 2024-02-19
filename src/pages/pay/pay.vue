<template>
  <div class="scroll-container">
    <van-nav-bar
    left-text="返回"
    left-arrow
    @click-left="$router.go(-1)"
    />
    <van-cell-group>
      <van-cell v-for="(item, index) in orderInfo.goodsList" :key="index" 
      :title="item.goodsName" 
      :value="`数量:${item.quantity},单价:${item.price},小计:${item.subtotal}`">
      </van-cell>
    </van-cell-group>

    <!-- 优惠券单元格 -->
    <van-coupon-cell
    :coupons="coupons"
    :chosen-coupon="chosenCoupon"
    @click="showCouponList = true"
    />
    <!-- 优惠券列表 -->
    <van-popup
    v-model="showCouponList"
    round
    position="bottom"
    style="height: 90%; padding-top: 4px;"
    >
    <van-coupon-list
        :show-exchange-bar="false"
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
    />
    </van-popup>

    <van-divider
    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
    收货信息
    </van-divider>
    <van-field 
      v-model="consignee" 
      required label="收货人" 
      placeholder="请输入收货人姓名"
      error-message="姓名不能为空"
    />
    <van-field 
      v-model="address" 
      required label="收货地址" placeholder="请输入收货地址"
      error-message="地址不能为空"
    />
    <van-field 
      v-model="phone" required label="联系电话" placeholder="请输入联系电话"
      error-message="电话不能为空"
    />
    <van-field v-model="remark" label="备注" placeholder="有需要，请备注"></van-field>

    <van-submit-bar
      :price="calculatedReallyAmount"
      button-text="付款"
      @submit="openPaymentDialog"
    ></van-submit-bar>
    <van-dialog v-model="showPaymentDialog" title="选择付款方式" @confirm="confirmPayment" :showCancelButton="true">
      <div class="countdown-container">
        订单剩余时间：<span class="countdown-time">{{ formatCountdownTime }}</span>
      </div>
      <van-radio-group v-model="selectedPaymentMethod">
        <van-cell-group>
          <van-cell v-for="(method, index) in paymentMethods" :key="index">
            <van-radio :name="method.value">
              {{ method.name }}
            </van-radio>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      
      
    </van-dialog>

    <van-popup v-model="showAlipayPopup"  style="text-align: center;">
      <img src="../../assets/imgs/alipay.jpg" alt="Alipay QR Code" class="popup-image" />
      <van-button type="danger" @click="closeAlipayPopup">关闭</van-button>
    </van-popup>

    <!-- 微信支付弹出层 -->
    <van-popup v-model="showWeChatPopup"  style="text-align: center;">
      <img src="../../assets/imgs/wechatpay.jpg" alt="WeChat QR Code" class="popup-image" />
      <van-button type="danger" @click="closeWeChatPopup">关闭</van-button>
    </van-popup>
  </div>
</template>

<script>
import { reqUserInfoAuto, reqUserMyCouponList } from '../../api';
const coupon = {
  available: 1,
  condition: '无使用门槛\n最多优惠12元',
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '1.5',
  unitDesc: '元',
};
export default {
    name: 'pay',
  data() {
    return {
      orderInfo: {
        goodsList: [
        { 
            goodsName: '小面', 
            quantity: 2, 
            price: 10.00,
            subtotal: 20.00 
        },
        { 
            goodsName: '包子', 
            quantity: 1, 
            price: 15.00,
            subtotal: 15.00 
        },
        {
            goodsName: '豆浆', 
            quantity: 1, 
            price: 2.5,
            subtotal: 2.5 
        }
        ],
        totalAmount: 37.5
      },
      consignee: '',
      address: '',
      phone: '',
      remark: '',
      showPaymentDialog: false, // 控制付款弹出层显示/隐藏
      selectedPaymentMethod: '', // 选择的付款方式
      paymentMethods: [
        { name: '支付宝', value: 'alipay' },
        { name: '微信支付', value: 'wechatpay' },
        // 添加其他付款方式
      ],
      countdown: 30 * 60, // 订单超时倒计时，单位为秒
      showAlipayPopup: false,
      showWeChatPopup: false,
      showCouponList: false, // 展示优惠券列表
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
    };
  },
  computed: {
    formatCountdownTime() {
      const minutes = Math.floor(this.countdown / 60);
      const seconds = this.countdown % 60;
      return `${minutes}分${seconds}秒`;
    },
    // 计算使用了优惠券后的金额
    calculatedReallyAmount() {
        const couponAmount = this.chosenCoupon > -1 ? this.coupons[this.chosenCoupon].value : 0;
        return this.orderInfo.totalAmount * 100 - couponAmount;
    }
  },
  methods: {
    onChange(index) {
      this.showCouponList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    },
    submitOrder() {
      console.log('提交订单');
    },
    openPaymentDialog() {
      // 打开付款弹出层时初始化选择的付款方式
      this.selectedPaymentMethod = '';
      this.showPaymentDialog = true;

      // 启动订单超时倒计时
      this.clearCountdown();
      this.startCountdown();
    },

    confirmPayment() {
      // 处理确认付款
      if (this.selectedPaymentMethod) {
        console.log(`选择了${this.selectedPaymentMethod}付款方式`);
        // 调用后端接口完成付款
        if (this.selectedPaymentMethod === 'alipay') {
          this.showAlipayPopup = true;
        } else if (this.selectedPaymentMethod === 'wechatpay') {
          this.showWeChatPopup = true;
        }
        // 成功后关闭弹出层和清除倒计时
        this.showPaymentDialog = false;
        this.clearCountdown();
      } else {
        this.$notify({ type: 'warning', message: '请选择付款方式' });
      }
    },
    closeAlipayPopup() {
      this.showAlipayPopup = false;
      // 其他关闭逻辑
    },

    closeWeChatPopup() {
      this.showWeChatPopup = false;
      // 其他关闭逻辑
    },

    startCountdown() {
      // 启动订单超时倒计时
      this.countdownTimer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          // 订单超时取消逻辑，这里可以调用后端接口取消订单
          this.clearCountdown();
          console.log('订单超时，自动取消');
        }
      }, 1000);
    },

    clearCountdown() {
      // 清除倒计时
      clearInterval(this.countdownTimer);
    },

    destroyed() {
      // 组件销毁时清除倒计时
      this.clearCountdown();
    },
  },
  mounted() {
    reqUserInfoAuto().then(v => {
        if (v.code === 200) {
            reqUserMyCouponList().then(res => {
                if (res.code === 200){
                    console.log(res)
                    this.myCouponList = res.data.map(backendItem => ({
                        batchName: backendItem.batchName,
                        // availableNum: backendItem.availableNum,
                        myCouponListInfo: backendItem.myCouponListInfoList.map(couponInfo => ({
                            couponId: couponInfo.couponId,
                            name: couponInfo.couponName,
                            customValidPeriod: couponInfo.validateTime + '过期',
                            value: couponInfo.amount,
                            valueDesc: couponInfo.amount,
                            unitDesc: couponInfo.type === 0 ? '元' : '折',
                            image: couponInfo.image,
                            // available: couponInfo,
                            condition: '实付金额满' + couponInfo.threshold + '元可用',
                            description: couponInfo.useRange === 0 ? '校内通用' : (couponInfo.useRange === 1 ? '校内指定商家可用' : '校内商家指定商品可用'),
                            // reason: couponInfo.reason,
                        })),
                    }));
                }
            })
        }
    })
  }
};
</script>

<style scoped>

body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}

/* 设置页面样式 */
html, body {
  height: 100%;
}

#app {
  height: 100%;
}
.van-submit-bar__button {
  background-color: #ff9147;
}

.container {
  padding: 20px;
}

.countdown-container {
  font-size: 14px;
  color: red; /* 设置为红色 */
  margin-top: 10px;
  text-align: center; /* 文本居中 */
}

.countdown-time {
  font-weight: bold; /* 加粗显示 */
}

.popup-image {
  width: 100%; /* 调整图片宽度，可以根据实际需要调整具体数值 */
  max-width: 400px; /* 设置最大宽度，避免图片过大 */
  height: auto; /* 保持宽高比例，自适应高度 */
}

.scroll-container {
  height: 100%;
  overflow-y: auto;
  border: 1px solid red; 
}
</style>
