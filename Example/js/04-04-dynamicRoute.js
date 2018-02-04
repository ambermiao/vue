(function(window){

  var index = {
    template: `
      <div class="page">
        <h2>首頁組件</h2>
      </div>
    `
  }
  var course = {
    template: `
      <div class="page">
        <h2>課程組件</h2>
        <router-link to="/course/1">1</router-link>
        <router-link to="/course/2">2</router-link>
        <router-link to="/course/3">3</router-link>
      </div>
    `
  }
  var detail = {
    template: `
      <div class="page">
        <h2>詳細組件</h2>
        <p>{{$route.params.id}}</p>
      </div>
    `
  }
  var contact = {
    template: `
      <div class="page">
        <h2>聯絡組件</h2>
      </div>
    `
  }
  var router = new VueRouter({
    routes:[
      {
        name: 'index',
        path: '/',
        component: index
      },
      {
        name: 'course',
        path: '/course',
        component: course
      },
      {
        name: 'detail',
        path: '/course/:id',
        component: detail
      },
      {
        name: 'contact',
        path: '/contact',
        component: contact,
        children:[
          {
            path:'phone',
            component: phone
          },
          {
            path:'address',
            component: address
          },
          {
            path:'email',
            component: email
          },
          {
            path:'*',
            redirect:'phone'
          }
        ]
      }
    ]
  })
  var vm = new Vue({
    el:'#app',
    data:{
      transitionName: 'slide-up',
      menu:[
        {text:'首頁',name:'index'},
        {text:'課程',name:'course'},
        {text:'聯絡',name:'contact'}
      ]
    },
    router:router,
    methods:{
      pathDepth(path){
        return path.spilt('/').length
      }
    },
    watch:{
      $route:function(n,o){
        if(this.pathDepth(n.fullPath) == this.pathDepth(n.fullPath)){
          this.transitionName = ''
        }
      }
    }
  })
})(window)