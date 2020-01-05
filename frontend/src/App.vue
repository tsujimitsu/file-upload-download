<template>
  <div id="app">
    <div>
      <router-link to="/">Home</router-link> |
      <router-link to="/hoge">Hoge</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import router from './router.js'
export default {
  name: 'app',
  router: router,
  components: {}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
