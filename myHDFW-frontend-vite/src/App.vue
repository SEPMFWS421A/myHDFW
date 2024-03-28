<script setup>
import {RouterView} from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import {store} from "@/service/store.js";
import VueJwtDecode from "vue-jwt-decode";

async function checkToken(token) {
  if (token !== undefined && token !== null && token !== "") {
    let user = VueJwtDecode.decode(token);
    const expiryDate = new Date(user.exp * 1000);
    if (expiryDate < new Date()) {
      store.token = null;
      store.user = null;
    } else {
      store.token = token;
      store.user = user;
    }
  }
}

checkToken(localStorage.getItem('token'));
setInterval(() => checkToken(store.token), 5000);

</script>

<template>
  <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'>
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
