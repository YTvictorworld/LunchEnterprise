import { createApp } from "vue";
import App from "./App.vue";
import { createVuetify } from "vuetify";

// https://next.vuetifyjs.com/en/getting-started/installation/

import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// create vuetify object
const vuetify = createVuetify({
  components,
  directives,
});

// https://vuejs.org/guide/essentials/application.html
const app = createApp(App);
// install vuetify plugin to vue
app.use(vuetify);
// https://vuejs.org/guide/essentials/application.html#mounting-the-app
app.mount("#app");

console.log("hello");
