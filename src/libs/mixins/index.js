import Vue from 'vue'

// 混入全局服务
import { $locale } from '@/libs/service'
// 全局混入指令
Vue.use((Vue) => {
  ;((requireContext) => {
    const arr = requireContext.keys().map(requireContext)
    ;(arr || []).forEach((directive) => {
      directive = directive.__esModule && directive.default ? directive.default : directive
      Object.keys(directive).forEach((key) => {
        Vue.directive(key, directive[key])
      })
    })
  })(require.context('../directives', false, /^\.\/.*\.js$/))
})
Vue.mixin({
  methods: {
    // 相当于定义全局方法
    $enum: function (key) {
      if (key && key !== '') {
        return $locale.ENUMList[key]
      } else return ''
    },
    $tips: function (key) {
      if (key && key !== '') {
        return $locale.TIPS[key]
      } else return ''
    }
  }
})
