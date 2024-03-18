<script setup>
import {ref} from "vue";
import Menu from "primevue/menu";
import {AuthControllerApi} from "@/api/service/index.ts";
import {store} from '../service/store.js'
import VueJwtDecode from 'vue-jwt-decode'

const authApi = new AuthControllerApi();

const profileMenu = ref();
const notificationsMenu = ref();

const loginData = ref({username: '', password: '', loginError: ''});

const loginVisible = ref(false);

const profileMenuItems = ref([
  {label: 'Profile', icon: 'person', route: '/profile'},
  {label: 'Abmelden', icon: 'logout', route: '/logout'},
]);
const notificationsMenuItems = ref([
  {
    label: 'Keine neuen Benachrichtigungen',
    items: []
  }
]);

const toggleProfile = (event) => {
  profileMenu.value.toggle(event);
};

const toggleNotifications = (event) => {
  notificationsMenu.value.toggle(event);
};

const showLogin = () => {
  loginVisible.value = true;

};
const login = () => {
  authApi.login({username: loginData.value.username, password: loginData.value.password}).then((response) => {
    localStorage.setItem('token', response.data)
    store.token = response.data;
    store.user = VueJwtDecode.decode(response.data);
    loginVisible.value = false;
    loginData.value.password = '';
    loginData.value.username = '';
    loginData.value.loginError = '';
  }).catch((error) => {
    loginData.value.loginError = 'Benutzername oder Passwort ist nicht korrekt';
    loginData.value.password = '';
  })

};
const hideLogin = () => {
  loginVisible.value = false;
  loginData.value.username = '';
  loginData.value.password = '';
  loginData.value.loginError = '';
};


</script>

<template>
  <div class="header-container">
    <div class="header-right-menu">
      <div v-if="store.user" class="header-name">{{ store.user.name }} {{ store.user.surname }}</div>
      <div v-if="store.user" class="profile">
          <i class="pi pi-user" style="font-size: 2rem" @click="toggleProfile" aria-controls="overlay_menu"></i>
          <Menu ref="profileMenu" id="overlay_menu" :model="profileMenuItems" :popup="true" class="profile-menu">
            <template #item="{ item, props }">
              <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                <a v-ripple :href="href" v-bind="props.action" @click="navigate">
              <span class="material-icons" style="font-size: 16px; margin-right: 0.5rem;"
                    data-pc-section="icon">{{ item.icon }}</span>
                  <span class="p-menuitem-text" data-pc-section="label">{{ item.label }}</span>
                </a>
              </router-link>
            </template>
          </Menu>
        </div>
      <div v-else class="profile">
        <i class="pi pi-user" @click="showLogin" style="font-size: 2rem" ></i>
      </div>
      <div class="notifications">
        <i class="pi pi-bell" style="font-size: 2rem" @click="toggleNotifications" aria-controls="overlay_menu"></i>
        <Menu ref="notificationsMenu" id="overlay_menu" :model="notificationsMenuItems" :popup="true">
        </Menu>
      </div>
    </div>
    <Dialog class="login-dialog" v-model:visible="loginVisible" modal header="Login" :style="{ width: '30rem' }">
      <div class="flex align-items-center gap-3 mb-5">
        <label for="username" class="font-semibold w-7rem">Nutzername</label>
        <InputText id="username" class="flex-auto" autocomplete="off" v-model="loginData.username"/>
      </div>
      <div class="flex align-items-center gap-3 mb-5">
        <label for="password" class="font-semibold w-7rem">Passwort</label>
        <InputText id="password" type="password" class="flex-auto" autocomplete="off" v-model="loginData.password"/>
      </div>
      <div class="flex align-items-center justify-content-center gap-3 mb-5" style="" v-if="loginData.loginError!==''">
        <div class="error-box">
          {{ loginData.loginError }}
        </div>
      </div>
      <div class="flex justify-content-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="hideLogin"></Button>
        <Button class="login-button" type="button" label="Save" @click="login"></Button>
      </div>
    </Dialog>
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

.error-box {
  border: 1px solid red;
  background-color: #ffe6e6; /* light red */
  color: red;
  padding: 10px;
  border-radius: 5px;
}
</style>