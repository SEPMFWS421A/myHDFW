import { createRouter, createWebHistory } from 'vue-router'
import Schedule from "@/components/Schedule.vue";
import Administration from "@/components/Administration.vue";
import RoomManagement from "@/components/RoomManagement.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Administration
    },
      {
         path:'/Schedule',
          name: 'secondPage',
          component: Schedule
      },
      {
        path:'/raumverwaltung/',
         name: 'Raumverwaltung',
         component: RoomManagement
     }
  ]
})

export default router
