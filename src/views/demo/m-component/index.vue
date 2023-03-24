<template>
  <div class="content">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="temA" name="temA">temA</el-tab-pane>
      <el-tab-pane label="temB" name="temB">temB</el-tab-pane>
      <el-tab-pane label="temC" name="temC">temC</el-tab-pane>
    </el-tabs>
    <component :is="currentView"></component>
    <div>
      <m-list :list="list" :itemClick="(item) => (currentItem = item)"></m-list>
      <p>{{ currentItem }}</p>
    </div>
    <div>
      <div>{{ msg }}</div>
      <m-model v-model="msg"></m-model>
    </div>
    <div>
      <m-btn @click="getMsg">提交</m-btn>
    </div>
  </div>
</template>
<script>
import mModel from '@/components/m-model/index'
export default {
  name: 'm-component',
  components: {
    mModel
  },
  data() {
    return {
      activeName: 'temA',
      currentView: 'm-temA',
      currentItem: null,
      list: [
        {
          id: 1,
          title: '01',
          content: 'john'
        }
      ],
      msg: ''
    }
  },
  mounted() {},
  methods: {
    handleClick(val, event) {
      this.currentView = 'm-' + val.name
      console.log(val.name)
      console.log(event)
    },
    getMsg() {
      console.log(this.msg)
      const obj1 = {
        a: [
          {
            name: 'john',
            scores: [1, 2, 3]
          }
        ]
      }
      const obj2 = {
        b: 2
      }
      // 解构深拷贝
      console.log({ ...obj1, ...obj2 })
    }
  }
}
</script>
<style lang="scss" scoped></style>
