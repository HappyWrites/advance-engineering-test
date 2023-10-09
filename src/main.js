import { createApp } from 'vue'
import router from "./router/router.js"; 
import pinia from './store/pinia.js';
import App from './App.vue'

createApp(App).use(router).use(pinia).mount('#app')
