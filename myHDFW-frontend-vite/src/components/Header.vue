<script setup>


import {ref} from "vue";

const user = ref({name: "Max Mustermann", email: "mustermann@mail.com"});

</script>

<template>
  <div class="header-container">
    <div class="header-right-menu">
      <div class="header-name">{{ user.name }}</div>
      <div class="profile">
        <i class="pi pi-user" style="font-size: 2rem"></i>
      </div>
      <div class="notifications">
        <i class="pi pi-bell" style="font-size: 2rem"></i>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  width: 100%;
  justify-content: flex-end
}

.header-right-menu {
  display: flex;
  gap: 25px;
  justify-content: space-between;
  align-items: center;
}

.notifications, .profile {
  cursor: pointer;
  align-self: center;
}
</style>