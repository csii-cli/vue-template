<template>
  <div class="content">
    <div>isIExplorer: {{ isIExplorer }}</div>
    <div>name: {{ getUserInfo.realName }}</div>
    <div>token: {{ getToken }}</div>
    <m-btn @click="handleCommit">handleCommit</m-btn>
    <m-btn @click="handleDispatch">handleDispatch</m-btn>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
export default {
  name: 'm-vuex',
  data() {
    return {
      name: null
    }
  },
  computed: {
    ...mapState('login', ['isIExplorer']),
    ...mapGetters('login', ['getUserInfo', 'getToken'])
  },
  mounted() {
    // this.name = this.getUserInfo
    this.setToken('jjjjjj')
  },
  methods: {
    ...mapMutations('login', ['setToken']),
    handleDispatch() {
      this.$store.dispatch('login/handleSetToken', 'aaaa')
    },
    handleCommit() {
      this.$store.commit('login/setToken', 'bbbb')
    }
  }
}
</script>

<style></style>
