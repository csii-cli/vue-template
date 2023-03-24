<template>
  <div class="content">
    <div class="toolbar"></div>
  </div>
</template>

<script>
export default {
  name: 'm-crypto',
  data() {
    return {
      data: {
        userName: 'admin',
        passWord: '888888',
        sex: '1',
        adress: '深圳市南山区',
        favirateFoods: ['苹果', '香蕉'],
        todoList: [
          {
            practice: 'run',
            time: '30m'
          },
          {
            practice: 'eat',
            time: '15m'
          }
        ]
      },
      cpText: ''
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped></style>
