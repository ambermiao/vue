<template>
  <footer class="footer">
    <span class="todo-count">
      <strong>{{ remaining }}</strong>
      {{ pluralize('item', remaining) }} left
    </span>
    <ul class="filters">
      <li>
        <a href="javascript:;" :class="{selected: visibility == 'all'}" @click="$router.replace('all')">All</a>
      </li>
      <li>
        <a href="javascript:;" :class="{selected: visibility == 'active'}" @click="$router.replace('active')">Active</a>
      </li>
      <li>
        <a href="javascript:;" :class="{selected: visibility == 'completed'}" @click="$router.replace('completed')">Completed</a>
      </li>
    </ul>
    <button class="clear-completed" @click="removeCompleted" v-show="total > remaining">
      Clear completed
    </button>
  </footer>
</template>

<script>
  export default {
    name: 'todo-filter',
    props: ['total', 'remaining', 'visibility'],
    methods: {
      removeCompleted: function () {
        this.$emit('removeCompleted')
      }
    }
  }
</script>


