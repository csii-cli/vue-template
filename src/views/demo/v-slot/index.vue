<template>
  <div class="content">
    <demo-pay>
      <template v-slot:default>
        <p>slot default</p>
      </template>
      <template #header="{ user }">
        <p>{{ user.firstname }}</p>
      </template>
      <template v-slot:footer>
        <p>footer</p>
      </template>
    </demo-pay>
    <div>-----------------todolist-----------------</div>
    <todo-list>
      <template #todo="{ todo }">
        <span v-if="todo.isComplete">**</span>
        {{ todo.text }}
      </template>
    </todo-list>
    <div>
      -----------------scopeList由父组件决定插槽表现形式
      子组件绑定data数据供使用者使用-----------------
    </div>
    <scopeList>
      <template slot-scope="{ game }">
        <div>
          I'm
          {{ game.a }}
        </div>
      </template>
      <template slot="ll" slot-scope="{ kite }">
        <h1>{{ kite }}</h1>
      </template>
    </scopeList>
  </div>
</template>
<script>
import demoPay from './child/index'
import todoList from './todolist/index'
import scopeList from './scope/index'
export default {
  components: {
    demoPay,
    todoList,
    scopeList
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped></style>
