<template>
  <div class="address-page">
    <mt-header title="收货地址管理">
      <router-link to="/personal" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>  

    <div class="address-list">
      <van-address-list
            v-model="addressList[0].id"
            :list="addressList"
            default-tag-text="默认"
            @add="showAddPopup"
            @edit="editAddress"
            @select="handlerSetDefault"
      />
    </div>
    
    <mt-popup v-model="popupVisible" position="right" modal=false>
      <div class="popup-content">
        <mt-field v-model="editedAddress.name" label="收货人"></mt-field>
        <mt-field v-model="editedAddress.tel" label="联系电话"></mt-field>
        <mt-field v-model="editedAddress.address" label="详细地址"></mt-field>
        
        <div class="button-container">
          <mt-button type="danger" @click="cancelEditedAddress" class="left-button">取消</mt-button>
          <mt-button type="primary" @click="saveEditedAddress" class="center-button">保存</mt-button>
          <mt-button type="danger" @click="deleteAddress(editedAddress.id)" class="right-button">删除</mt-button>
        </div>
      </div>
    </mt-popup>
    
    <mt-popup v-model="addPopupVisible" position="right" modal=false>
      <div class="popup-content">
        <mt-field v-model="saveAddress.name" placeholder="填入收货人" label="收货人"></mt-field>
        <mt-field v-model="saveAddress.tel" placeholder="填入手机号"  label="联系电话"></mt-field>
        <mt-field v-model="saveAddress.address" placeholder="填入收货地址" label="详细地址"></mt-field>
        <div class="button-container">
          <mt-button type="danger" @click="cancelEditedAddress" class="left-button">取消</mt-button>
          <mt-button type="primary" @click="addAddress" class="right-button">保存</mt-button>
        </div>
      </div>
    </mt-popup>

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { delAddressList, editAddressList, reqAddressList , addAddressList, reqUserInfoAuto, enableAddressDefault} from '../../api';
import { Toast } from 'vant'
import { MessageBox } from 'mint-ui';

export default {
  name: 'address',
  data() {
    return {
      addressList: [
        { 
          id: '1', 
          name: '张三', 
          tel: '13812345678', 
          address: '某某小区1号楼101室' , 
          isDefault: false 
        },
        { 
          id: '2', 
          name: '李四', 
          tel: '13987654321', 
          address: '某某小区2号楼233室', 
          isDefault: false 
        },
        {
          id: '3', 
          name: '王五', 
          tel: '13987654321', 
          address: '某某小区2号楼2033室', 
          isDefault: false 
        },
        {
          id: '4', 
          name: '马帅', 
          tel: '13987654321', 
          address: '某某小区2号楼202室', 
          isDefault: true 
        },
        {
          id: '5', 
          name: '帅马', 
          tel: '13987654321', 
          address: '某某小区2号楼202室', 
          isDefault: false 
        },
        
      ],
      popupVisible: false,
      addPopupVisible: false,
      editedAddress: {
        addressId: null,
        name: '',
        tel: '',
        address: '',
      },
      saveAddress: {
        userId: null,
        name: '',
        tel: '',
        address: '',
      }
    };
  },
  methods: {
    showPopup() {
      // console.log(this.popupVisible)
      this.popupVisible = true;
    },
    showAddPopup() {
      this.addPopupVisible = true;
    },
    editAddress(address) {
      // console.log('Edit button clicked:', address);
      this.editedAddress = { ...address };
      this.popupVisible = true;
    },
    deleteAddress(id) {
      // console.log('Delete address with id:', id);
      delAddressList(id).then(() => {
        this.flashAddressList()
        this.popupVisible = false;
      })

    },
    saveEditedAddress() {
      // console.log('Save edited address:', this.editedAddress);
      const req = {
        addressId: this.editedAddress.id,
        consignee: this.editedAddress.name,
        phone: this.editedAddress.tel,
        detail: this.editedAddress.address,
      }
      editAddressList(req).then(value => {
        // console.log(value.data)
        this.flashAddressList()
        MessageBox('提示','修改地址成功');
      })
      this.popupVisible = false;
    },
    cancelEditedAddress() {
      this.popupVisible = false;
      this.addPopupVisible = false;
    },
    addAddress() {
      reqUserInfoAuto().then((v) => {
        const req = {
          userId: v.data.id,
          consignee: this.saveAddress.name,
          phone: this.saveAddress.tel,
          detail: this.saveAddress.address,
        }
        return addAddressList(req);
      }).then(() => {
        this.flashAddressList();
        MessageBox('提示','添加地址成功');
        this.saveAddress = {};
      });
      this.addPopupVisible = false;
    },
    flashAddressList() {
      reqAddressList().then(value => {
        this.addressList = value.data.map(item => {
          return {
            id: item.id,
            name: item.consignee,
            tel: item.phone,
            address: item.detail,
            isDefault: item.isDefault === 1 
          }
        })
    })
    },
    setDefault(id) {
      // console.log(id)
      MessageBox('提示','是否要设为默认地址');
      enableAddressDefault(id).then(() => {
        this.flashAddressList()
        MessageBox('提示','已设置为默认地址');
      })
    }, 
    handlerSetDefault(item,index) {
      this.setDefault(item.id)
    },
  },
  mounted() {
    reqAddressList().then(value => {
      this.addressList = value.data.map(item => {
        return {
          id: item.id,
          name: item.consignee,
          tel: item.phone,
          address: item.detail,
          isDefault: item.isDefault === 1 
        }
      })
    })
  },
  computed: {
    // ...mapState(['addressList'])
  }
};
</script>

<style scoped>

.add-address-button {
  padding: 8vw;
  text-align: center;
}

.address-page {
  background-color: #eaf5ff;
  height: 100%;
  overflow: hidden;
}

.header-button {
  color: #fff;
}

.address-list {
  padding: 8vw;
}

.address-item {
  background-color: #fff;
  border-radius: 8vw;
  box-shadow: 0 2vw 4vw rgba(0, 0, 0, 0.1);
  margin-bottom: 8vw;
  padding: 12vw;
}

.address-info {
  flex: 1;
}

.address-actions {
  display: flex;
  align-items: center;
  font-size: 8vw;
  color: #666;
}

.address-actions mt-button {
  margin-left: 8vw;
  color: #ff4949;
  cursor: pointer;
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
.right-button,
.center-button {
  flex: 1;
  margin: 0 1vw;
}


</style>