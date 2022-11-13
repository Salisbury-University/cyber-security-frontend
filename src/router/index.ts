import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import MainLayout from "../Layout/Main.vue";
import Index from "../views/Index.vue";
import Challenges from "../views/Challenges.vue";
import ExercisePage from "../views/ExercisePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        // Landing page
        path: "",
        component: Index,
      },
      {
        // Challenges page
        path: "/challenges",
        component: Challenges,
      },
      {
        // Individual exercise page
        path: "/challenges/:title",
        component: ExercisePage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
