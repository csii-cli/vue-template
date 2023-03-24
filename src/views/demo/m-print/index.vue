<template>
  <div class="content">
    <div id="print-form">
      <img :src="imgSrc" alt="" />
    </div>
    <div>
      <el-button @click="Vprint()">img打印</el-button>
      <el-button @click="Hprint()">html打印</el-button>
      <el-button @click="Jprint()">json打印</el-button>
    </div>
    <div>
      <el-button @click="showPrint()">测试打印</el-button>
    </div>
    <div v-show="showPrintArea">
      <test-Print ref="pjohn"></test-Print>
    </div>
  </div>
</template>
<script>
import testPrint from './tprint'
export default {
  components: {
    testPrint
  },
  data() {
    return {
      data: [
        {
          name: 'John Doe',
          email: 'john@doe.com',
          phone: '111-111-1111'
        },
        {
          name: 'Barry Allen',
          email: 'barry@flash.com',
          phone: '222-222-2222'
        },
        {
          name: 'Cool Dude',
          email: 'cool@dude.com',
          phone: '333-333-3333'
        }
      ],
      test: '',
      showPrintArea: false,
      imgSrc: '',
      dataBase:
        'data:image/png;base64,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'
    }
  },
  mounted() {
    this.baseImg()
  },
  methods: {
    showPrint() {
      this.showPrintArea = true
      this.$refs.pjohn.comLogin()
    },
    baseImg() {
      // this.imgSrc = 'data:image/png;base64,' + this.dataBase
      this.imgSrc = this.dataBase
    },
    Vprint() {
      this.$printJS({
        printable: this.dataBase,
        type: 'image',
        base64: true
      })
    },
    Hprint() {
      this.$printJS({
        printable: 'print-form',
        type: 'html',
        header: '测试'
      })
    },
    Jprint() {
      this.$printJS({
        printable: this.data,
        properties: [
          { field: 'name', displayName: '自定义表头' },
          { field: 'email', displayName: '自定义表头' },
          { field: 'phone', displayName: '自定义表头' }
        ],
        type: 'json',
        header: '测试'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#printId {
  padding: 30px;
  .ct {
    text-align: center;
    color: rgb(126, 40, 40);
  }
  .cc {
    font-size: 16px;
    color: #f00;
  }
}
</style>
