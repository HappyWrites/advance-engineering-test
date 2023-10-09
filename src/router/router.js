import { createWebHistory, createRouter } from "vue-router";
import LoginView from '../views/LoginView.vue';
import OrdersAll from '../views/OrdersAll.vue';
import OrdersCreate from '../views/OrdersCreate.vue';
import PageNotFound from '../views/PageNotFound.vue'

const routes = [
  {
    path: '/',
    name: "LoginView",
    component: LoginView
  },
  {
    path: '/orders',
    redirect: '/orders/all'
  },
  {
    path: "/orders/all",
    name: "OrdersAll",
    component: OrdersAll
  },  
  {
    path: "/orders/create",
    name: "OrdersCreate",
    component: OrdersCreate,
  },  
  {
    path: "/:catchAll(.*)",
    component: PageNotFound,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
