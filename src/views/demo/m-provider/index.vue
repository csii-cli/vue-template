<template>
  <div class="content">
    {{ demo }}
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button @click="refresh">reload</el-button>
  </div>
</template>
<script>
export default {
  inject: ['message', 'reload'],
  data() {
    return {
      demo: this.message,
      input: ''
    }
  },
  mounted() {},
  methods: {
    refresh() {
      this.reload()
    }
  }
}
</script>
<style lang="scss" scoped></style>
