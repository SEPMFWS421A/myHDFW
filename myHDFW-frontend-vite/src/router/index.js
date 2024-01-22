import { createRouter, createWebHistory } from 'vue-router'
import Schedule from "@/components/Schedule.vue";
import Administration from "@/components/Administration.vue";
import Overview from "@/components/Overview.vue";

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
          path:'/Overview',
          name: 'nextpage',
          component: Overview
      }
  ]
})

export default router
