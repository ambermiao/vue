<template>
  <header class="header">
    <h1>todos</h1>
    <input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" v-model.trim="todo" @keyup.enter="add">
  </header>
</template>

<script>
  export default {
    name: 'todo-input',
    data() {
      return {
        todo: ''
      }
    },
    methods: {
      add: function () {
        if (!this.todo) {
          return
        }
        this.$emit('add', this.todo)
        this.todo = ''
      }
    }
  }
</script>
