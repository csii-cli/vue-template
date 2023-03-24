<template>
  <div class="content">
    <div class="title">
      {{ articleData.aticleTitle }}
    </div>
    <div class="articleContent" v-html="articleData.aticleContent"></div>
    <div class="aticleDate">
      {{ articleData.writeDate }}
    </div>
    <div class="author">
      {{ articleData.aticleAuthor }}
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      articleData: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.articleData = this.$route.params.id
      // this.articleData = JSON.parse(this.$route.query.art)
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  padding: 15px;
  .title {
    font-size: 22px;
  }
}
</style>
