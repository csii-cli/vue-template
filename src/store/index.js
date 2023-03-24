import Vue from 'vue'
import Vuex from 'vuex'
// 刷新持久化
// import createPersistedState from 'vuex-persistedstate'

import login from './module/login'
import confirm from './module/confirm'
import smKeys from './module/smKeys'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    login,
    confirm,
    smKeys
  }
  // plugins: [createPersistedState()]
})
