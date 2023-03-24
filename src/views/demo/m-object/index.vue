<template>
  <div class="content">
    <el-button @click="setWx">公众号配置</el-button>
  </div>
</template>
<script>
import { setWx } from '@/api/api'
export default {
  data() {
    return {
      mObj: {
        name: 'john',
        id: 'john',
        age: 'john',
        grader: 'john',
        adress: 'john',
        email: 'john',
        phone: 'john',
        fox: 'john',
        sex: 'john'
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async setWx() {
      const param = {
        button: [
          {
            type: 'click',
            name: '今日歌曲',
            key: 'V1001_TODAY_MUSIC'
          },
          {
            name: '菜单',
            sub_button: [
              {
                type: 'view',
                name: '搜索',
                url: 'http://www.soso.com/'
              },
              {
                type: 'miniprogram',
                name: 'wxa',
                url: 'http://mp.weixin.qq.com',
                appid: 'wx286b93c14bbf93aa',
                pagepath: 'pages/lunar/index'
              },
              {
                type: 'click',
                name: '赞一下我们',
                key: 'V1001_GOOD'
              }
            ]
          }
        ]
      }
      const res = await setWx(param)
    },
    init() {
      // console.log(Object.keys(this.mObj))
      // console.log(Object.values(this.mObj))
      for (const item in this.mObj) {
        console.log(item)
        console.log(this.mObj[item])
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
