<template>
  <div>
    <h1>{{ greeting }}</h1>
    <p>{{ message }}</p>
  </div>
  <RouterLink to="/Schedule">Zum Kalender</RouterLink>
  <br>
  <RouterLink to="/Overview">Zur Noten- und Prüfungsübersicht</RouterLink>
</template>

<script>
export default {
  data() {
    return {
      greeting: 'Hallo',
      message: 'Willkommen zur Vue 3-Komponente!'
    };
  }
};
</script>

<style scoped>
/* Hier können Sie den CSS-Stil für Ihre Komponente definieren */
</style>