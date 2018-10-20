<template lang="html">
  <li>
    <div class="artist">
      <p>{{ artist.name }}</p>

      <!-- ⚠️  En este caso agrego tambien un v-if para prevenir errores ya que la propiedad images puede venir vacia -->
      <img v-if="artist.images.length" :src="artist.images[0].url" :alt="artist.name">
      <p v-else>🚫 🌅</p>
      <small> {{ artist.genres | dash-list }}</small>
    </div>
  </li>
</template>

<script>
export default {
  name: 'Artist',

  props: {
    artist: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
  li {
    display: flex;
    justify-content: center;
    padding: 0.2em;
    border: 1px solid #42b983;
    margin: 0.2em;
    width: 200px;
    height: 200px;
  }

  .artist {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    width: 100px;
    height: 100px;
  }
</style>
