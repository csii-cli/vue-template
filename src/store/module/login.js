import { userLogout, perUserLogin } from '@api/api'
export default {
  namespaced: true,
  state: {
    userInfo: {},
    token: '',
    isIExplorer:
      navigator.appName === 'Microsoft Internet Explorer' ||
      navigator.userAgent.indexOf('Trident') > 0
        ? 'true'
        : 'false'
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    clearUserInfo(state) {
      state.userInfo = {}
    },
    setToken(state, token) {
      state.token = token
    }
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo
    },
    getToken(state) {
      return state.token
    }
  },
  actions: {
    handleSetToken({ commit }, token) {
      commit('setToken', token)
    },
    // 退出登录
    handleLoginOut({ commit }) {
      return new Promise((resolve, reject) => {
        sessionStorage.removeItem('SESSION_ID')
        sessionStorage.removeItem('USER_ID')
        sessionStorage.removeItem('USER_ROLER')
        commit('clearUserInfo')
        userLogout()
          .then((res) => {
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    handleLogin({ commit }, form) {
      return new Promise((resolve, reject) => {
        commit('clearUserInfo')
        perUserLogin(form)
          .then((res) => {
            commit('setUserInfo', res.data[0])
            sessionStorage.setItem('SESSION_ID', res.data[0].userName)
            sessionStorage.setItem('USER_ID', res.data[0].id + '')
            sessionStorage.setItem('USER_ROLER', res.data[0].roler + '')
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
