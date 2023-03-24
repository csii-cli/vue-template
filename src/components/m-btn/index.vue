<template>
  <button
    class="m-btn m_btn_primary"
    v-bind="$attrs"
    v-on="$listeners"
    :style="style"
    :disabled="disabled || loading"
    :class="[
      {
        'm-btn_rounded': rounded,
        'm-btn_round': round
      },
      bgColor,
      `m-btn_${size}`
    ]"
  >
    <span v-if="!loading">
      <slot>
        {{ label }}
      </slot>
    </span>

    <i v-else class="el-icon-loading" />
  </button>
</template>

<script>
export default {
  name: 'MBtn',
  props: {
    label: String,
    rounded: Boolean,
    round: Boolean,
    width: String,
    height: String,
    bordered: Boolean,
    color: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'md'
    },
    flat: Boolean,
    loading: Boolean,
    disabled: Boolean
  },
  computed: {
    bgColor() {
      const { color, flat, bordered } = this
      if (!flat && !bordered) {
        return `bg-${color} text-white`
      }
      if (bordered) {
        return `text-${color} border-${color} m-btn_bordered`
      }
      return `text-${color} pa-none`
    },
    style() {
      const { height, width } = this

      const styleObj = {
        height: height ? `height: ${height}; padding-top: 0; padding-bottom: 0;` : '',
        width: width ? `width: ${width}; padding-left: 0;padding-right: 0;` : ''
      }
      let style = ''
      Object.values(styleObj).forEach((v) => {
        style += v
      })

      return style
    }
  }
}
</script>

<style lang="less">
.m_btn_primary {
  background-color: #e60012 !important;
  color: #fff;
  cursor: pointer;
  height: 34px;
  border-radius: 4px;
  line-height: 34px;
  text-align: center;
  display: inline-block;
  padding: 0 !important;
  border: 0;
  font-weight: 500;
  min-width: 145px;
  span {
    height: 34px;
    line-height: 34px;
  }
}
.m-btn {
  border: none;
  background: none;
  cursor: pointer;
  outline: none;
  border-radius: 3px;
  box-sizing: border-box;
}
.m-btn:hover {
  opacity: 0.8;
}
.m-btn_rounded {
  border-radius: 2em;
}
.m-btn_sm {
  line-height: 17px;
  font-size: 12px;
  padding: 4px 19px;
  &.m-btn_round {
    padding: 0;
    line-height: 17px;
    border-radius: 50%;
    height: 42px;
    width: 42px;
  }
}
.m-btn_md {
  font-size: 14px;
  // height: 36px;
  box-sizing: border-box;
  padding: 8px 16px;
  &.m-btn_round {
    padding: 0;
    line-height: 17px;
    border-radius: 50%;
    height: 42px;
    width: 42px;
  }
}
.m-btn_lg {
  font-size: 16px;
}
.m-btn_bordered:hover {
  opacity: 1;
  background: currentColor;
  span {
    color: #fff;
  }
}
.m-btn[disabled] {
  cursor: not-allowed !important;
  background: inherit;
  opacity: 0.5;
  span {
    color: inherit;
  }
}
</style>
