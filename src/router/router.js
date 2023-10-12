import { createWebHistory, createRouter } from "vue-router";
import { useAuthStore } from "../store/useAuthStore.js";
import LoginView from '../views/LoginView.vue';
import OrdersAll from '../views/OrdersAll.vue';
import OrdersCreate from '../views/OrdersCreate.vue';
import PageNotFound from '../views/PageNotFound.vue'

const routes = [
  {
    path: '/',
    redirect: '/orders/all'
  },
  {
    path: '/orders',
    redirect: '/orders/all'
  },

  {
    path: '/login',
    name: "login",
    component: LoginView,
    meta: {
      layout: 'layoutWithoutHeader',
    },
  },
  {
    path: "/orders/all",
    name: "orders-all",
    component: OrdersAll,
    meta: {
      layout: 'layoutWithHeader',
    },
  },
  {
    path: "/orders/create",
    name: "orders-create",
    component: OrdersCreate,
    meta: {
      layout: 'layoutWithHeader',
    },
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

router.beforeEach(async (to) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (authRequired && !auth.user) {
    return '/login';
  }
});

export default router;
