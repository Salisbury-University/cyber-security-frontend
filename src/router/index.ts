import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import MainLayout from "../Layout/Main.vue";
import Index from "../views/Index.vue";
import Challenges from "../views/Challenges.vue";
import Preference from "../views/Preference.vue";
import Wiki from "../views/Wiki.vue";

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
        // Preference page
        path: "/preference",
        component: Preference,
      },
      {
        //Wiki page
        path: "/wiki",
        component: Wiki,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
