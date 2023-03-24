<template>
  <div>
    <slot name="header" v-bind:user="user">{{ user.lastname }}</slot>
    <p>content</p>
    <slot></slot>
    <p>content</p>
    <slot name="footer"></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        lastname: 'john',
        firstname: 'im'
      }
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped></style>
