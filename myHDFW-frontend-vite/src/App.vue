<script setup>
import {RouterView} from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
</script>

<template>
  <div class="app-container">
    <div class="header">
      <Header/>
    </div>
    <div class="sidebar">
      <Sidebar/>
    </div>
    <div class="mainView">
      <RouterView/>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: grid;
  grid-template-columns: minmax(12.5rem, 15%) 1fr;
  grid-template-rows: 50px auto;
  height: 100vh;
  width: 100%;
  column-gap: 10px;
}

.sidebar {
  grid-column: 1;
  grid-row: 1 / 3;
  min-width: 12.5rem;
}

.mainView {
  grid-column: 2;
  grid-row: 2 / 3;
}

.header {
  grid-column: 2;
  grid-row: 1;
}
</style>
