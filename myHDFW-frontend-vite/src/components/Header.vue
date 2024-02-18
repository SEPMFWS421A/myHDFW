<script setup>
import {ref} from "vue";
import Menu from "primevue/menu";

const user = ref({name: "Max Mustermann", email: "mustermann@mail.com"});

const profileMenu = ref();
const notificationsMenu = ref();
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


</script>

<template>
  <div class="header-container">
    <div class="header-right-menu">
      <div class="header-name">{{ user.name }}</div>
      <div class="profile">
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
      <div class="notifications">
        <i class="pi pi-bell" style="font-size: 2rem" @click="toggleNotifications" aria-controls="overlay_menu"></i>
        <Menu ref="notificationsMenu" id="overlay_menu" :model="notificationsMenuItems" :popup="true">
        </Menu>
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