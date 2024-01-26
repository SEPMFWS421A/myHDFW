<script setup>


import {ref} from "vue";

const user = ref({name: "Max Mustermann", email: "mustermann@mail.com"});

</script>

<template>
  <div class="header-container">
    <div class="header-name">{{ user.name }}</div>
    <div class="header-right-menu">
      <div class="searchbar">
        <span class="p-input-icon-left">
          <i class="pi pi-search"/>
          <InputText v-model="value1" placeholder="Suchen"/>
        </span>
      </div>
      <div class="notifications">
        <i class="pi pi-bell" style="font-size: 2rem"></i>
      </div>
      <div class="profile">
        <i class="pi pi-user" style="font-size: 2rem"></i>
      </div>
    </div>

  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.header-right-menu {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.notifications, .profile {
  cursor: pointer;
  align-self: center;
}
</style>