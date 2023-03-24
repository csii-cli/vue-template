<template>
  <div>
    <el-checkbox-group v-model="hascheck">
      <el-checkbox
        @change="pop"
        v-for="(item, index) in listArr"
        :key="index"
        :label="item.label"
        :disabled="item.disabled"
      ></el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  props: {
    listArr: {
      type: Array,
      default: () => {
        return []
      }
    },
    test: {
      type: Array,
      default: () => {
        return []
      }
    },
    checkList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      hascheck: []
    }
  },
  // computed: {
  //   hascheck() {
  //     return this.checkList
  //   }
  // },
  mounted() {
    this.hascheck = this.checkList
  },
  methods: {
    pop() {
      console.log(this.hascheck)
      this.$emit('change', this.hascheck)
    }
  }
}
</script>
<style lang="scss" scoped></style>
