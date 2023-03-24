import Vue from 'vue'
import mConfirm from './index.vue'

// 参数配置
const defaults = {
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
const confirmConstructor = Vue.extend(mConfirm)

const theConfirm = function (title, content, button, customButton) {
  return new Promise((res, rej) => {
    // promise封装，handleConfirm执行resolve，handleClose执行reject
    const confirmDom = new confirmConstructor({
      el: document.createElement('div')
    })
    document.body.appendChild(confirmDom.$el) // new一个对象，然后插入body里面
    confirmDom.visible = true

    const options = {
      title: typeof title !== 'undefined' ? title : '提示'
    }
    if (typeof content !== 'undefined') {
      if (typeof content === 'object') {
        !content.isHtml ? (content.isHtml = false) : ''
        options.content = content
      } else {
        options.content = { isHtml: true, data: content }
      }
    } else {
      options.content = { isHtml: false, data: '' }
    }
    if (typeof customButton !== 'undefined' && customButton.length > 0) {
      options.customButton = customButton
    } else if (typeof button !== 'undefined' && Object.keys(button).length > 0) {
      options.button = button
    }
    confirmDom.text = Object.assign({}, defaults, options)
    confirmDom.handleConfirm = function () {
      res()
      confirmDom.visible = false
    }
    confirmDom.handleClick = function (index) {
      res(index)
      confirmDom.visible = false
    }
    confirmDom.handleClose = function () {
      rej()
      confirmDom.visible = false
    }
  })
}

export default theConfirm
