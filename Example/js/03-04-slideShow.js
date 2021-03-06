(function(window){
  var data = {
    active:0,
    alpha:0,
    imgList:[
      "./images/children/0.jpg",
      "./images/children/1.jpg",
      "./images/children/2.jpg",
      "./images/children/3.jpg",
      "./images/children/4.jpg",
      "./images/children/5.jpg",
      "./images/children/6.jpg",
      "./images/children/7.jpg"
    ]
  }
  var imgMixin={
    props:['active','list'],
    methods:{
      nextHandler:function(){
        this.$emit('next')
      }
    }
  }
  var alphaComponent = {
    mixins:[imgMixin],
    template:`
    <div class="container">
      <div class="img"
        @click="nextHandler">
        <transition name="fade" v-for="(item,index) in list" :key="item" >
          <img :src="item" v-if="active == index" >
        </transition>
      </div>
    </div>
    `
  }
  var slideComponent = {
    mixins:[imgMixin],
    template:`
    <div class="container">
      <div class="img" :style="{left:-100*active+'%'}"
        @click="nextHandler">
        <img :src="item" v-for="(item,index) in list"
          :style="{left:100*index+'%'}">
      </div>
    </div>
    `
  }
  var navComponent = {
    props:['active','total'],
    template:`
    <div class="nav">
      <a href="javascript:;" v-for="index in total"
        :class="{active : active == index-1}"
        @click="clickHandler(index-1)"></a>
    </div>
    `,
    methods:{
      clickHandler:function(index){
        this.$emit('change',index)
      }
    }
  }
  var vm = new Vue({
    el:"#app",
    data:data,
    components:{
      navComponent:navComponent,
      slideComponent:slideComponent,
      alphaComponent:alphaComponent
    },
    methods:{
      changehandle:function(index,type){
        this[type] = index
      },
      nexthandle:function(type){
        this[type] = (this[type]+1) % this.imgList.length
      }
    }
  })
})(window)