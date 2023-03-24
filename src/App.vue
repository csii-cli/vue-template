<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
const setHtmlFontSize = () => {
  const htmlDom = document.getElementsByTagName('html')[0]
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
  if (htmlWidth >= 750) {
    htmlWidth = 750
  }
  if (htmlWidth <= 320) {
    htmlWidth = 320
  }
  htmlDom.style.fontSize = `${htmlWidth / 7.5}px`
}
window.onresize = setHtmlFontSize
setHtmlFontSize()
</script>
<style lang="scss" scoped>
#app {
  min-height: 100%;
}
</style>
