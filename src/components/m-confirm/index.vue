<!--
@params: title(标题),content(内容),{}(按钮标题对象)
//用法一
this.$mConfirm(title,content,{
    confirmButtonText:'确认',
    cancelButtonText:'取消'
  }).then(()=>{//确认回调
    console.log('好的')
  }).catch(()=>{//取消回调
    console.log('坏了')
  })
按钮对象不传或空参默认有取消按钮,传则按照传参对象确定

//用法二
     this.$mConfirm('提示','测试',{},[
          {buttonText:'测试1',className:'ui-btn-primary-medium'},
          {buttonText:'测试2',className:'ui-btn-medium'},
          {buttonText:'测试3',className:'ui-btn-medium'}
        ]).then(res=>{//回调
          if(res === 0){
            console.log('我是按钮一')
          }else if(res === 1){
            console.log('我是按钮二')
          }else if(res === 2){
            console.log('我是按钮三')
          }
        })

//用法三
        this.$mConfirm('测试',{
          data:'<p>测试内容1</p><p>测试内容2</p>',
          isHtml:true
        },{
          confirmButtonText:'11',
          cancelButtonText:'22',
        })
-->
<template>
  <transition name="dialog-fade" @after-enter="afterEnter" @after-leave="afterLeave">
    <div v-show="visible" class="m-confirm__wrapper" @click.self="handleWrapperClick">
      <div
        role="confirm"
        :key="key"
        aria-modal="true"
        class="m-confirm"
        ref="confirm"
        :style="style"
      >
        <div class="m-confirm__body m-confirm-space1" v-if="rendered">
          <div class="m-confirm__header">
            <span class="m-confirm__title">{{ text.title }}</span>
            <m-btn class="m-confirm__close" flat color="white" @click="handleClose()">
              <i class="el-icon-close" />
            </m-btn>
          </div>

          <div v-if="!text.content.isHtml">
            <div class="m-confirm__content text-left items-center">
              <p v-html="text.content.content"></p>
              <p v-if="text.content.respCode">参考码:{{ text.content.respCode }}</p>
              <p v-if="text.content.globJino">流水号:{{ text.content.globJino }}</p>
            </div>
          </div>

          <div v-if="text.content.isHtml">
            <div class="m-confirm__content text-left items-center">
              <p v-html="text.content.data"></p>
            </div>
          </div>

          <div v-if="text.customButton.length === 0">
            <div class="m-confirm__btn">
              <div
                class="ui-btn m_btn_primary"
                @click="handleClose()"
                v-if="text.button.cancelButtonText"
              >
                {{ text.button.cancelButtonText }}
              </div>
              <div
                class="ui-btn-primary m_btn_primary"
                @click="handleConfirm()"
                v-if="text.button.confirmButtonText"
              >
                {{ text.button.confirmButtonText }}
              </div>
            </div>
          </div>

          <div v-if="text.customButton.length > 0">
            <div>
              <div v-for="(item, index) in text.customButton" :key="index" :class="item.className">
                <div @click="handleClick(index)">{{ item.buttonText }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Popup from 'element-ui/src/utils/popup'
import Migrating from 'element-ui/src/mixins/migrating'
import emitter from 'element-ui/src/mixins/emitter'
import store from '@/store/index'
import MBtn from '../m-btn'
export default {
  name: 'index',

  components: { MBtn },

  mixins: [Popup, emitter, Migrating],

  props: {
    modal: {
      type: Boolean,
      default: true
    },

    modalAppendToBody: {
      type: Boolean,
      default: true
    },

    appendToBody: {
      type: Boolean,
      default: false
    },

    lockScroll: {
      type: Boolean,
      default: true
    },

    closeOnClickModal: {
      type: Boolean,
      default: true
    },

    closeOnPressEscape: {
      type: Boolean,
      default: true
    },

    showClose: {
      type: Boolean,
      default: true
    },

    width: String,

    fullscreen: Boolean,

    customClass: {
      type: String,
      default: ''
    },

    top: {
      type: String,
      default: '15vh'
    },
    beforeClose: Function,
    center: {
      type: Boolean,
      default: false
    },

    destroyOnClose: Boolean
  },

  data() {
    return {
      closed: false,
      key: 0,
      text: {
        title: '',
        content: {
          isHtml: false,
          data: ''
        },
        button: {
          confirmButtonText: '',
          cancelButtonText: '取消'
        },
        customButton: []
      }
    }
  },

  watch: {
    visible(val) {
      if (val) {
        this.closed = false
        this.$emit('open')
        this.$el.addEventListener('scroll', this.updatePopper)
        this.$nextTick(() => {
          this.$refs.confirm.scrollTop = 0
        })
        if (this.appendToBody) {
          document.body.appendChild(this.$el)
        }
        store.commit('confirm/setConfirmCount', 1)
      } else {
        this.$el.removeEventListener('scroll', this.updatePopper)
        if (!this.closed) this.$emit('close')
        if (this.destroyOnClose) {
          this.$nextTick(() => {
            this.key++
          })
        }
        setTimeout(() => {
          store.commit('confirm/setConfirmCount', -1)
        }, 500)
      }
    }
  },

  computed: {
    style() {
      const style = {}
      if (!this.fullscreen) {
        style.marginTop = this.top
        if (this.width) {
          style.width = this.width
        }
      }
      return style
    }
  },

  methods: {
    handleWrapperClick() {
      // if (!this.closeOnClickModal) return;
      // this.handleClose();
    },
    handleClose() {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide)
      } else {
        this.hide()
      }
    },
    handleClick() {},
    hide(cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false)
        // 调用组件可用@close获取对话框关闭回调
        this.$emit('close')
        this.closed = true
      }
    },
    handleConfirm() {},
    updatePopper() {
      this.broadcast('ElSelectDropdown', 'updatePopper')
      this.broadcast('ElDropdownMenu', 'updatePopper')
    },
    afterEnter() {
      this.$emit('opened')
    },
    afterLeave() {
      this.$emit('closed')
    }
  },

  mounted() {
    if (this.visible) {
      this.rendered = true
      this.open()
      if (this.appendToBody) {
        document.body.appendChild(this.$el)
      }
    }
  },

  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>
