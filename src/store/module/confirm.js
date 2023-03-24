export default {
  namespaced: true,
  state: {
    confirmShowCount: 0
  },
  mutations: {
    setConfirmCount(state, count) {
      state.confirmShowCount += count
    }
  }
}
