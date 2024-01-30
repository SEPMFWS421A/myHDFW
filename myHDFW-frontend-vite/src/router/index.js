import {createRouter, createWebHistory} from 'vue-router'
import Schedule from "@/components/Schedule.vue";
import Administration from "@/components/Administration.vue";
import home_page from "@/components/Home_page.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
          path: '/',
          name: 'test',
          component: home_page
      },
    {
      path: '/admin',
      name: 'home',
      component: Administration
    },
      {
         path:'/Schedule',
          name: 'secondPage',
          component: Schedule
      }

  ]
})

export default router
