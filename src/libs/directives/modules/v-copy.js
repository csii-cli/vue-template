import { Message } from 'element-ui'
/**
 * v-copy
 * 复制某个值至剪贴板
 * 接收参数：string类型
 */
const copy = (el, binding) => {
  if (!binding.value) {
    return
  }
  el.copyData = binding.value
  el.addEventListener('click', handleClick)
}

function handleClick() {
  const input = document.createElement('input')
  input.value = this.copyData.toLocaleString()
  document.body.appendChild(input)
  input.select()
  document.execCommand('Copy')
  document.body.removeChild(input)
  Message.success('复制成功！')
}

export default copy