<style lang="scss">
.m-confirm__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 9999 !important;
}

.m-confirm {
  position: relative;
  margin: 0 auto 60px;
  border-radius: 2px;
  /*-webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, .3);*/
  /*box-shadow: 0 1px 3px rgba(0, 0, 0, .3);*/
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 50%;
  text-align: center;
}

.m-confirm__body {
  width: 520px;
  min-height: 239px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  margin: auto;
}

.m-confirm__header {
  /*font-weight: bold;*/
  color: rgba(255, 255, 255, 1);
  margin: 0 -20px;
  border-radius: 10px 10px 0 0;
  background: #e60012;
  position: relative;
  height: 54px;
  .m-confirm__close {
    font-size: 24.79px;
    height: 54px;
    position: absolute;
    right: 15px;
  }
  .m-confirm__title {
    line-height: 54px;
    font-size: 16px;
  }
  /*border-bottom: 1px #ececec dotted;*/
}

.m-confirm__content {
  min-width: 252px;
  min-height: 75px;
  font-size: 16px;
  justify-content: center;
  /*font-weight: bold;*/
  color: rgba(51, 51, 51, 1);
  line-height: 21px;
  margin: 31px 36px 30px 36px;
  word-wrap: break-word;
  p {
    line-height: 28px;
  }
}

.m-confirm__btn {
  /*margin: auto;*/
  font-size: 16px;
  font-weight: 500;
  line-height: 40px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-around;
  -ms-flex-pack: justify;
  justify-content: space-around;
}

/*.m-confirm__btn > div {*/
/*margin: 0 15px;*/
/*}*/

.m-confirm-space1 {
  padding: 0 20px 20px 20px;
}

.m-confirm-space2 {
  padding: 62px 20px 56px 20px;
}

.m-confirm-space3 {
  margin-bottom: 58px;
}
.ui-more-btn-primary {
  width: 30%;
  min-width: 124px;
}
.ui-more-btn {
  width: 30%;
  min-width: 124px;
}
.m10 {
  margin: 0 10px;
}
</style>
