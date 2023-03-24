<template>
  <div class="content">
    <div class="c-block">
      <h1>数字千分位分割无小数点--{'int':true}</h1>
      <div class="c-input">
        <el-input
          v-model="testValue"
          v-onlyNum="{ int: true }"
          maxlength="16"
          placeholder="onlyNum"
        ></el-input>
      </div>
      <h1>数字千分位分割两位小数点--{ zero: true }</h1>
      <div class="c-input">
        <el-input v-onlyNum="{ zero: true }" maxlength="16" placeholder="{ zero: true }"></el-input>
      </div>
    </div>
    <div class="c-block">
      <h1>纯数字</h1>
      <div class="c-input">
        <el-input v-digital maxlength="16" placeholder="digital"></el-input>
      </div>
    </div>
    <div class="c-block">
      <h1>防抖</h1>
      <m-btn v-debounce="c_debounce">防抖</m-btn>
    </div>
    <div class="c-block">
      <h1>节流</h1>
      <m-btn v-throttle="c_throttle">节流</m-btn>
    </div>
    <div class="c-block">
      <h1>长按2秒</h1>
      <m-btn v-longPress="pressFn">长按2秒</m-btn>
    </div>
    <div class="c-block">
      <h1>复制内容: {{ copyData }}</h1>
      <m-btn v-copy="copyData">复制</m-btn>
    </div>
    <div class="c-block">
      <h1>canvas水印</h1>
      <div
        class="water-content"
        v-waterMarker="{ text: '版权所有', textColor: 'rgba(180, 180, 180, 0.4)' }"
      ></div>
    </div>
    <div class="c-block">
      <h1>拖拽</h1>
      <div class="c-dialog">
        <div class="c-dialog-model" v-draggable></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'm-directive',
  data() {
    return {
      testValue: '',
      copyData: 'hello'
    }
  },
  created() {},
  mounted() {},
  methods: {
    c_debounce() {
      console.log('防抖')
    },
    c_throttle() {
      console.log('节流')
    },
    pressFn() {
      console.log('按了2秒')
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  .c-block {
    h1 {
      font-size: 14px;
      line-height: 2;
    }
    .c-input {
      width: 200px;
    }
    .water-content {
      width: 400px;
      height: 200px;
    }
    .c-dialog {
      width: 400px;
      height: 200px;
      overflow: hidden;
      position: relative;
      .c-dialog-model {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #fcc;
      }
    }
  }
}
</style>
