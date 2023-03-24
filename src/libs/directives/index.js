import onlyNum from './modules/v-number'
import debounce from './modules/v-debounce'
import copy from './modules/v-copy'
import throttle from './modules/v-throttle'
import waterMarker from './modules/v-addWaterMarker'
import draggable from './modules/v-draggable'
import longPress from './modules/v-longPress'
import digital from './modules/v-digital'

const directives = {
  onlyNum, // 数字 千分位分割 小数点两位
  debounce, // 防抖
  copy, // 复制内容
  throttle, // 节流  控制按钮点击频率
  waterMarker, // 水印 canvas
  draggable, // 拖拽
  longPress, // 长按
  digital // 数字无格式
}
export default directives
