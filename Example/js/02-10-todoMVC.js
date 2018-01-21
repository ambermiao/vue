(function(window){
  var data = {
    newTodo:"",
    editedTodo:null,
    todos:[],
    visibility:"all"
  }
  const filters = {
    all: function(todos){
      return todos;
    },
    active: function(todos){
      return todos.filter(function(todo){
        return !todo.complete
      })
    },
    completed: function(todos){
      return todos.filter(function(todo){
        return todo.complete
      })
    }
  }
  var vm = new Vue({
    el:'.todoapp',
    data:data,
    computed:{
      filteredTodos: function(){
        return filters[this.visibility](this.todos);
      },
      remaining: function(){
        return filters['active'](this.todos).length;
      }
    },
    methods:{
      addTodo:function(){
        let value = this.newTodo && this.newTodo.trim()
        if(!value) return
        this.todos.push({title: value,complete: false})
        this.newTodo = ''
      },
      removeTodo:function(todo){
         var index = this.todos.indexOf(todo)
         this.todos.splice(index,1)
        //const todos = Se
        //Set.this.todos.delete(todo)
      },
      removeCompleted:function(){
        this.todos = filters['active'](this.todos);
      },
      editTodo:function(todo){
        this.beforeTodo = todo.title
        this.editedTodo = todo
        // this.$nextTick(function(){
        //   document.querySelector('.edit').focus()
        // })
        
      },
      doneEdit:function(todo){
        if(!this.editedTodo) return;
        this.editedTodo = null
        todo.title = todo.title.trim()
        if(!todo.title){
          this.removeTodo(todo)
        }
      },
      cancelEdit:function(todo){
        this.editedTodo = null
        todo.title = this.beforeTodo
      }
    },
    directives:{
      todoFocus:{
        inserted:function(el){
          el.focus()
        }
      }
    }
  })
})(window)