import { filterNumKey, trigger, formatNumber, toFixNumber } from '@/libs/utils/index'

/**
 * 用法如 在el-input上使用 v-only-num指令，
 *  如果需要默认失去焦点返回0.00则传入zero:true，
 * v-only-num="{'zero':true}"
 * 数字为整数时传入'int':true
 * v-only-num="{'int':true}"
 * 默认为空时不处理，
 * 注意此格式化会将数据直接改成1,000.00格式，
 * 上送表单数据时配合this.toFixedNumber(amount)剔除逗号上送
 */
const onlyNum = (el, binding, vnode) => {
  const formats = {
    CURRENCY_SYM: '¥',
    DECIMAL_SEP: '.',
    GROUP_SEP: ',',
    PATTERNS: [
      {
        gSize: 3,
        lgSize: 3,
        maxFrac: 3,
        minFrac: 0,
        minInt: 1,
        negPre: '-',
        negSuf: '',
        posPre: '',
        posSuf: ''
      },
      {
        gSize: 3,
        lgSize: 3,
        maxFrac: 2,
        minFrac: 2,
        minInt: 1,
        negPre: '-\u00a4',
        negSuf: '',
        posPre: '\u00a4',
        posSuf: ''
      }
    ]
  }
  const ele = el.tagName === 'INPUT' ? el : el.querySelector('input')
  // 控制键入数字
  ele.onkeypress = function (event) {
    filterNumKey(event)
  }
  ele.onkeyup = function () {
    // 获取当前的光标位置
    var cursorStart = this.selectionStart
    var cursorEnd = this.selectionEnd
    let val = ele.value
    if (val) {
      val = val.replace(/[^\d.]/g, '') // 清除"数字"和"."以外的字符
      val = val.replace(/^\./g, '') // 验证第一个字符是数字
      val = val.replace(/\.{2,}/g, '.') // 只保留第一个, 清除多余的
      val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      val = val.replace(/^(\\-)*(\d+)\.(\d\d).*$/, '$1$2.$3') // 只能输入2个小数
      ele.value = val
      this.setSelectionRange(cursorStart, cursorEnd) // 设置光标
    }
    trigger(ele, 'input')
  }
  ele.onblur = function () {
    let fractionSize = 2
    if (binding.value && binding.value.int) {
      fractionSize = 0
    }
    if (binding.value && !binding.value.zero) {
      if (ele.value) {
        ele.value = !ele.value
          ? ele.value
          : formatNumber(
            ele.value,
            formats.PATTERNS[0],
            formats.GROUP_SEP,
            formats.DECIMAL_SEP,
            fractionSize
          )
      }
    } else {
      ele.value = !ele.value
        ? ele.value
        : formatNumber(
          ele.value,
          formats.PATTERNS[0],
          formats.GROUP_SEP,
          formats.DECIMAL_SEP,
          fractionSize
        )
    }
    trigger(ele, 'input')
  }
  ele.onfocus = function () {
    ele.value = toFixNumber(ele.value)
  }
}

export default onlyNum
