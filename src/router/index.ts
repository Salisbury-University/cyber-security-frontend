import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import MainLayout from "../Layout/Main.vue";
import Index from "../views/Index.vue";
import Challenges from "../views/Challenges.vue";
import Wiki from "../views/Wiki.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        // This is the landing page
        path: "",
        component: Index,
      },
      {
        //Example of path
        // This will be route to /challenges
        path: "challenges",
        component: Challenges,
      },
      {
        path: "wiki",
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
