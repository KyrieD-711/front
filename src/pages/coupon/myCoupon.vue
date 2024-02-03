<template>
    <div>
        <van-nav-bar title="用户优惠券" left-arrow @click-left="goBack" />
        <!-- 优惠券单元格 -->
        <van-coupon-cell
        v-for="(myCoupon, index) in myCouponList"
        :key="myCoupon.id"
        :title="myCoupon.batchName"
        :coupons="myCoupon.myCouponListInfo"
        @click="showList = true;handleCouponCellClick(index)"
        />
        <!-- 优惠券列表 -->
        <van-popup v-model="showList" round position="bottom" style="height: 90%; padding-top: 4px;">
            <van-coupon-list :show-close-button="false" :show-exchange-bar="false" 
                :coupons="this.currentValidCoupons"
                :disabled-coupons="this.currentExpiredCoupons"
            />
        </van-popup>
    </div>
</template>

<script>
import { reqUserMyCouponList } from '../../api';

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
    name: 'myCoupon',
    data() {
        return {
            myCouponList: [
                {
                    batchName: '双十一优惠券',
                    
                    myCouponListInfo: [
                        {
                            couponId: '1',
                            name: '优惠券名称',
                            available: 1,
                            condition: '无使用门槛\n最多优惠12元',
                            description: '描述信息ooooo',
                            reason: '',
                            value: 150,
                            customValidPeriod: '2024-01-31 19:39:22',
                            valueDesc: '1.5',
                            unitDesc: '元',
                        },
                        {
                            couponId: '2',
                            name: '优惠券名称',
                            available: 1,
                            condition: '无使用门槛\n最多优惠12元',
                            description: '描述信息ooooo',
                            reason: '',
                            value: 150,
                            customValidPeriod: '2024-01-31 19:39:22',
                            valueDesc: '1.5',
                            unitDesc: '元',
                        }
                    ]
                }
            ],
            showList: false,
            currentValidCoupons: [],
            currentExpiredCoupons: []
        }
    },
    methods: {
        goBack() {
            this.$router.replace('/personal');
        },
        handleCouponCellClick(index) {
            if (index >= 0 && index < this.myCouponList.length) {
                const currentBatch = this.myCouponList[index];
                this.currentValidCoupons = currentBatch.myCouponListInfo.filter(coupon => {
                    const myDate = coupon.customValidPeriod.replace('过期', '');
                    return new Date(myDate) > new Date();;
                });
                this.currentExpiredCoupons = currentBatch.myCouponListInfo.filter(coupon => {
                    const myDate = coupon.customValidPeriod.replace('过期', '');
                    return new Date(myDate) <= new Date();;
                });
            }
            return []; // 如果索引无效，返回空数组
        }
    },
    mounted() {
        reqUserMyCouponList().then(v => {
            console.log(v.data)
            this.myCouponList = v.data.map(backendItem => ({
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
        })
    }
}

</script>