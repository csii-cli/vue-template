<template>
  <div class="tips">
    <span class="tips-label" v-show="labelShow"></span>
    <span
      :class="{'tips-text': true, 'new-tips-class': customizeClass}"
      v-show="labelShow"
    >{{title}}</span>
    <!-- <span class="tips-tips" v-show="tips && tips.content" @click="clickEvent(tips)">{{tips.content}}</span> -->
    <a
      class="tips-tips"
      v-show="tips && tips.length > 0"
      @click.prevent="clickEvent(item)"
      v-for="(item,index) in tips"
      :key="index"
      ref="prints"
    >
      <!--      <i :class="item.imgClass"></i>-->
      <img
        src="@/assets/image/home/helpPic/downloadRightNow.png"
        style="vertical-align: middle;height: 14px;"
      />
      {{item.content}}
    </a>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  props: {
    labelShow: { type: Boolean, default: true },
    title: { type: String, default: '' },
    tips: {
      type: Array,
      default: () => {
        return []
      }
    },
    customizeClass: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickEvent (data) {
      console.log(data)
      if (data && data.concat >= 2) {
        this.$emit('tipsEvent', data)
      } else {
        this.$emit(data.event)
      }
    },
    getPrintDom () {
      this.$nextTick(() => {
        const flyDom = this.$refs.prints[0]
        const doms = {
          dom: flyDom,
          type: 'eReceiptQuery'
        }
        this.getFlyStartPoint(doms)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tips {
  display: flex;
  align-items: stretch;
  position: relative;
  .tips-label {
    width: 6px;
    display: inline-block;
    height: 18px;
    background: linear-gradient(180deg, rgba(171, 32, 43, 1) 0%, rgba(241, 116, 116, 1) 100%);
    border-radius: 2px;
  }
  .tips-text {
    height: 20px;
    font-size: 16px;
    padding-left: 5px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 20px;
  }
  .new-tips-class {
    font-size: 16px;
  }
  .tips-tips {
    height: 28px;
    padding-right: 5px;
    font-weight: bold;
    line-height: 18px;
    position: absolute;
    right: 5px;
    margin-right: 0;
    font-size: 14px;
    color: #007aff;
    cursor: pointer;
    bottom: 0;
  }
  .tips-tips:hover {
    cursor: pointer;
    opacity: 0.7;
  }
}
</style>
