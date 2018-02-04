<template>
  <section class="main">
    <input class="toggle-all" type="checkbox" v-model="allCompletedStatus">
    <ul class="todo-list">
      <li class="todo" v-for="(todo,index) in todos" :key="index" :class="{
            completed: todo.completed,
            editing: editing && index == editing.index}">
        <div class="view">
          <input class="toggle" type="checkbox" :checked="todo.completed" @click="switchComplete(index)">
          <label @dblclick="editTodo(index)">
            {{todo.title}}
          </label>
          <button class="destroy" @click="remove(index)">
          </button>
        </div>
        <input class="edit" type="text" v-if="editing && index == editing.index" v-model.trim="editing.title" v-focus @blur="editCancel()" @keyup.enter="editDone(index)" @keyup.esc="editCancel()">
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    name: 'todo-list',
    props: ['todos', 'allCompleted'],
    data() {
      return {
        editing: null
      }
    },
    computed: {
      allCompletedStatus: {
        get() {
          return this.allCompleted
        },
        set(data) {
          this.$emit('update:allCompleted', !this.todos.length ? false : data)
        }
      }
    },
    methods: {
      switchComplete: function (index) {
        this.$store.commit('switch', { index })
      },
      remove: function (index) {
        this.$store.commit('remove', { index })
      },
      editTodo: function (index) {
        this.editing = {
          index: index,
          title: this.todos[index].title
        }
      },
      editDone: function (index) {
        if (!this.editing) return;
        if (!this.editing.title.length) {
          this.remove(index)
        } else {
          this.$store.commit('update', this.editing)
        }
        this.editing = null
      },
      editCancel: function () {
        this.editing = null
      }
    },
    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    }
  }
</script>
