<template lang="html">
  <div :class="`toaster ${type}`">
    <span class="close" @click="close">x</span>
    <p> {{ message }}</p>
  </div>
</template>

<script>
  export default {
    name: 'Toaster',

    props: {
      message: { type: String },
      // Establece una valor default para la propiedad en caso que el componente padre no lo asigne.
      type: {
        type: String,
        default: 'error'
      }
    },

    methods: {
      close () {
        this.$emit('close', {})
      }
    }
  }
</script>

<style scoped>
  .toaster {
    position: fixed;
    left: 20px;
    bottom: 20px;
    width: 400px;
    padding: 5px;
    color: #fff;
  }

  .error {
    background-color: tomato;
  }

  .success {
    background-color: lightgreen;
  }

  .close {
    margin-left: 15px;
    color: #fff;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
  }
</style>
