import { createApp } from 'vue'
import { createPinia } from 'pinia';
import router from "./router/router.js";
import App from './App.vue'
import LayoutWithHeader from '../src/layouts/LayoutWithHeader.vue'
import LayoutWithoutHeader from '../src/layouts/LayoutWithoutHeader.vue'

const pinia = createPinia()

createApp(App)
  .use(router)
  .use(pinia)
  .component('layoutWithHeader', LayoutWithHeader)
  .component('layoutWithoutHeader', LayoutWithoutHeader)
  .mount('#app')

