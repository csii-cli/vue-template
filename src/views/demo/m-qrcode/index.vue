<template>
  <div class="content">
    <div>logo二维码</div>
    <vue-qr :logoSrc="imageUrl" :text="redirectUrl" :size="200"></vue-qr>
    <div>条码</div>
    <img id="barcode" />
  </div>
</template>
<script>
import vueQr from 'vue-qr'
import JsBarcode from 'jsbarcode'
export default {
  components: {
    vueQr
  },
  data() {
    return {
      // redirectUrl: 'https://ebank.kshbank.cn/static/houseLoan/openKsLoanPro.html',
      // redirectUrl: 'https://kstest3.kshbank.cn/static/houseLoan/openHouseLoanSit.html',
      redirectUrl:
        'https://kstest3.kshbank.cn:9080/ebank/natday/static/houseLoan/openHouseLoanZrr.html',
      code: '20210227104447119',
      imageUrl: require('./img/icon.png')
    }
  },
  mounted() {
    JsBarcode('#barcode', '20210227104447119', {
      format: 'CODE128',
      // lineColor: '#000',
      // background: '#fff',
      width: 2,
      height: 40,
      fontSize: 12,
      displayValue: true,
      text: '6565656565656'
    })
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
#barcode {
  // width: 400px;
  height: 50px;
}
</style>
