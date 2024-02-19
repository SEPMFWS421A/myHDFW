<script setup>
import { ref} from "vue";

const user = ref({name: "Max Mustermann", email: "mustermann@mail.com"});
</script>
<script>
import {defineComponent, ref} from 'vue'
export default {
  data() {
    return {
      visible: false
    };
  },
  methods: {
    test: function () {
      this.visible = true
    },

  }
};
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
        <i class="pi pi-user" @click="test" style="font-size: 2rem" ></i>
      </div>
    </div>
    <Dialog v-model:visible="visible" modal header="Login" :style="{ width: '30rem' }">
      <span class="p-text-secondary block mb-5">Hier Anmelden</span>
      <div class="flex align-items-center gap-3 mb-5">
        <label for="username" class="font-semibold w-7rem">Nutzername</label>
        <InputText id="username" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex align-items-center gap-3 mb-5">
        <label for="password" class="font-semibold w-7rem">Passwort</label>
        <InputText id="password" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex justify-content-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
        <Button type="button" label="Save" @click="visible = false"></Button>
      </div>
    </Dialog>
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