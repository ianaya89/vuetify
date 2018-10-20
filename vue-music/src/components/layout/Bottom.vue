<template lang="html">
  <footer>
    <p>
      <small>📻  Vuetify {{ new Date().getFullYear() }} &copy;</small>
    </p>
  </footer>
</template>

<script>
export default {
  name: 'Bottom'
}
</script>

<style scoped>
  footer {
    border-top: 1px solid #2c3e50;
    text-align: right;
    height: 10vh;
  }
</style>
