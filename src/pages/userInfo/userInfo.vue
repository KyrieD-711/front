<template>
  <div class="user-info">
    <van-nav-bar
      title="用户信息"
      left-text="返回"
      @click-left="goBack"
    />
    <van-cell-group class="cell-group">
      <van-image round width="1rem" height="1rem" :src="userInfo.avatar" style="display: block; margin: 0 auto;">
        <template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
      </van-image>
      <van-cell title="用户名" v-model="userInfo.name"  />
      <van-cell title="手机号" v-model="userInfo.phone" readonly />
      <van-cell title="性别" v-model="userInfo.sex" readonly />
      <van-cell title="年龄" v-model="userInfo.age" readonly />
      <van-cell title="余额" v-model="userInfo.amount" readonly />
      <van-cell title="积分" v-model="userInfo.record" readonly />
      <div class="center-button">
        <mt-button type="primary" @click.native="updateUser">修改信息</mt-button>
      </div>
    </van-cell-group>
    <mt-popup v-model="popupVisible" position="right" modal=false>
      <div class="popup-content">
        <mt-field v-model="userInfo.name" label="用户名"></mt-field>
        <mt-field v-model="userInfo.phone" label="联系电话"></mt-field>
        <mt-field v-model="userInfo.sex" label="性别"></mt-field>
        <mt-field v-model="userInfo.age" label="年龄"></mt-field>
        <!-- <mt-field v-model="userInfo.detail" label="详细地址"></mt-field> -->
        <div class="button-container">
          <mt-button type="danger" @click="cancelEdit" class="left-button">取消</mt-button>
          <mt-button type="primary" @click="saveEdit" class="right-button">保存</mt-button>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { editUserInfo, reqUserInfoAuto } from '../../api';
export default {
  data() {
    return {
      popupVisible: false,
      userInfo: {
        id: '1',
        name: 'John Doe',
        phone: '123-456-7890',
        sex: 'Male',
        age: 25,
        amount: 100,
        record: 111,
      },
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1); // 返回上一页
    },
    updateUser() {
      this.popupVisible = true;
    },
    cancelEdit() {
      this.popupVisible = false;
    },
    saveEdit() {
      const req = {
        userId: this.userInfo.id,
        name: this.userInfo.name,
        phone: this.userInfo.phone,
        age: this.userInfo.age,
        sex: this.userInfo.sex,
      };
      console.log(req);
      editUserInfo(req).then(v => {
        this.flashUserInfo()
      })
      this.popupVisible = false;
    },
    flashUserInfo() {
      reqUserInfoAuto().then(v => {
        this.userInfo.avatar = v.data.avatar || '';
        this.userInfo.name = v.data.name || 'admin';
        this.userInfo.phone = v.data.phone || '1234567890';
        this.userInfo.sex = v.data.sex || '男';
        this.userInfo.age = v.data.age || 18;
        this.userInfo.amount = v.data.amount || 0.0;
        this.userInfo.record = v.data.record || 0;
      })
    }
  },
  mounted() {
    reqUserInfoAuto().then(v => {
      this.userInfo.avatar = v.data.avatar || '';
      this.userInfo.name = v.data.name || 'admin';
      this.userInfo.phone = v.data.phone || '1234567890';
      this.userInfo.sex = v.data.sex || '男';
      this.userInfo.age = v.data.age || 18;
      this.userInfo.amount = v.data.amount || 0.0;
      this.userInfo.record = v.data.record || 0;
    })
  }
};
</script>

<style scoped>
.user-info {
  height: 100%;
  overflow: hidden;
}

.center-button {
  display: flex;
  justify-content: center;
  margin-bottom: 8vw;
}

.center-button mt-button {
  margin: 0; /* 去除按钮的默认 margin */
}

.cell-group {
  
}

.popup-content {
  padding: 8vw;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: #fff;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.button-container {
  display: flex;
  justify-content: space-between;
  /* margin-bottom: 8vw; */
  margin-left: -8vw;
}

.left-button,
.right-button {
  flex: 1;
  margin: 0 1vw;
}
</style>
