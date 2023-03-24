<template>
  <div class="content">
    <div class="toolbar">
      <el-input
        type="textarea"
        class="text_input"
        :rows="2"
        v-model="mText"
        placeholder="请输入当前要加密的文本"
        id="encode-text"
      />
      <el-button class="text_input" @click="encryptCipher()">生成密文</el-button>
      <el-input
        type="textarea"
        class="text_input"
        :rows="2"
        v-model="encryptPass"
        v-if="encryptPass"
        id="encode-text"
      />
      <el-input
        type="textarea"
        class="text_input"
        :rows="2"
        v-model="encryptPass"
        placeholder="请输入当前要解密的文本"
        id="encode-text"
      />
      <el-button class="text_input" @click="decryptData()">解密文</el-button>
      <el-input
        type="textarea"
        class="text_input"
        :rows="2"
        v-model="decryptPass"
        v-if="decryptPass"
        id="encode-text"
      />
    </div>
  </div>
</template>

<script>
const sm4 = require('sm-crypto').sm4
export default {
  name: 'mSm4',
  data() {
    return {
      mText: '',
      interText: '',
      pubkeyHex: [
        0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef, 0xfe, 0xdc, 0xba, 0x98, 0x76, 0x54, 0x32,
        0x10
      ],
      iv: '31323334353637383132333435363738',
      mode: 'cbc',
      encryptPass: '',
      decryptPass: ''
    }
  },
  mounted() {
    this.mText = JSON.stringify({ name: 'sfsf' })
  },
  methods: {
    // sm4加密
    encryptCipher() {
      this.encryptPass = sm4.encrypt(JSON.stringify(this.mText), this.pubkeyHex, {
        mode: this.mode,
        iv: this.iv
      }) // 加密
    },
    // sm4解密
    decryptData() {
      // console.log(this.ArrayToHex(this.pubkeyHex))
      this.decryptPass = sm4.decrypt(this.encryptPass, this.pubkeyHex, {
        mode: this.mode,
        iv: this.iv
      }) // 解密
    }
  }
}
</script>

<style lang="scss" scoped>
.text_input {
  margin: 10px 0;
}
</style>
