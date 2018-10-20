<template>
  <div id="app">
    <top></top>

    <main>
      <search></search>
    </main>

    <bottom></bottom>
  </div>
</template>

<script>
  import Top from './components/layout/Top.vue'
  import Bottom from './components/layout/Bottom.vue'

  import Search from './components/Search.vue'

  export default {
    name: 'app',

    components: { Search, Top, Bottom }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

main {
  height: 72vh;
  overflow: auto;
}

a {
  color: #42b983;
}
</style>
