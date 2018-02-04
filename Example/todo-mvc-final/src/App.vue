<template>
  <section class="todoapp" v-cloak>
    <todo-input @add="addHandler"></todo-input>
    <todo-list :todos="filteredTodos" :allCompleted.sync="allCompleted"></todo-list>
    <todo-filter :total="total" :remaining="remaining" :visibility="visibility" @removeCompleted="removeCompleted"></todo-filter>
  </section>
</template>

<script>
  import todoInput from './components/todoInput'
  import todoList from './components/todoList'
  import todoFilter from './components/todoFilter'
  export default {
    name: 'todoapp',
    computed: {
      filteredTodos() {
        return this.$store.getters.filteredTodos
      },
      total() {
        return this.$store.getters.total
      },
      remaining() {
        return this.$store.getters.remaining
      },
      allCompleted: {
        get() {
          return this.total != 0 && this.remaining == 0
        },
        set(data) {
          this.$store.commit('allCompleted', data)
        }
      },
      visibility: {
        get() {
          return this.$store.state.visibility
        },
        set(data) {
          this.$store.commit('filter', data)
        }
      }
    },
    methods: {
      addHandler(data) {
        this.$store.commit('add', data)
      },
      removeCompleted() {
        this.$store.commit('removeCompleted')
      }
    },
    components: {
      todoInput,
      todoList,
      todoFilter
    },
    watch: {
      $route: function () {
        this.$store.commit('filter', this.$route.name)
      }
    },
    mounted() {
      this.$store.dispatch('init',this.$route.name)
    }
  }
</script>

<style lang="scss" src="./assets/style.scss"></style>
