<template>
  <div class="content">
    <div id="printId">
      <div class="ct">printId打印</div>
      <div class="cc">{{ test }}</div>
      <div class="cc">123002</div>
      <div class="cc">123003</div>
      <div class="cc">123004</div>
      <div class="cc">123005</div>
      <div class="cc">123006</div>
      <div class="cc">123007</div>
      <div class="cc">123008</div>
      <div class="cc">123009</div>
      <div class="cc">123010</div>
      <div class="cc">123011</div>
      <div class="cc">123012</div>
      <div class="cc">123013</div>
      <div class="cc">123014</div>
      <div class="cc">123015</div>
      <div class="cc">123016</div>
      <div class="cc">123017</div>
      <div class="cc">123018</div>
      <div class="cc">123019</div>
      <div class="cc">123020</div>
    </div>
    <el-button v-print="'#printId'">printID打印</el-button>
  </div>
</template>
<script>
import { perPrint } from '@api/api'
export default {
  data() {
    return {
      test: ''
    }
  },
  methods: {
    async comLogin() {
      try {
        const res = await perPrint()
        this.test = res.data.name
      } catch (error) {
        this.$message('没网,大哥!')
      }
    }
  }
}
</script>
