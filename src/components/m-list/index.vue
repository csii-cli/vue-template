<template>
  <div class="list">
    <div v-for="item in list" :key="item.id" @click="itemClick(item)">
      <p>{{ item.title }}</p>
      <p>{{ item.content }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    itemClick: Function,
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>
