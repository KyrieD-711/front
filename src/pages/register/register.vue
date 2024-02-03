<template>
    <div>
        <van-nav-bar
        title="用户注册"
        left-text="返回"
        left-arrow
        @click-left="goBack"
        />
        <van-form validate-first @failed="onFailed">
            <!-- 通过 pattern 进行正则校验 -->
            <van-field
                label="用户名"
                left-icon="user-circle-o"
                v-model="username"
                name="pattern"
                placeholder="请输入账号(10位数字且不包含特殊符号)"
                @focus="showKeyboard('username')"
                :rules="[{  pattern: /^\d{10}$/, message: '请输入正确账号' }]"
            />
            <!-- 通过 validator 进行函数校验 -->
            <van-field
                label="密码"
                :type="showPassword ? 'text' : 'password' "
                left-icon="eye-o"
                @click-left-icon="togglePassword"
                @focus="showKeyboard('password')"
                v-model="password"
                name="pattern"
                placeholder="请输入密码(6-18位数字且不包含特殊符号)"
                :rules="[{ pattern: /^[0-9]{6,18}$/, message: '请输入正确的密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit" @click="submitRegister">提交</van-button>
            </div>
        </van-form>
        <van-number-keyboard
        :show="show"
        @blur="show = false"
        @input="onInput"
        @delete="onDelete"
        />
    </div>
</template>

<script>
import { Toast } from 'vant'
import {reqAccountRegister} from '../../api'
export default {
    name: 'register',
    data() {
        return {
            currentInput: '', // 标识当前接收输入的输入框
            show: false, // 数字键盘显示状态
            showPassword: false,
            username: '',
            password: '',
        }
    },
    methods: {
        submitRegister() {
            reqAccountRegister(this.username, this.password).then(res => {
                console.log('username:',this.username,'password:',this.password);
                console.log(res.data);
                if(res.data.code === 200) {
                    Toast.success(res.data.data);
                    this.$router.replace('/loginRegister');
                }else if(res.data.code === 400){
                    Toast.fail(res.data.errorMsg);
                }
            })
        },
        togglePassword() {
            console.log('点击了切换密码显示状态');
            this.showPassword = !this.showPassword;
        },
        onFailed(errorInfo) {
            console.log('failed', errorInfo);
        },
        goBack() {
            this.$router.go(-1)
        },
        showKeyboard(inputName) {
            // 设置当前接收输入的输入框
            this.currentInput = inputName;
            // 显示数字键盘
            this.show = true;
        },
        onInput(value) {
            // 根据当前输入框标识处理数字键盘输入
            if (this.currentInput === 'username') {
                this.username += value;
            } else if (this.currentInput === 'password') {
                this.password += value;
            }
        },
        onDelete() {
            // 根据当前输入框标识处理删除按钮点击
            if (this.currentInput === 'username') {
                this.username = this.username.slice(0, -1);
            } else if (this.currentInput === 'password') {
                this.password = this.password.slice(0, -1);
            }
        },
    },
}
</script>