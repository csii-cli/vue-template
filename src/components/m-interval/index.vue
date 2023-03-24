<template>
  <div></div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {}
  },
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.createInterval('hello')
    },
    createInterval(msg) {
      const timer = setInterval(() => {
        console.log(msg)
      }, 1000)
      this.$once('hook:beforeDestroy', function () {
        clearInterval(timer)
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
