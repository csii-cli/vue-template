<template>
  <div class="login">
    <div class="cc">123</div>
    <div class="login-form">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="账号" prop="userName">
          <el-input v-model="form.userName" maxlength="20" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input
            type="password"
            maxlength="16"
            placeholder="请输入密码"
            v-model="form.passWord"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="comLogin('form')">登录</el-button>
          <el-button @click="comRegister">注册</el-button>
          <el-button @click="weChatLogin">微信扫码</el-button>
          <!-- <el-button @click="comRegister">注册</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div
      v-show="qrCodeModal"
      title="请使用微信扫码登录！"
      class-name="vertical-center-modal"
      footer-hide
      width="350"
    >
      <!-- <div class="qrcode" ref="qrCodeUrl" v-if="qrCodeModal" ></div>-->
      <div id="qrcode"></div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      qrCodeModal: false,
      form: {
        userName: '',
        passWord: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('login', ['handleLogin']),
    init() {},
    comLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleLogin(this.form).then((res) => {
            this.$router.push({
              path: '/homes/imjohn',
              params: res
            })
          })
        }
      })
    },
    comRegister() {
      this.$router.push({
        path: '/register'
      })
    },
    weChatLogin() {
      this.qrCodeModal = true
      this.createWxQrcode()
    },
    /* weixin */
    createWxQrcode() {
      // eslint-disable-next-line no-undef
      var obj = new WxLogin(this.$config.wxConfig)
    }
  }
}
</script>
<style lang="scss">
@import url('./index.scss');
</style>
<style scoped>
.cc {
  color: #f00;
}
</style>
