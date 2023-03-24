import Vue from 'vue'
import mConfirm from './m-confirm/index'
import mMessage from './m-message/index'
Vue.prototype.$mConfirm = mConfirm
Vue.prototype.$mMessage = mMessage
Vue.component('m-el-upload', () => import('./m-el-upload'))
Vue.component('m-input', () => import('./m-input'))
Vue.component('m-checkbox', () => import('./m-checkbox'))
Vue.component('m-temA', () => import('./m-temA'))
Vue.component('m-temB', () => import('./m-temB'))
Vue.component('m-temC', () => import('./m-temC'))
Vue.component('m-tinymce', () => import('./m-tinymce'))
Vue.component('m-btn', () => import('./m-btn'))
Vue.component('m-pagination', () => import('./m-pagination'))
Vue.component('m-table', () => import('./m-table'))
Vue.component('m-list', () => import('./m-list'))
Vue.component('m-interval', () => import('./m-interval'))
Vue.component('m-lang', () => import('./m-lang'))
