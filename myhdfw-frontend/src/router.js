import { createRouter, createWebHistory } from 'vue-router';
import StundenplanStudent from "@/components/Stundenplan-Student.vue";

const routes = [
    {
        path: '/',
        component: StundenplanStudent
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;