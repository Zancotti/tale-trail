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

// Material design icons
import "@mdi/font/css/materialdesignicons.css";

// VueRouter
import { createRouter, createWebHistory } from "vue-router";

const pinia = createPinia();

const vuetify = createVuetify({
  theme: {
    defaultTheme: "dark",
  },
  components,
  directives,
});

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("./components/maps/MapViewCreator.vue"),
  },
  {
    path: "/creator",
    name: "creator",
    component: () => import("./components/maps/MapViewCreator.vue"),
  },
  {
    path: "/adventure",
    name: "adventure",
    component: () => import("./components/maps/MapViewAdventure.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("./components/maps/MapViewCreator.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

createApp(App).use(pinia).use(vuetify).use(router).mount("#app");
