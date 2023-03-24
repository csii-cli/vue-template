<template>
  <div class="wrapper">
    <top ref="top"></top>
    <div class="body_content">
      <!-- <wrap-menu></wrap-menu> -->
      <div class="wrapper_content" :style="wrapper_height">
        <transition :name="content">
          <router-view v-if="isRouterAlive" />
        </transition>
      </div>
    </div>
    <!-- <bottom></bottom> -->
  </div>
</template>

<script>
import top from './components/top'
import bottom from './components/bottom'
import wrapMenu from './components/menu'
export default {
  provide() {
    return {
      message: 'demo',
      reload: this.reload
    }
  },
  components: {
    top
  },
  data() {
    return {
      content: 'el-fade-in',
      isRouterAlive: true,
      isCollapse: true
    }
  },
  computed: {
    wrap_height() {
      return { height: document.body.clientHeight - 80 + 'px' }
    },
    wrapper_height() {
      return { 'min-height': document.body.clientHeight - 80 + 'px' }
    }
  },
  mounted() {},
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.wrapper {
  min-width: 1100px;
  overflow-x: scroll;
  background: rgba(248, 248, 248, 1);
  height: 100%;
  .body_content {
    display: flex;
    .wrapper_content {
      min-height: 100%;
      overflow-y: scroll;
      position: relative;
      flex: 1;
      // width: 1200px;
      margin: 0;
      padding: 10px 10px 0 10px;
      background: #f4f5f5;
      min-height: calc(100vh - 224px);
      // margin-top: 10px;
      // 操作域距离菜单暂定8px
      // margin-top: 10px;
    }
  }
}
</style>
