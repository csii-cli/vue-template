<template>
  <div>
    <ul>
      <li v-for="todo in filteredTodos" v-bind:key="todo.id">
        <slot name="todo" v-bind:todo="todo">
          {{ todo.text }}
        </slot>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      filteredTodos: [
        {
          isComplete: true,
          text: 'slot-test'
        },
        {
          text: 'slot-test2'
        }
      ]
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped></style>
