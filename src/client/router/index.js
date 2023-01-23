const { createRouter, createWebHistory } = require("vue-router");

const routes = [
  { path: "/", component: () => import("../Vue/views/loginView.vue") },
  { path: "/home", component: () => import("../Vue/views/homeView.vue") },
  { path: "/profile", component: () => import("../vue/views/ProfileView.vue") },
];

module.export = createRouter({
  history: createWebHistory(),
  routes,
});
