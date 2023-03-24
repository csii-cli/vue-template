<template>
  <div ref="top" class="top">
    <div class="top_content">
      <div class="grid-container">
        <div class="header-left">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="goRouter"
            text-color="#fff"
            active-text-color="#333"
          >
            <el-menu-item v-for="(item, index) in menuList" :key="index" :index="`${index}`">{{
              item.label
            }}</el-menu-item>
          </el-menu>
        </div>
        <div class="header-search">
          <el-autocomplete
            v-model="state"
            clearable
            :fetch-suggestions="querySearchAsync"
            placeholder="快捷ll"
            @select="handleSelect"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-autocomplete>
          <!-- <el-input placeholder="请输入内容" v-model="input3">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input> -->
        </div>
        <div class="m-lang">
          <m-lang></m-lang>
        </div>
        <div>
          <div v-if="userName">
            <el-dropdown>
              <span class="el-dropdown-link">
                {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-button @click="Logout()">退出登录</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div v-else>
            <el-button @click="goRegister()">注册</el-button>
            <el-button @click="goLogin()">登录</el-button>
          </div>
        </div>
      </div>
      <el-drawer
        title="m-demo"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="closeDrawer"
      >
        <div class="m-demo">
          <el-button v-for="(item, index) in dawerList" :key="index" @click="goTo(item.name)">{{
            item.label
          }}</el-button>
        </div>
      </el-drawer>
      <!-- <div class="topmenulist">
        <ul>
          <li v-for="(item, index) in menuList" :key="index" @click="goHome(item)">{{ item.title }}</li>
        </ul>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      menuList:
        sessionStorage.getItem('USER_ROLER') === 'admin'
          ? require('@/assets/json/menu_admin.json')
          : require('@/assets/json/menu.json'),
      dawerList: require('@/assets/json/drawer.json'),
      input3: '',
      select: '',
      searchList: [],
      loading: false,
      state: '',
      states: require('@/assets/json/search.json'),
      activeIndex: '',
      timeout: null,
      drawer: false,
      direction: 'rtl',
      userName: '',
      isScrroll: false
    }
  },
  mounted() {
    this.activeIndex = sessionStorage.getItem('ACTIVE_INDEX')
      ? sessionStorage.getItem('ACTIVE_INDEX')
      : '0'
    this.userName = window.sessionStorage.getItem('SESSION_ID')
    window.addEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    ...mapActions('login', ['handleLoginOut']),
    handleScroll() {
      const Top = document.body.scrollTop || document.documentElement.scrollTop
      if (Top > 100) {
        this.isScrroll = true
      } else {
        this.isScrroll = false
      }
    },
    querySearchAsync(queryString, cb) {
      const searchList = this.states
      var results = queryString
        ? searchList.filter(this.createStateFilter(queryString))
        : searchList

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 500 * Math.random())
    },
    createStateFilter(queryString) {
      return (state) => {
        return state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
    handleSelect(val) {
      this.$router.push({
        path: val.path
      })
    },
    goRouter(ele) {
      if (this.menuList[ele].name === 'm-demo') {
        this.drawer = !this.drawer
      } else if (this.menuList[ele].path === this.$route.path) {
        this.$parent.reload()
      } else {
        sessionStorage.setItem('ACTIVE_INDEX', ele)
        this.$router.push({
          path: this.menuList[ele].path
        })
        this.$parent.reload()
      }
    },
    closeDrawer() {
      this.drawer = !this.drawer
    },
    // 抽屉跳转
    goTo(val) {
      this.drawer = !this.drawer
      this.$router.push({
        name: val
      })
    },
    goRegister() {
      this.$router.push({
        name: 'register'
      })
    },
    goLogin() {
      this.$router.push({
        name: 'login'
      })
    },
    Logout() {
      this.handleLoginOut()
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>

<style lang="less" scoped>
@bg_blue_pre: #6391e7;
@bg_blue_next: #2a6dd5;
.top_fixed {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 33;
  width: 100%;
}
.top {
  background: #fff;
  min-width: 1000px;
  .top_content {
    padding: 0 15px;
    height: 60px;
    margin: auto;
    overflow: hidden;
    background: linear-gradient(90deg, @bg_blue_pre 0%, @bg_blue_next 100%);
    .grid-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      height: 60px;
      line-height: 60px;
      .header-left {
        flex: 1;
        .el-menu {
          background: none;
          .el-menu-item:focus,
          .el-menu-item:hover {
            color: #ff8f19;
            background-color: #e58d8d;
            border-bottom: none;
          }
        }
      }
      .header-search {
        height: 60px;
        width: 300px;
        display: flex;
        .el-autocomplete {
          display: flex;
        }
      }
    }
  }
  .el-menu--horizontal > .el-submenu .el-submenu__title {
    height: 40px;
    line-height: 40px;
  }
}
.m-demo {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  .el-button {
    width: 120px;
    margin: 5px;
  }
}
.el-dropdown {
  color: #f0f0f0;
}
.el-dropdown-link {
  font-size: 16px;
}
@media only screen and (max-width: 1055px) {
  .header-search {
    display: none !important;
  }
}
.m-lang {
  margin: 0 30px;
}
</style>
