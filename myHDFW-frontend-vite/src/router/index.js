import {createRouter, createWebHistory} from 'vue-router'
import Schedule from "@/components/Schedule.vue";
import Administration from "@/components/Administration.vue";
import EventManagement from "@/components/EventManagement.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Administration
        },
        {
            path: '/schedule',
            name: 'Schedule',
            component: Schedule
        },
        {
            path:'/eventverwaltung',
            name: 'Eventverwaltung',
            component: EventManagement
        }
    ]
})

export default router
