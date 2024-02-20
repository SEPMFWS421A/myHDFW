<template>
  <div class="sidebar">
    <router-link to="/">
      <div class="sidebar-header">
        <img class="logo" src="../assets/hdfw.png" alt="Logo"/>
      </div>
    </router-link>
    <div class="sidebar-menu">
      <Menu :model="sidebar_items">
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

const sidebar_items = ref([
  {label: 'Startseite', icon: 'home', route: '/'},
  {label: 'Administration', icon: 'work', route: '/admin'},
  {label: 'Kalendar', icon: 'calendar_month', route: '/schedule'},
]);

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