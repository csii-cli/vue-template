import { filterNumKey, trigger } from '@/libs/utils/index'
/**
 * 用法如 在el-input上使用 v-digital
 */

export const digital = (el) => {
  const ele = el.tagName === 'INPUT' ? el : el.querySelector('input')
  // ele.oninput = function () {
  // 控制键入数字
  ele.onkeypress = function (event) {
    filterNumKey(event)
  }
  ele.onkeyup = function () {
    let val = ele.value
    if (val) {
      val = val.replace(/[^\d.]/g, '') // 清除"数字"和"."以外的字符
      val = val.replace(/^\./g, '') // 验证第一个字符是数字
      val = val.replace(/\.{2,}/g, '.') // 只保留第一个, 清除多余的
      ele.value = val
    }
    /* trigger(ele, 'input') */
  }
  ele.onblur = function () {
    trigger(ele, 'input')
  }
  ele.onfocus = function () {
    trigger(ele, 'input')
  }
}
export default digital
