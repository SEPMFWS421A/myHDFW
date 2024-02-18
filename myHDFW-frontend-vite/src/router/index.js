import {createRouter, createWebHistory} from 'vue-router'
import Schedule from "@/components/Schedule.vue";
import administration from "@/components/Administration.vue";
import home_page from "@/components/Home_page.vue";
import Eventverwaltung from "@/components/EventManagement.vue";
import RoomManagement from "@/components/RoomManagement.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
          path: '/',
          name: 'home',
          component: home_page
      },
    {
      path: '/admin',
      name: 'admin',
      component: administration
    },
      {
          path: '/Schedule',
          name: 'schedule',
          component: Schedule
      },
      {
          path: '/eventverwaltung',
          name: 'event',
          component: Eventverwaltung
      },
      {
          path: '/raumverwaltung/',
          name: 'Raumverwaltung',
          component: RoomManagement
      }

  ]
})

export default router
