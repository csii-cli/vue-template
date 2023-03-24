<template>
  <div class="menu">
    <div class="wraper_menu" :style="wrap_height">
      <el-row class="tac">
        <el-col :span="24">
          <!-- <el-menu mode="vertical" style="height:100vh;" :default-active="$route.path" router>
            <el-submenu v-for="(item, index) in menu.items" :index="`menu-item-${index}`" :key="`menu-item-${index}}`">
              <template slot="title">{{ item.title }}</template>
              <el-menu-item v-for="(subItem, subIndex) in item.items" :key="`menu-item-${index}-${subIndex}`" :index="subItem.path">{{ subItem.title }}</el-menu-item>
            </el-submenu>
          </el-menu> -->
          <el-menu default-active="$route.path" router mode="vertical" style="height: 100vh">
            <el-submenu
              v-for="(item, index) in menuList"
              :index="`menu-item-${index}`"
              :key="`menu-item-${index}}`"
            >
              <template slot="title">{{ item.label }}</template>
              <el-menu-item
                @click="goRouter(subItem)"
                v-for="(subItem, subIndex) in item.items"
                :key="`menu-item-${index}-${subIndex}`"
                :index="subItem.path"
                >{{ subItem.label }}</el-menu-item
              >
              <!-- <el-submenu index="1-4">
                <template slot="title">ll</template>
                <el-menu-item index="1-4-1">ls</el-menu-item>
              </el-submenu> -->
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: require('@/assets/json/leftMenuList')
    }
  },
  computed: {
    wrap_height() {
      return { height: document.body.clientHeight - 60 + 'px' }
    }
  },
  methods: {
    goRouter(val) {
      this.$router.push({
        path: val.path
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  overflow: hidden;
  .wraper_menu {
    overflow: hidden;
    width: 200px;
    background: #eee5e5;
    position: relative;
    .el-icon-arrow-left {
      color: #f00;
      width: 24px;
      height: 24px;
      position: absolute;
      right: 0;
      top: 50%;
      margin-left: -12px;
      font-weight: 700;
      font-size: 24px;
    }
  }
  .showMenu {
    width: 24px;
    background: #e48888;
    position: relative;
    .el-icon-arrow-right {
      color: #f00;
      width: 24px;
      height: 24px;
      position: absolute;
      right: 0;
      top: 50%;
      margin-left: -12px;
      font-weight: 700;
      font-size: 24px;
    }
  }
}
</style>
