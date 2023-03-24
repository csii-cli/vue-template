export default {
  namespaced: true,
  state: {
    smKeyLists: {}
  },
  mutations: {
    setSmKey(state, option) {
      state.smKeyLists[option.key] = {
        sm4Key: option.sm4Key,
        hmacKey: option.hmacKey
      }
    }
  },
  getters: {
    getSmKey(state) {
      return state.smKeyLists
    }
  }
}
