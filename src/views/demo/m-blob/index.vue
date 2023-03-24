<template>
  <div class="content">
    <video ref="vid" width="400" height="200" controls>
      <!-- <source src="http://www.imjohn.cn/data/test.mp4" type="video/mp4" /> -->
      <!-- <source src="src/test.mp4" type="video/mp4" /> -->
      <!-- <source src="./src/test.mp4" type="video/mp4" /> -->
    </video>
    <!-- <m-input v-model="test"></m-input> -->
    <m-checkbox :listArr="listArr" :checkList="checkList" v-model="test"></m-checkbox>
  </div>
</template>
<script>
export default {
  data() {
    return {
      test: [],
      checkList: ['t1'],
      listArr: [
        {
          label: 't1',
          disabled: false
        },
        {
          label: 't2',
          disabled: false
        },
        {
          label: 't3',
          disabled: true
        }
      ]
    }
  },
  mounted() {
    this.roundCode()
  },
  methods: {
    roundCode() {
      const roundImg = setInterval(() => {
        this.getCode()
      }, 5000)
      this.$once('hook:beforeDestroy', function () {
        clearTimeout(roundImg)
      })
    },
    getCode() {
      console.log(this.test)
    }
  }
}
</script>
<style lang="scss" scoped></style>
