<template>
  <div id="app">
    <img src="./assets/logo.png">
    <welcome></welcome>
    <link-list :link-type="'essential'"></link-list>
    <link-list :link-type="'ecosystem'"></link-list>
  </div>
</template>

<script>
import Welcome from './components/WelcomeComponent.vue'
import LinkList from './components/LinkListComponent.vue'
export default {
  name: 'app',
  components:{
    Welcome,
    LinkList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
