<template>
  <div class="content">
    <div>
      <el-button @click="test()">check</el-button>
    </div>
  </div>
</template>
<script>
import RuleUtil from '@/libs/ruleUtil'
import { ValiSm, ValiUtil } from '@/libs/varliUtil'
export default {
  data() {
    return {}
  },
  mounted() {},
  methods: {
    test() {
      const vali = new ValiUtil()
      const sm = new ValiSm()
      const rule = new RuleUtil()
      // console.log(vali.checkType('34').turnPage('12', '56').onlyNum('111'))
      // console.log(valiSm)
      // console.log(valiUtil)
      sm.turnPage('12', '56')
      vali.checkType('12')
      rule.checkType('34').turnPage('12', '56')
    }
  }
}
</script>
<style lang="scss" scoped></style>
