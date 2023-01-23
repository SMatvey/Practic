import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import axios from "axios";
import VueAxios from "vue-axios";

import App from './components/App.vue'
import SPA from './components/SPA.vue'
import SPAinfo from "./components/SPAinfo.vue";

const routes = [
    {path: "/", component: SPA},
    {path: "/spainfo/:id", component: SPAinfo, props: true }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App).use(VueAxios, axios).use(router).mount("#app");
