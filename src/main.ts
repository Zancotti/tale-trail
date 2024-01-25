import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// Pinia
import { createPinia } from "pinia";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const pinia = createPinia();

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(pinia).use(vuetify).mount("#app");
