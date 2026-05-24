import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/pages/Home.vue";
import Feedback from "@/components/pages/Feedback.vue";
import Privacy from "@/components/pages/Privacy.vue";
import NotFound from "@/components/pages/NotFound.vue";
import BM from "@/components/pages/BM.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/feedback", component: Feedback },
    { path: "/privacy", component: Privacy },
    { path: "/bm", component: BM },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
