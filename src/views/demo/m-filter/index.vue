<template>
  <div class="content">
    <div class="test-filter">
      <p>{{ testData.test | timeFormat('yyyy-mm-dd') }}</p>
      <p>{{ testData.test | timeFormat('yyyy-mm') }}</p>
      <p>{{ testData.test | timeFormat('hh:mm') }}</p>
      <p>{{ testData.test | timeFormat('yyyy') }}</p>
      <p>{{ testData.test | timeFormat('mm-dd') }}</p>
      <p>{{ testData.test | timeFormat('hh:mm') }}</p>
      <p>{{ testData.test | timeFormat('ymd') }}</p>
      <p>{{ testData.test | timeFormat }}</p>
    </div>
    <el-button @click="test()">测试打印</el-button>
    <el-select v-model="value" filterable :filter-method="fee" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      testData: {
        test: Date.now(),
        checkTest: ''
      },
      testValue: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: ''
    }
  },
  mounted() {},
  methods: {
    fee() {
      console.log('eee')
    },
    test() {
      return this.$mConfirm('提示', '暂无数据', { confirmButtonText: '确定' })
    }
  }
}
</script>
<style lang="scss" scoped>
.test-filter {
  p {
    font-size: 14px;
  }
}
</style>
