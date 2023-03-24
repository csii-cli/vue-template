<template>
  <div>
    <h1>scope</h1>
    <slot :game="names">我是默认内容 </slot>
    <slot name="ll" v-bind:kite="kite">我是默认内容ll </slot>
  </div>
</template>

<script>
export default {
  name: 'scope',
  data() {
    return {
      names: {
        a: 'john'
      },
      kite: 'hh'
    }
  }
}
</script>

<style></style>
