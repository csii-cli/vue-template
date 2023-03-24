<template>
  <div class="content">
    <div class="box_demo">
      <div class="boxLoading"></div>
    </div>
    <div>
      <div class="fix_boot"></div>
    </div>
    <div>
      <div class="trail"></div>
    </div>
    <details>
      <summary>title</summary>
      <p>1</p>
      <p>2</p>
    </details>
    <div>
      <!-- 定义过渡类名 -->
      <button @click="test">show</button>
      <transition
        enter-active-class="animate__animated animate__bounceIn"
        leave-active-class="animate__animated animate__bounceOut"
      >
        <p style="width: 200px; height: 200px; background-color: #ccc" v-if="show">hello</p>
      </transition>
    </div>
    <div>
      <!-- JavaScript的钩子 -->
      <!-- <transition
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter"
        v-on:enter-cancelled="enterCancelled"
        v-on:before-leave="beforeLeave"
        v-on:leave="leave"
        v-on:after-leave="afterLeave"
        v-on:leave-cancelled="leaveCancelled"
      >
      </transition> -->
      <m-btn @click="enC">加密</m-btn>
      <m-btn @click="deC">解密密</m-btn>
      <el-input v-model="tt"></el-input>
    </div>
  </div>
</template>

<script>
import { toFullScreen } from '@/libs/utils/index'
import 'animate.css'
export default {
  name: 'm-utils',
  data() {
    return {
      tt: '',
      show: true,
      arr1: ['1', '2', '3']
    }
  },
  mounted() {
    // 网页全屏
    // toFullScreen()
    this.init()
  },
  methods: {
    test() {
      this.show = !this.show
      console.log(this.show)
    },
    init() {
      console.log(this.arr1.valueOf())
      console.log(this.arr1.toString())
      console.log(this.arr1.toLocaleString())
    },
    // 过渡进入
    // 设置过渡进入之前的组件状态
    beforeEnter(el) {
      // ...
    },
    // 设置过渡进入完成时的组件状态
    enter(el, done) {
      // ...
      done()
    },
    // 设置过渡进入完成之后的组件状态
    afterEnter(el) {
      // ...
    },
    enterCancelled(el) {
      // ...
    },
    // 过渡离开
    // 设置过渡离开之前的组件状态
    beforeLeave(el) {
      // ...
    },
    // 设置过渡离开完成时地组件状态
    leave(el, done) {
      // ...
      done()
    },
    // 设置过渡离开完成之后的组件状态
    afterLeave(el) {
      // ...
    },
    // leaveCancelled 只用于 v-show 中
    leaveCancelled(el) {
      // ...
    }
  }
}
</script>

<style lang="scss" scoped>
.box_demo {
  position: relative;
  height: 200px;
  width: 100%;
  background: rgb(15, 7, 7);
}
/* loading.css */
.boxLoading {
  width: 50px;
  height: 50px;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.boxLoading:before {
  content: '';
  width: 50px;
  height: 5px;
  background: #fff;
  opacity: 0.7;
  position: absolute;
  top: 59px;
  left: 0;
  border-radius: 50%;
  animation: shadow 0.5s linear infinite;
}
.boxLoading:after {
  content: '';
  width: 50px;
  height: 50px;
  background: #e04960;
  animation: animate 0.5s linear infinite;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 3px;
}
@keyframes animate {
  17% {
    border-bottom-right-radius: 3px;
  }
  25% {
    transform: translateY(9px) rotate(22.5deg);
  }
  50% {
    transform: translateY(18px) scale(1, 0.9) rotate(45deg);
    border-bottom-right-radius: 40px;
  }
  75% {
    transform: translateY(9px) rotate(67.5deg);
  }
  100% {
    transform: translateY(0) rotate(90deg);
  }
}
@keyframes shadow {
  0%,
  100% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.2, 1);
  }
}

// ----
.trail {
  height: 10px;
  stroke-width: 2;
  stroke-dasharray: 1 10 5 10 10 5 30 150;
  animation-name: trail;
  animation-timing-function: ease-out;
}

@keyframes trail {
  from,
  20% {
    stroke-width: 3;
    stroke-dashoffset: 80;
  }
  100%,
  to {
    stroke-width: 0.5;
    stroke-dashoffset: -150;
  }
}
// --------
.fix_boot {
  width: 300px;
  height: 300px;
  background: #ccc;
  position: sticky;
  top: 1em;
}
.fade-in-active,
.fade-out-active {
  transition: all 1s linear;
}
</style>
