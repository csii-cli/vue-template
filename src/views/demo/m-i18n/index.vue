<template>
  <div class="content">
    <div class="c-block">
      <h1>枚举</h1>
      <div>{{ this.$enum('Sex')[1] }}</div>
    </div>
    <div class="c-block">
      <h1>温馨提示</h1>
      <div>{{ this.$tips('ecTips') }}</div>
    </div>
    <div class="c-block">
      <div>{{ $t('navbar.search') }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'm-i18n',
  data() {
    return {}
  },
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    init() {}
  }
}
</script>

<style lang="less" scoped></style>
