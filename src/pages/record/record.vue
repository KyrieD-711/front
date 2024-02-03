<template>
  <div class="page">
     <!-- 返回栏 -->
    <van-nav-bar
      title="用户积分"
      left-arrow
      @click-left="goBack"
    />  
    <!-- 用户总积分展示 -->
    <van-cell title="总积分" :value="userInfo.record" />

    <!-- 兑换优惠券按钮 -->
    <div class="center-button">
      <van-button type="info" @click="showExchangeDialog">兑换优惠券</van-button>
    </div>

    <!-- 兑换记录 -->
    <van-cell-group title="兑换记录">
      <van-cell v-for="(records, index) in exchangeRecords" :key="index">
        <span style="display: inline-flex;">
          兑换：{{ records.couponName }}，花费：{{ records.costRecord }}积分，兑换时间：{{ records.receivedTime}}
        </span>
      </van-cell>
    </van-cell-group>

    <!-- 兑换对话框 -->
    <van-dialog :close-on-click-overlay="false" v-model="showDialog" title="兑换优惠券" show-cancel-button @confirm="saveAdd()">
      <!-- <van-field v-model="exchangeCode" label="兑换码" placeholder="请输入兑换码" /> -->
      <div class="scrollable-content">
        <van-card v-for="(coupon, index) in couponList" :key="index"
          :num="coupon.couponNum"
          :price="coupon.amount"
          :desc="'有效日期：' + coupon.desc"
          :title="coupon.name"
          :thumb="coupon.image"
        >
          <template #tags>
            <van-tag plain type="danger">{{ coupon.type == 0 ? '满减' : '折扣'}}</van-tag>
            <van-tag plain type="danger">{{ coupon.userRange == 0 ? '通用' : (coupon.userRange == 1 ? '商家' : '商品' ) }}</van-tag>
          </template>
          <template #footer>
            <div style="display: flex; justify-content: flex-end; align-items: flex-end; height: 100%;">
              <van-button icon="plus" size="mini" @click="plus(coupon)"></van-button>
              <van-button icon="minus" size="mini" @click="minus(coupon)"></van-button>
              <van-checkbox v-model="coupon.checked" style="margin-left: 10px;">勾选</van-checkbox>
            </div>
          </template>
        </van-card>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { addCoupon, reqUserInfoAuto, reqUserRecordCouponList, reqUserRecordExchangeList } from '../../api';
import { Toast } from 'vant';

export default {
  data() {
    return {
      // couponNum: 1,
      userInfo: {
        record: 1000, // 假设用户总积分为1000
      },
      couponList: [ // 优惠券列表
        {
          couponNum: 1,
          checked: false,
          couponId: '1',
          receiveCount: 1,
          desc: '2024-1-22 10:00',
          title: '优惠券A',
          image: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
          amount: 200,
          type: '满减',
          threshold: 10,
          userRange: '通用',
          costRecord: 200,
        },
        {
          couponNum: 1,
          checked: false,
          couponId: '1',
          receiveCount: 1,
          desc: '2024-1-10 9:00',
          title: '优惠券B',
          image: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
          amount: 5,
          type: '满减',
          threshold: 1000,
          userRange: '通用',
          costRecord: 500,
        }
      ], 
      exchangeRecords: [
        { couponName: '优惠券A', costRecord: 200 , receivedTime: '2023-11-11 12:00:00'},
        { couponName: '优惠券B', costRecord: 150, receivedTime: '2023-11-11 12:00:00'},
      ],
      showDialog: false,
      exchangeCode: '',
    };
  },
  methods: {
    showExchangeDialog() {
        console.log('show....')
      this.showDialog = true;
    },
    goBack() {
      // 返回上一页
      this.$router.replace('/personal');
    },
    plus(coupon) {
      if (coupon.couponNum >= coupon.receiveCount) {
        Toast('已达到领取上限')
      }else {
        coupon.couponNum++
        console.log('plus',coupon.couponNum)
      }
    },
    minus(coupon) {
      if(coupon.couponNum == 1) {
        Toast('不能再减少了')
      }else {
        coupon.couponNum--;
      }
    },
    saveAdd() {
      console.log('saveAdd',this.couponList)
      const req = this.couponList.filter(coupon => coupon.checked)
        .map(({ couponNum, couponId }) => ({ num: couponNum, couponId }));
      console.log('req',req)
      addCoupon(req).then(value => {
        if (value.code === 400) {
          Toast(value.errorMsg)
          return
        }
        reqUserRecordCouponList().then(v => {
          const couponList = v.data;
          couponList.forEach(coupon => {
            coupon.couponNum = 1; 
          });
          this.couponList = couponList;
        })
        reqUserInfoAuto().then(value => {
          this.userInfo.record = value.data.record;
        })
        reqUserRecordExchangeList().then(v => {
          this.exchangeRecords = v.data;
        })
        Toast('领取成功')
      })
    },
  },
  mounted() {
    reqUserInfoAuto().then(value => {
      this.userInfo.record = value.data.record;
    }),
    reqUserRecordCouponList().then(v => {
      // console.log(v.data)
      const couponList = v.data;
      couponList.forEach(coupon => {
        coupon.couponNum = 1; 
      });
      this.couponList = couponList;
      // console.log('this...',this.couponList)
    }),
    reqUserRecordExchangeList().then(v => {
      this.exchangeRecords = v.data;
    })  
  }
};
</script>

<style>
.page {
    background-color: #f5f5f5;
}

.scrollable-content {
  max-height: 400px; /* 设置最大高度，超过这个高度会出现滚动条 */
  overflow-y: auto; /* 启用垂直滚动条 */
}

.van-cell-group__title {
  font-size: 16px; /* 设置字体大小 */
  color: #eb0b0b; /* 设置字体颜色 */
  padding: 10px 0; /* 设置上下内边距 */
  border-bottom: 1px solid #eb4c4c; /* 设置底部边框 */
}

.center-button {
  text-align: center;
  margin-top: 0; /* 设置按钮与上方元素的间距，根据实际情况调整 */
}

/* 页面内容样式 */
.page-content {
  padding: 20px; /* 设置内容的内边距 */
}

/* 总积分样式 */
.van-cell {
  margin-top: 10px; /* 设置上边距 */
}

</style>
