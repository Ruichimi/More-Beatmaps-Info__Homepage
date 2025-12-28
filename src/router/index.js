import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home.vue";
import Feedback from "@/components/Feedback.vue";
import Privacy from "@/components/Privacy.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/feedback", component: Feedback },
    { path: "/privacy", component: Privacy },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
