<template>
  <div class="sidebar">
    <router-link to="/">
      <div class="sidebar-header">
        <img class="logo" src="../assets/hdfw.png" alt="Logo"/>
      </div>
    </router-link>
    <div class="sidebar-menu">
      <Menu :model="getSidebarItems()">
        <template #item="{ item, props }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a v-ripple :href="href" v-bind="props.action" @click="navigate">
              <span class="material-icons" style="font-size: 16px; margin-right: 0.5rem;"
                    data-pc-section="icon">{{ item.icon }}</span>
              <span class="p-menuitem-text" data-pc-section="label">{{ item.label }}</span>
            </a>
          </router-link>
          <a v-else v-ripple class="p-menuitem-link">
            <span class="material-icons" style="font-size: 16px; margin-right: 0.5rem;"
                  data-pc-section="icon">{{ item.icon }}</span>
            <span class="p-menuitem-text" data-pc-section="label">{{ item.label }}</span>
          </a>
        </template>
      </Menu>
    </div>
  </div>
</template>

<script setup>
import Menu from 'primevue/menu';
import {ref} from "vue";
import {store} from '../service/store.js'

const sidebar_items_default = ref([
  {label: 'Startseite', icon: 'home', route: '/'},
]);
const sidebar_items_admin = ref([
  {label: 'Startseite', icon: 'home', route: '/'},
  {label: 'Administration', icon: 'work', route: '/admin'},
  {label: 'Kalender', icon: 'calendar_month', route: '/schedule'},
]);
const sidebar_items_student = ref([
  {label: 'Startseite', icon: 'home', route: '/'},
  {label: 'Kalender', icon: 'calendar_month', route: '/schedule'},
]);

function getSidebarItems() {
  if (store.user) {
    if (store.user.roles.indexOf("EMPLOYEE") > -1) {
      return sidebar_items_admin.value;
    } else if (store.user.roles.indexOf("STUDENT") > -1) {
      return sidebar_items_student.value;
    } else {
      return sidebar_items_default.value;
    }
  } else {
    return sidebar_items_default.value;
  }
}


</script>


<style scoped>
.sidebar-menu {
  width: 100%;
  height: 100%;
}

.logo {
  width: 100%;
  min-width: 12.5rem;
  margin-bottom: 10px;
}

</style>