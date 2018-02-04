import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let filters = {
  all(todos) {
    return todos
  },
  active(todos) {
    return todos.filter(function(todo) {
      return !todo.completed
    });
  },
  completed(todos) {
    return todos.filter(function(todo) {
      return todo.completed
    })
  }
}

let localStore = {
  get(name) {
    return JSON.parse(window.localStorage.getItem(name))
  },
  set(name, data) {
    window.localStorage.setItem(name, JSON.stringify(data))

  }
}

export default new Vuex.Store({
  strict: true,
  state: {
    todos: [],
    visibility: 'all'
  },
  getters: {
    filteredTodos: function(state) {
      return filters[state.visibility](state.todos)
    },
    total: function(state) {
      return state.todos.length
    },
    remaining: function(state) {
      return filters.active(state.todos).length
    }
  },
  actions: {
    init(context, data = 'all') {
      let todos = localStore.get('todos') || []
      this.commit('filter', data)
      this.commit('todos', todos)
    }
  },
  mutations: {
    todos: function(state, data) {
      state.todos = data
      localStore.set('todos', state.todos)
    },
    add: function(state, data) {
      state.todos.push({ title: data, completed: false })
      localStore.set('todos', state.todos)
    },
    allCompleted: function(state, data) {
      state.todos.forEach(function(todo) {
        todo.completed = data
      })
      localStore.set('todos', state.todos)
    },
    switch: function(state, data) {
      let filteredTodos = filters[state.visibility](state.todos)
      filteredTodos[data.index].completed = !filteredTodos[data.index].completed
      localStore.set('todos', state.todos)
    },
    update: function(state, data) {
      let filteredTodos = filters[state.visibility](state.todos)
      filteredTodos[data.index].title = data.title
      localStore.set('todos', state.todos)
    },
    remove: function(state, data) {
      let todo = filters[state.visibility](state.todos)[data.index]
      let todoIndex = state.todos.indexOf(todo)
      state.todos.splice(todoIndex, 1)
      localStore.set('todos', state.todos)
    },
    filter: function(state, data) {
      state.visibility = data
    },
    removeCompleted: function(state) {
      state.todos = filters.active(state.todos)
      localStore.set('todos', state.todos)
    }
  }
})