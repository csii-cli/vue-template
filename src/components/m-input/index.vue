<template>
  <div>
    <el-input @input="pop" v-model="sdata" placeholder="请输入内容" />
    <el-input @input="pop2" v-model="sdata2" placeholder="请输入内容" />
    <el-input @input="pop3" v-model="sdata3" placeholder="请输入内容" />
  </div>
</template>
<script>
export default {
  props: {
    test: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      sdata: '',
      sdata2: '',
      sdata3: ''
    }
  },
  mounted() {},
  methods: {
    pop() {
      this.$emit('input', this.sdata)
    },
    pop2() {
      this.$emit('input', this.sdata2)
    },
    pop3() {
      this.$emit('input', this.sdata3)
    }
  }
}
</script>
<style lang="scss" scoped></style>
