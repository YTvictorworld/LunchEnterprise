import { createApp } from "vue";
import App from "./App.vue";
import { createVuetify } from "vuetify";
// import * as router from "../router";
// https://next.vuetifyjs.com/en/getting-started/installation/

import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { createRouter, createWebHistory } from "vue-router";
import loginView from "../Vue/views/loginView.vue";
import homeView from "../Vue/views/homeView.vue";
import profileView from "../vue/views/profile.vue";

const routes = [
  { path: "/", component: loginView },
  { path: "/home", component: homeView },
  { path: "/profile", component: profileView }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// create vuetify object
const vuetify = createVuetify({
  components,
  directives,
});
// Create vue router config

// https://vuejs.org/guide/essentials/application.html
const app = createApp(App);
// install vuetify plugin to vue
app.use(vuetify);
app.use(router);
// install vue router plugin to vue
// https://vuejs.org/guide/essentials/application.html#mounting-the-app
app.mount("#app");
