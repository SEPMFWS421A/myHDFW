import { createRouter, createWebHistory } from 'vue-router'
import Schedule from "@/components/Schedule.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Schedule
    },
  ]
})

export default router
