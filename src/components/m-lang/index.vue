<template>
  <el-dropdown trigger="hover" @command="handleCommand">
    <div>
      <!-- icon-class="language" 需要在src\icons\svg\下有一个名为language.svg的文件。 -->
      <!-- <svg-icon style="color: #fff; font-size: 20px" icon-class="language" /> -->
      {{ $i18n.locale === 'zh' ? '中文' : 'English'
      }}<i class="el-icon-arrow-down el-icon--right"></i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh" :disabled="'zh' === $i18n.locale">中文</el-dropdown-item>
      <el-dropdown-item command="en" :disabled="'en' === $i18n.locale">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  methods: {
    handleCommand(lang) {
      this.$i18n.locale = lang // 设置给本地的i18n插件
      this.$message.success('切换多语言成功')
    }
  }
}
</script>
