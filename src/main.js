import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import i18n from '@/lang'
import printJS from '@/plugin/print-js'
import ElementUI from 'element-ui'
import config from '@/config'
import animated from 'animate.css'

// 混入指令 翻译枚举
import '@/libs/mixins'

import '@/assets/icons/iconfont.css'
import '@/assets/style/css/public.less'
import '@/assets/style/css/home.less'
import 'swiper/dist/css/swiper.min.css'
import 'swiper/dist/js/swiper.min'
import Print from '@/components/vue-print-nb'

import 'element-ui/lib/theme-chalk/index.css'
import * as filters from '@/libs/filters'

import '@/components/index.js'

/**
 * 全局过滤器
 */
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false
Vue.prototype.$config = config
Vue.prototype.$axios = axios
Vue.prototype.$printJS = printJS
Vue.prototype.$store = store

Vue.use(ElementUI)
Vue.use(Print)
Vue.use(animated)

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
