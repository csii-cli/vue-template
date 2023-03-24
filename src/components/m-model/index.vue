<template>
  <div>
    <el-input v-model="str" @input="test"></el-input>
  </div>
</template>

<script>
export default {
  name: 'm-model',
  data() {
    return {
      str: ''
    }
  },
  created() {},
  mounted() {},
  methods: {
    changeValue() {
      this.value = !this.value
    },
    test() {
      this.$emit('input', this.str)
    }
  }
}
</script>

<style lang="less" scoped></style>
